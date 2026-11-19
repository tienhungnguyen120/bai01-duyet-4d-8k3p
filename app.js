(() => {
  "use strict";

  const DATA = window.LESSON_01_DATA;
  if (!DATA) return;

  const STORAGE_KEY = "bai01-pageturn-state-v2";
  const PALETTE_KEY = "bai01-palette";

  const STEPS_META = [
    { num: 1, short: "Tình huống", label: "Clip Hoàn cảnh thực tế" },
    { num: 2, short: "Quy luật 4D", label: "Clip Quy luật Tư duy 4D" },
    { num: 3, short: "Bài tập 1", label: "Trắc nghiệm nhận diện bẫy" },
    { num: 4, short: "Bài tập 2", label: "Phân biệt Làm thay & Làm cùng" },
    { num: 5, short: "Bài tập 3", label: "Ghép câu lệnh SCQ dán vào AI" },
    { num: 6, short: "Bài tập 4", label: "Kiểm trang gốc & Chốt chữ A" },
    { num: 7, short: "Tổng kết", label: "Hoàn thành & Hồ sơ PDF" }
  ];

  const defaultTrackProgress = () => ({
    lastStep: 1,
    visited: {},
    doneSteps: {},
    transcriptOpen: { scenario: false, fourD: false },
    acts: {}
  });

  const defaultState = () => ({
    tracks: {
      adult: defaultTrackProgress(),
      student: defaultTrackProgress()
    }
  });

  let state = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.tracks) {
        state = {
          tracks: {
            adult: { ...defaultTrackProgress(), ...(parsed.tracks.adult || {}) },
            student: { ...defaultTrackProgress(), ...(parsed.tracks.student || {}) }
          }
        };
      }
    }
  } catch (e) {
    console.warn("Could not read state", e);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v === null || v === undefined || v === false) continue;
        if (k === "className") el.className = v;
        else if (k.startsWith("on") && typeof v === "function") {
          el.addEventListener(k.slice(2).toLowerCase(), v);
        } else if (v === true) {
          el.setAttribute(k, "");
        } else {
          el.setAttribute(k, String(v));
        }
      }
    }
    for (const child of children.flat(Infinity)) {
      if (child === null || child === undefined || child === false) continue;
      if (child instanceof Node) el.appendChild(child);
      else el.appendChild(document.createTextNode(String(child)));
    }
    return el;
  }

  let toastTimer = null;
  function showToast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    clearTimeout(toastTimer);
    el.textContent = msg;
    el.hidden = false;
    toastTimer = setTimeout(() => {
      el.hidden = true;
    }, 3000);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Đã sao chép vào bộ nhớ tạm.");
    } catch (err) {
      const ta = h("textarea", { style: "position:fixed;left:-9999px" }, text);
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        showToast("Đã sao chép vào bộ nhớ tạm.");
      } catch (e) {
        showToast("Vui lòng bôi đen văn bản để sao chép.");
      }
      ta.remove();
    }
  }

  // ==================== ROUTING & PAGE-TURN DIRECTION ====================
  let prevRouteStep = 0;

  function parseRoute() {
    const raw = (location.hash || "").replace(/^#\/?/, "").trim();
    if (!raw || raw === "chon-hanh-trinh") {
      return { screen: "welcome", scenario: null, step: 0 };
    }
    const [scSlug, stepStr] = raw.split("/");
    const scenario = scSlug === "hoc-sinh" || scSlug === "student" ? "student" : scSlug === "nguoi-lon" || scSlug === "adult" ? "adult" : null;
    if (!scenario) {
      return { screen: "welcome", scenario: null, step: 0 };
    }
    const step = Math.min(7, Math.max(1, Number(stepStr) || 1));
    return { screen: "step", scenario, step };
  }

  function routeHref(scenario, step) {
    if (!scenario || step <= 0) return "#/chon-hanh-trinh";
    const slug = scenario === "student" ? "hoc-sinh" : "nguoi-lon";
    return `#/${slug}/${step}`;
  }

  function goTo(scenario, step) {
    location.hash = routeHref(scenario, step);
  }

  function pauseAllVideos() {
    document.querySelectorAll("video").forEach(v => {
      try {
        v.pause();
      } catch (e) {}
    });
  }

  // ==================== HEADER & DOCK UPDATES ====================
  function updateHeaderAndDock(route) {
    const trackBtn = document.getElementById("track-switch-btn");
    const progWrap = document.getElementById("header-progress-wrap");
    const segHost = document.getElementById("step-segments");
    const capLeft = document.getElementById("step-caption-left");
    const capRight = document.getElementById("step-caption-right");
    const dock = document.getElementById("step-dock");

    if (route.screen === "welcome") {
      trackBtn.hidden = true;
      progWrap.hidden = true;
      dock.hidden = true;
      return;
    }

    const sc = DATA.scenarios[route.scenario];
    const tProg = state.tracks[route.scenario];
    const otherId = route.scenario === "adult" ? "student" : "adult";
    const otherLabel = otherId === "student" ? "Học sinh" : "Người lớn";

    trackBtn.hidden = false;
    trackBtn.textContent = `${route.scenario === "student" ? "Học sinh" : "Người lớn"} ⇄ Đổi sang ${otherLabel}`;
    trackBtn.onclick = () => {
      pauseAllVideos();
      goTo(otherId, route.step);
      showToast(`Đã chuyển sang hành trình ${otherLabel}`);
    };

    progWrap.hidden = false;
    const stepMeta = STEPS_META[route.step - 1];
    capLeft.textContent = `Trang ${route.step} / 7`;
    capRight.textContent = stepMeta.label;

    const segBtns = STEPS_META.map(sm => {
      const isDone = !!tProg.doneSteps[sm.num];
      const isCurrent = sm.num === route.step;
      let cls = "step-seg-btn";
      if (isCurrent) cls += " current";
      else if (isDone) cls += " done";
      return h("button", {
        type: "button",
        className: cls,
        title: `Trang ${sm.num}: ${sm.label}`,
        "aria-label": `Chuyển tới Trang ${sm.num}: ${sm.label}`,
        onClick: () => {
          pauseAllVideos();
          goTo(route.scenario, sm.num);
        }
      });
    });
    segHost.replaceChildren(...segBtns);

    dock.hidden = false;
  }

  function configureDock({ prevLabel, onPrev, statusText, nextLabel, onNext, nextSuccess = false, pulse = false, hideNext = false }) {
    const prevBtn = document.getElementById("dock-prev-btn");
    const statusEl = document.getElementById("dock-status");
    const nextBtn = document.getElementById("dock-next-btn");

    prevBtn.textContent = prevLabel;
    prevBtn.onclick = onPrev;
    statusEl.textContent = statusText || "";

    if (hideNext) {
      nextBtn.hidden = true;
    } else {
      nextBtn.hidden = false;
      nextBtn.textContent = nextLabel;
      nextBtn.onclick = onNext;
      nextBtn.className = `btn-tactile ${nextSuccess ? "success-cta" : ""} ${pulse ? "pulse-once" : ""}`.trim();
    }
  }

  // ==================== TRANSCRIPT COMPONENT ====================
  function renderCollapsibleTranscript({ tProg, key, segments, videoEl }) {
    const isExpanded = !!tProg.transcriptOpen[key];

    const segNodes = segments.map(seg =>
      h(
        "div",
        { className: "t-seg" },
        h(
          "div",
          { className: "t-seg-meta" },
          h(
            "button",
            {
              type: "button",
              className: "ts-chip",
              title: `Tua tới ${seg.ts}`,
              onClick: () => {
                videoEl.currentTime = seg.time;
                videoEl.play().catch(() => {});
                videoEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
              }
            },
            seg.ts
          ),
          h("span", { className: "t-seg-label" }, seg.label)
        ),
        h("p", { className: "t-seg-text" }, seg.text)
      )
    );

    const listEl = h("div", { className: `transcript-list ${isExpanded ? "" : "collapsed"}` }, ...segNodes);

    const toggleBtn = h(
      "button",
      {
        type: "button",
        className: "expand-btn",
        "aria-expanded": isExpanded ? "true" : "false",
        onClick: () => {
          tProg.transcriptOpen[key] = !tProg.transcriptOpen[key];
          saveState();
          const nowOpen = tProg.transcriptOpen[key];
          listEl.classList.toggle("collapsed", !nowOpen);
          toggleBtn.setAttribute("aria-expanded", nowOpen ? "true" : "false");
          toggleBtn.textContent = nowOpen
            ? "Thu gọn bản ghi lời ↑"
            : `Đọc toàn bộ bản ghi lời (${segments.length} đoạn) ↓`;
        }
      },
      isExpanded ? "Thu gọn bản ghi lời ↑" : `Đọc toàn bộ bản ghi lời (${segments.length} đoạn) ↓`
    );

    videoEl.addEventListener("timeupdate", () => {
      const t = videoEl.currentTime;
      let activeIdx = -1;
      for (let i = 0; i < segments.length; i++) {
        const nextT = i + 1 < segments.length ? segments[i + 1].time : Infinity;
        if (t >= segments[i].time && t < nextT) {
          activeIdx = i;
          break;
        }
      }
      segNodes.forEach((node, i) => {
        node.classList.toggle("playing", i === activeIdx && !videoEl.paused);
      });
    });

    return h(
      "section",
      { className: "surface-card", "aria-label": "Bản ghi lời giảng" },
      h(
        "div",
        { className: "transcript-head" },
        h("h2", { className: "transcript-title" }, "Bản ghi lời giảng (Transcript)"),
        h("span", { className: "transcript-hint" }, "Bấm mốc thời gian để tua nhanh tới câu tương ứng")
      ),
      listEl,
      h("div", { className: "transcript-foot" }, toggleBtn)
    );
  }

  // ==================== SCREEN 0: WELCOME & JOURNEY CHOICE ====================
  function renderWelcomeScreen(container) {
    const cards = Object.values(DATA.scenarios).map(sc => {
      const tProg = state.tracks[sc.id];
      const doneCount = Object.keys(tProg.doneSteps).length;
      const resumeStep = tProg.lastStep > 1 ? tProg.lastStep : 1;

      return h(
        "button",
        {
          type: "button",
          className: "journey-card",
          onClick: () => goTo(sc.id, resumeStep)
        },
        h(
          "div",
          null,
          h(
            "div",
            { className: "journey-card-head" },
            h("span", { className: "journey-audience" }, sc.audienceLabel || sc.badge),
            doneCount > 0 && h("span", { className: "journey-resume-pill" }, `Đã qua ${doneCount}/7`)
          ),
          h("h2", { className: "journey-title" }, sc.cardTitle || sc.shortName)
        ),
        h(
          "div",
          { className: "journey-foot" },
          h("span", { className: "journey-meta" }, `Video 3 phút · 4 bài tập`),
          h("span", { className: "journey-arrow-circle", "aria-hidden": "true" }, "→")
        )
      );
    });

    container.appendChild(
      h(
        "div",
        { className: "welcome-stage" },
        h(
          "div",
          { className: "welcome-hero" },
          h("span", { className: "welcome-kicker" }, "BÀI 01 · KỸ NĂNG CỐT LÕI"),
          h("h1", { className: "welcome-title" }, "Tóm tắt tài liệu dài cùng Gemini"),
          h(
            "p",
            { className: "welcome-sub" },
            "AI tóm tắt đúng từng chữ mà vẫn có thể bỏ sót ",
            h("span", { className: "marker-sweep" }, "điều quan trọng nhất"),
            " — làm sao để không sập bẫy?"
          )
        ),
        h("p", { className: "journey-section-label" }, "Chọn tình huống của bạn để bắt đầu:"),
        h("div", { className: "journey-grid" }, ...cards)
      )
    );
  }

  // Helper: Build Centered Video Box with Play Overlay
  function buildCenteredVideoBox(videoEl) {
    const playOverlay = h(
      "button",
      {
        type: "button",
        className: "center-play-overlay",
        "aria-label": "Phát video bài học",
        onClick: () => {
          videoEl.play().catch(() => {});
        }
      },
      h("span", { className: "center-play-circle", "aria-hidden": "true" }, "▶")
    );

    videoEl.addEventListener("play", () => {
      playOverlay.classList.add("hidden-overlay");
    });
    videoEl.addEventListener("pause", () => {
      if (videoEl.currentTime === 0 || videoEl.ended) {
        playOverlay.classList.remove("hidden-overlay");
      }
    });

    return h(
      "div",
      { className: "cinema-stage" },
      h("div", { className: "cinema-video-box" }, videoEl, playOverlay)
    );
  }

  // Helper: Build Full Segment List for Drawer
  function buildTranscriptSegmentsPanel(segments, videoEl) {
    const segNodes = segments.map(seg =>
      h(
        "div",
        { className: "t-seg" },
        h(
          "div",
          { className: "t-seg-meta" },
          h(
            "button",
            {
              type: "button",
              className: "ts-chip",
              title: `Tua tới ${seg.ts}`,
              onClick: () => {
                videoEl.currentTime = seg.time;
                videoEl.play().catch(() => {});
                videoEl.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            },
            seg.ts
          ),
          h("span", { className: "t-seg-label" }, seg.label)
        ),
        h("p", { className: "t-seg-text" }, seg.text)
      )
    );

    videoEl.addEventListener("timeupdate", () => {
      const t = videoEl.currentTime;
      let activeIdx = -1;
      for (let i = 0; i < segments.length; i++) {
        const nextT = i + 1 < segments.length ? segments[i + 1].time : Infinity;
        if (t >= segments[i].time && t < nextT) {
          activeIdx = i;
          break;
        }
      }
      segNodes.forEach((node, i) => {
        node.classList.toggle("playing", i === activeIdx && !videoEl.paused);
      });
    });

    return h(
      "section",
      { className: "surface-card", style: "margin-bottom:0", "aria-label": "Bản ghi lời giảng đầy đủ" },
      h(
        "div",
        { className: "transcript-head" },
        h("h2", { className: "transcript-title" }, "Bản ghi lời giảng đầy đủ (Transcript)"),
        h("span", { className: "transcript-hint" }, "Bấm mốc thời gian để tua nhanh tới đoạn tương ứng")
      ),
      h("div", { className: "transcript-list" }, ...segNodes)
    );
  }

  // ==================== STEP 1: CENTERED SCENARIO VIDEO ====================
  function renderStep1Scenario(container, scenarioId, tProg) {
    const sc = DATA.scenarios[scenarioId];
    const stageRoot = document.getElementById("stage-main");

    const video = h("video", {
      controls: true,
      preload: "none",
      playsinline: true,
      poster: sc.posterSrc || "",
      src: sc.videoSrc
    });

    video.addEventListener("ended", () => {
      tProg.doneSteps[1] = true;
      saveState();
      updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: 1 });
      configureDock({
        prevLabel: "← Đổi tình huống",
        onPrev: () => {
          pauseAllVideos();
          goTo(null, 0);
        },
        statusText: "Đã xem xong tình huống thực tế!",
        nextLabel: "Tiếp tục sang Quy luật 4D →",
        onNext: () => {
          pauseAllVideos();
          goTo(scenarioId, 2);
        },
        nextSuccess: true,
        pulse: true
      });
    });

    const cinemaBox = buildCenteredVideoBox(video);
    const transcriptPanel = buildTranscriptSegmentsPanel(sc.segments, video);
    let isOpen = !!tProg.transcriptOpen.scenario;
    transcriptPanel.hidden = !isOpen;
    stageRoot?.classList.toggle("drawer-expanded", isOpen);

    const toggleBtn = h(
      "button",
      {
        type: "button",
        className: `drawer-pill-btn ${isOpen ? "active" : ""}`,
        "aria-expanded": isOpen ? "true" : "false",
        onClick: () => {
          isOpen = !isOpen;
          tProg.transcriptOpen.scenario = isOpen;
          saveState();
          transcriptPanel.hidden = !isOpen;
          toggleBtn.classList.toggle("active", isOpen);
          toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
          toggleBtn.textContent = isOpen
            ? "Thu gọn bản ghi lời ↑"
            : `Đọc bản ghi lời (${sc.duration}) ↓`;
          stageRoot?.classList.toggle("drawer-expanded", isOpen);
          if (isOpen) {
            setTimeout(() => transcriptPanel.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      },
      isOpen ? "Thu gọn bản ghi lời ↑" : `Đọc bản ghi lời (${sc.duration}) ↓`
    );

    const drawerWrap = h(
      "div",
      { className: "theater-drawer-wrap" },
      h(
        "div",
        { className: "theater-drawer-bar" },
        h("span", { className: "drawer-snippet" }, `“${sc.segments[0]?.text || ""}”`),
        h("div", { className: "drawer-btn-group" }, toggleBtn)
      ),
      transcriptPanel
    );

    container.appendChild(h("div", { className: "video-theater-stage" }, cinemaBox, drawerWrap));

    configureDock({
      prevLabel: "← Đổi tình huống",
      onPrev: () => {
        pauseAllVideos();
        goTo(null, 0);
      },
      statusText: tProg.doneSteps[1] ? "Đã hoàn thành trang này" : `${sc.badge} · ${sc.shortName}`,
      nextLabel: "Tiếp tục sang Quy luật 4D →",
      onNext: () => {
        tProg.doneSteps[1] = true;
        saveState();
        pauseAllVideos();
        goTo(scenarioId, 2);
      },
      nextSuccess: !!tProg.doneSteps[1]
    });
  }

  // ==================== STEP 2: CENTERED 4D VIDEO ====================
  function renderStep2FourD(container, scenarioId, tProg) {
    const sc = DATA.scenarios[scenarioId];
    const fd = sc.fourD;
    const stageRoot = document.getElementById("stage-main");

    const video = h("video", {
      controls: true,
      preload: "none",
      playsinline: true,
      poster: fd.posterSrc || "",
      src: fd.videoSrc
    });

    video.addEventListener("ended", () => {
      tProg.doneSteps[2] = true;
      saveState();
      updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: 2 });
      configureDock({
        prevLabel: "← Trang 1: Tình huống",
        onPrev: () => {
          pauseAllVideos();
          goTo(scenarioId, 1);
        },
        statusText: "Đã nắm trọn Khung 4D! Sẵn sàng vào bài tập.",
        nextLabel: "Bắt đầu Bài tập 1 →",
        onNext: () => {
          pauseAllVideos();
          goTo(scenarioId, 3);
        },
        nextSuccess: true,
        pulse: true
      });
    });

    const cinemaBox = buildCenteredVideoBox(video);
    const transcriptPanel = buildTranscriptSegmentsPanel(fd.segments, video);

    const refBox = h(
      "section",
      { className: "surface-card", style: "margin-bottom:0", "aria-label": "Tóm tắt Khung 4D" },
      h(
        "div",
        { className: "mantra-strip" },
        h("p", { className: "mantra-row warn" }, "✕ Mình không nghĩ — AI làm thay — Ra rác bóng bẩy!"),
        h("p", { className: "mantra-row good" }, "✓ Mình nghĩ trước — AI làm cùng — Mình kiểm cuối!")
      ),
      h(
        "div",
        { className: "d4-cards" },
        ...DATA.fourDSummary.map(d =>
          h(
            "div",
            { className: "d4-card" },
            h("span", { className: "d4-code" }, d.code),
            h("p", { className: "d4-name" }, d.title),
            h("p", { className: "d4-desc" }, d.desc)
          )
        )
      )
    );

    let activeDrawer = tProg.transcriptOpen.fourD ? "transcript" : null;
    transcriptPanel.hidden = activeDrawer !== "transcript";
    refBox.hidden = activeDrawer !== "ref4d";
    stageRoot?.classList.toggle("drawer-expanded", activeDrawer !== null);

    const transBtn = h("button", { type: "button", className: "drawer-pill-btn" });
    const refBtn = h("button", { type: "button", className: "drawer-pill-btn" });

    function syncDrawers() {
      const openTrans = activeDrawer === "transcript";
      const openRef = activeDrawer === "ref4d";
      transcriptPanel.hidden = !openTrans;
      refBox.hidden = !openRef;
      transBtn.classList.toggle("active", openTrans);
      refBtn.classList.toggle("active", openRef);
      transBtn.textContent = openTrans ? "Thu gọn bản ghi lời ↑" : `Đọc bản ghi lời (${fd.duration}) ↓`;
      refBtn.textContent = openRef ? "Thu gọn Tóm tắt 4D ↑" : "Bảng tóm tắt 4 Chữ D ↓";
      stageRoot?.classList.toggle("drawer-expanded", activeDrawer !== null);
    }

    transBtn.onclick = () => {
      activeDrawer = activeDrawer === "transcript" ? null : "transcript";
      tProg.transcriptOpen.fourD = activeDrawer === "transcript";
      saveState();
      syncDrawers();
      if (activeDrawer) {
        setTimeout(() => transcriptPanel.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    refBtn.onclick = () => {
      activeDrawer = activeDrawer === "ref4d" ? null : "ref4d";
      tProg.transcriptOpen.fourD = false;
      saveState();
      syncDrawers();
      if (activeDrawer) {
        setTimeout(() => refBox.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    syncDrawers();

    const drawerWrap = h(
      "div",
      { className: "theater-drawer-wrap" },
      h(
        "div",
        { className: "theater-drawer-bar" },
        h("span", { className: "drawer-snippet" }, `“${fd.segments[0]?.text || ""}”`),
        h("div", { className: "drawer-btn-group" }, transBtn, refBtn)
      ),
      transcriptPanel,
      refBox
    );

    container.appendChild(h("div", { className: "video-theater-stage" }, cinemaBox, drawerWrap));

    configureDock({
      prevLabel: "← Trang 1: Tình huống",
      onPrev: () => {
        pauseAllVideos();
        goTo(scenarioId, 1);
      },
      statusText: tProg.doneSteps[2] ? "Đã hoàn thành trang này" : fd.bridgeNote,
      nextLabel: "Tiếp tục sang Bài tập 1 →",
      onNext: () => {
        tProg.doneSteps[2] = true;
        saveState();
        pauseAllVideos();
        goTo(scenarioId, 3);
      },
      nextSuccess: !!tProg.doneSteps[2]
    });
  }

  // ==================== STEP 3: ACTIVITY 1 — QUIZ ====================
  function renderStep3Quiz(container, scenarioId, tProg) {
    const act = DATA.activities[0];
    if (!tProg.acts[act.id]) tProg.acts[act.id] = { qIdx: 0, picked: [] };
    const aState = tProg.acts[act.id];

    const cardHost = h("div", { className: "surface-card" });

    function drawQuiz() {
      const qs = act.questions;
      const idx = Math.min(aState.qIdx || 0, qs.length - 1);
      const qObj = qs[idx];
      const picked = typeof aState.picked[idx] === "number" ? aState.picked[idx] : null;
      const allAnswered = qs.every((_, i) => typeof aState.picked[i] === "number");
      const score = qs.reduce((acc, q, i) => acc + (aState.picked[i] === q.answer ? 1 : 0), 0);

      if (allAnswered && !tProg.doneSteps[3]) {
        tProg.doneSteps[3] = true;
        saveState();
        updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: 3 });
      }

      const dots = h(
        "div",
        { className: "quiz-dots" },
        h(
          "div",
          { className: "dot-track" },
          ...qs.map((q, i) => {
            let cls = "q-dot";
            if (typeof aState.picked[i] === "number") {
              cls += aState.picked[i] === q.answer ? " right" : " missed";
            } else if (i === idx) {
              cls += " current";
            }
            return h("span", { className: cls });
          })
        ),
        h(
          "span",
          { style: "font-family:var(--font-mono);font-size:0.78rem;color:var(--ink-muted)" },
          `Câu ${idx + 1}/${qs.length}`
        )
      );

      const opts = h(
        "div",
        { className: "quiz-opts" },
        ...qObj.options.map((opt, optIdx) => {
          let cls = "quiz-opt-card";
          if (picked !== null) {
            if (optIdx === qObj.answer) cls += " correct";
            else if (optIdx === picked) cls += " wrong";
            else cls += " dim";
          }
          return h(
            "button",
            {
              type: "button",
              disabled: picked !== null,
              className: cls,
              onClick: () => {
                aState.picked[idx] = optIdx;
                saveState();
                drawQuiz();
              }
            },
            opt
          );
        })
      );

      const children = [dots, h("p", { className: "quiz-q-text" }, qObj.q), opts];

      if (picked !== null) {
        const isOk = picked === qObj.answer;
        children.push(
          h(
            "div",
            { className: `explain-box ${isOk ? "ok" : ""}`, role: "status" },
            h("strong", null, isOk ? "✓ Chính xác! " : "✕ Điểm dễ nhầm: "),
            qObj.explain
          ),
          h(
            "div",
            { style: "margin-top:0.95rem;display:flex;gap:0.5rem;flex-wrap:wrap" },
            idx > 0 &&
              h(
                "button",
                {
                  type: "button",
                  className: "btn-secondary",
                  onClick: () => {
                    aState.qIdx = idx - 1;
                    saveState();
                    drawQuiz();
                  }
                },
                "‹ Xem lại câu trước"
              ),
            h(
              "button",
              {
                type: "button",
                className: "btn-secondary",
                onClick: () => {
                  aState.qIdx = 0;
                  aState.picked = [];
                  saveState();
                  drawQuiz();
                }
              },
              "Làm lại 4 câu"
            )
          )
        );
      }

      cardHost.replaceChildren(...children);

      const isLastQ = idx === qs.length - 1;
      configureDock({
        prevLabel: idx > 0 ? `← Câu ${idx}/${qs.length}` : "← Trang 2: Quy luật 4D",
        onPrev: () => {
          if (idx > 0) {
            aState.qIdx = idx - 1;
            saveState();
            drawQuiz();
          } else {
            goTo(scenarioId, 2);
          }
        },
        statusText:
          picked === null
            ? `Chọn 1 đáp án cho câu ${idx + 1}/${qs.length}`
            : allAnswered
            ? `Đã hoàn thành ${score}/${qs.length} câu trắc nghiệm`
            : `Đã trả lời câu ${idx + 1}/${qs.length}`,
        nextLabel:
          picked !== null && !isLastQ
            ? `Sang câu ${idx + 2}/${qs.length} →`
            : allAnswered
            ? `Đạt ${score}/${qs.length} · Sang Bài tập 2 →`
            : "Bỏ qua sang Bài tập 2 →",
        onNext: () => {
          if (picked !== null && !isLastQ) {
            aState.qIdx = idx + 1;
            saveState();
            drawQuiz();
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            goTo(scenarioId, 4);
          }
        },
        nextSuccess: picked !== null,
        pulse: picked !== null
      });
    }

    container.append(
      h(
        "header",
        { className: "step-header" },
        h("p", { className: "step-eyebrow" }, `TRANG 3 / 7 · ${act.phase}`),
        h("h1", { className: "step-title", tabindex: "-1" }, act.title),
        h("p", { className: "step-lead" }, act.lead)
      ),
      cardHost
    );

    drawQuiz();
  }

  // ==================== STEP 4: ACTIVITY 2 — SORT ====================
  function renderStep4Sort(container, scenarioId, tProg) {
    const act = DATA.activities[1];
    if (!tProg.acts[act.id]) tProg.acts[act.id] = { assigned: {}, checked: false };
    const aState = tProg.acts[act.id];

    const cardHost = h("div", { className: "surface-card" });

    function drawSort() {
      const cards = scenarioId === "student" ? act.cardsStudent || act.cards : act.cardsAdult || act.cards;
      const cols = act.columns;
      const allPicked = cards.every((_, i) => typeof aState.assigned[i] === "number");
      const correctCount = cards.filter((c, i) => aState.assigned[i] === c.col).length;

      const list = h(
        "ul",
        { className: "sort-cards-list" },
        ...cards.map((c, i) => {
          const pickedCol = aState.assigned[i];
          const isOk = pickedCol === c.col;
          const rowCls = aState.checked ? `sort-row ${isOk ? "correct" : "wrong"}` : "sort-row";

          return h(
            "li",
            { className: rowCls },
            h("p", { style: "margin:0;font-weight:500;font-size:0.95rem" }, c.label),
            h(
              "div",
              { className: "sort-pill-group" },
              ...cols.map((colName, cIdx) =>
                h(
                  "button",
                  {
                    type: "button",
                    disabled: aState.checked,
                    className: `sort-pill ${pickedCol === cIdx ? "selected" : ""}`,
                    onClick: () => {
                      aState.assigned[i] = cIdx;
                      saveState();
                      drawSort();
                    }
                  },
                  colName
                )
              )
            ),
            aState.checked &&
              h(
                "p",
                { style: "margin:0.55rem 0 0;font-size:0.86rem;color:var(--ink-secondary)" },
                h("strong", null, isOk ? "✓ Đúng: " : `✕ Thuộc nhóm “${cols[c.col]}”: `),
                c.why
              )
          );
        })
      );

      const nodes = [list];

      if (aState.checked) {
        nodes.push(
          h(
            "div",
            { className: `explain-box ${correctCount === cards.length ? "ok" : ""}`, role: "status" },
            h("strong", null, `Kết quả: Đúng ${correctCount}/${cards.length} hành vi. `),
            correctCount === cards.length
              ? "Tuyệt vời! Bạn nhận diện rất sắc ranh giới giữa giao phó cho máy và chủ động cầm lái."
              : "Xem giải thích ngay dưới từng tình huống hoặc bấm Chọn lại để thử lần nữa."
          ),
          h(
            "div",
            { style: "margin-top:1rem;display:flex;gap:0.65rem;flex-wrap:wrap" },
            h(
              "button",
              {
                type: "button",
                className: "btn-secondary",
                onClick: () => {
                  aState.checked = false;
                  saveState();
                  drawSort();
                }
              },
              "Chọn lại"
            )
          )
        );
      } else {
        nodes.push(
          h(
            "div",
            { style: "margin-top:1.1rem" },
            h(
              "button",
              {
                type: "button",
                disabled: !allPicked,
                className: "btn-tactile",
                onClick: () => {
                  aState.checked = true;
                  tProg.doneSteps[4] = true;
                  saveState();
                  updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: 4 });
                  drawSort();
                }
              },
              allPicked ? "Kiểm tra đáp án phân loại" : "Chọn đủ ngăn cho 6 hành vi để kiểm tra"
            )
          )
        );
      }

      cardHost.replaceChildren(...nodes);

      configureDock({
        prevLabel: "← Bài tập 1 (Trắc nghiệm)",
        onPrev: () => goTo(scenarioId, 3),
        statusText: aState.checked ? `Đã kiểm tra (${correctCount}/${cards.length} thẻ đúng)` : "Phân loại 6 hành vi thực tế",
        nextLabel: "Tiếp tục sang Bài tập 3 →",
        onNext: () => goTo(scenarioId, 5),
        nextSuccess: !!tProg.doneSteps[4],
        pulse: !!aState.checked
      });
    }

    container.append(
      h(
        "header",
        { className: "step-header" },
        h("p", { className: "step-eyebrow" }, `TRANG 4 / 7 · ${act.phase}`),
        h("h1", { className: "step-title", tabindex: "-1" }, act.title),
        h("p", { className: "step-lead" }, act.lead)
      ),
      cardHost
    );

    drawSort();
  }

  // ==================== STEP 5: ACTIVITY 3 — SCQ PROMPT BUILDER ====================
  function renderStep5Fill(container, scenarioId, tProg) {
    const act = DATA.activities[2];
    if (!tProg.acts[act.id] || !Array.isArray(tProg.acts[act.id].values) || tProg.acts[act.id].values.length !== act.fields.length) {
      tProg.acts[act.id] = { values: act.fields.map(() => "") };
    }
    const aState = tProg.acts[act.id];
    const isStudent = scenarioId === "student";
    const fields = act.fields;
    const matchedCaseFile = DATA.caseFiles.find(cf => cf.forScenario === scenarioId) || DATA.caseFiles[0];

    function isComplete() {
      return fields.every((_, i) => (aState.values[i] || "").trim().length > 0);
    }

    function buildPromptText() {
      const sVal = (aState.values[0] || "").trim() || "[S]";
      const cVal = (aState.values[1] || "").trim() || "[C]";
      const qVal = (aState.values[2] || "").trim().replace(/\?+$/, "") || "[Q]";
      return `Mình đang ${sVal}, nhưng ${cVal}. Mình cần biết: ${qVal}? Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.`;
    }

    const synBody = h("div", { className: "synthesis-body", style: "white-space:pre-line" });
    const selfCheckBanner = h("div", { className: "explain-box ok", hidden: !tProg.doneSteps[5] }, act.revealNote);

    const copyBtn = h(
      "button",
      {
        type: "button",
        disabled: !isComplete(),
        className: "btn-tactile",
        style: "margin-top:0.95rem",
        onClick: () => copyText(buildPromptText())
      },
      "📋 Sao chép câu lệnh để dán vào AI"
    );

    const samplePdfLink = h(
      "a",
      {
        href: matchedCaseFile.fileHref,
        target: "_blank",
        rel: "noopener",
        className: "btn-secondary",
        style: "margin-top:0.95rem"
      },
      "Tải PDF mẫu 12 trang để thử ngay ↗"
    );

    function syncStatementAndDock() {
      const slotNode = (i, fallback) => {
        const val = (aState.values[i] || "").trim();
        return h("span", { className: `syn-slot ${val ? "" : "empty"}` }, val || fallback);
      };

      synBody.replaceChildren(
        "Mình đang ",
        slotNode(0, "[S - đang làm gì]"),
        ", nhưng ",
        slotNode(1, "[C - vướng & lo gì]"),
        ". Mình cần biết: ",
        slotNode(2, "[Q - câu hỏi mấu chốt]"),
        "? Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé."
      );

      const ready = isComplete();
      copyBtn.disabled = !ready;
      if (ready && !tProg.doneSteps[5]) {
        tProg.doneSteps[5] = true;
        selfCheckBanner.hidden = false;
        saveState();
        updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: 5 });
      }

      configureDock({
        prevLabel: "← Bài tập 2 (Phân loại)",
        onPrev: () => goTo(scenarioId, 4),
        statusText: ready ? "Câu lệnh SCQ đã sẵn sàng để sao chép!" : "Điền đủ 3 ô (S) – (C) – (Q) bên trên",
        nextLabel: "Tiếp tục sang Bài tập 4 →",
        onNext: () => goTo(scenarioId, 6),
        nextSuccess: ready
      });
    }

    const textareas = [];
    const fieldNodes = fields.map((f, idx) => {
      const hint = isStudent ? f.hintStudent : f.hintAdult;
      const sample = isStudent ? f.sampleStudent : f.sampleAdult;
      const id = `causal-slot-${f.slot}`;
      const ta = h("textarea", {
        id,
        rows: 2,
        className: "clean-textarea",
        placeholder: `Điền (${f.slot}) — ví dụ: “${sample}”`,
        value: aState.values[idx] || "",
        onInput: e => {
          aState.values[idx] = e.target.value;
          saveState();
          syncStatementAndDock();
        }
      });
      textareas.push(ta);

      return h(
        "div",
        { className: "causal-field" },
        h("label", { for: id, className: "causal-label" }, h("span", { className: "slot-tag" }, `(${f.slot})`), f.label),
        h("p", { className: "causal-hint" }, hint),
        ta
      );
    });

    const toolbar = h(
      "div",
      { className: "helper-toolbar" },
      h("span", null, `Gợi ý đang khớp theo: ${isStudent ? "Hành trình Học sinh" : "Hành trình Người lớn"}`),
      h(
        "div",
        { style: "display:flex;gap:0.45rem;flex-wrap:wrap" },
        h(
          "button",
          {
            type: "button",
            className: "icon-tool-btn",
            onClick: () => {
              fields.forEach((f, idx) => {
                const sample = isStudent ? f.sampleStudent : f.sampleAdult;
                aState.values[idx] = sample;
                textareas[idx].value = sample;
              });
              saveState();
              syncStatementAndDock();
              showToast("Đã điền thử mẫu SCQ! Bạn có thể sửa lại theo tài liệu thật hoặc sao chép dùng thử ngay.");
            }
          },
          "Điền thử mẫu SCQ"
        ),
        h(
          "button",
          {
            type: "button",
            className: "icon-tool-btn",
            onClick: () => {
              fields.forEach((_, idx) => {
                aState.values[idx] = "";
                textareas[idx].value = "";
              });
              saveState();
              syncStatementAndDock();
            }
          },
          "Xóa trống"
        )
      )
    );

    const card = h(
      "div",
      { className: "surface-card" },
      toolbar,
      h("div", { className: "causal-grid" }, ...fieldNodes),
      h(
        "div",
        { className: "live-synthesis-card" },
        h("p", { className: "synthesis-kicker" }, "Câu lệnh bỏ túi: SCQ + Trang – Sót – Bàn (Dán vào Gemini / ChatGPT)"),
        synBody,
        h("div", { style: "display:flex;gap:0.65rem;flex-wrap:wrap" }, copyBtn, samplePdfLink)
      ),
      selfCheckBanner
    );

    container.append(
      h(
        "header",
        { className: "step-header" },
        h("p", { className: "step-eyebrow" }, `TRANG 5 / 7 · ${act.phase}`),
        h("h1", { className: "step-title", tabindex: "-1" }, act.title),
        h("p", { className: "step-lead" }, act.lead)
      ),
      card
    );

    syncStatementAndDock();
  }

  // ==================== STEP 6: ACTIVITY 4 — REAL TASK + 4D CHECKLIST ====================
  function renderStep6Write(container, scenarioId, tProg) {
    const act = DATA.activities[3];
    if (!tProg.acts[act.id]) tProg.acts[act.id] = { values: ["", ""], checks: {} };
    const aState = tProg.acts[act.id];

    function checkReady() {
      const hasAllText = act.fields.every((_, i) => (aState.values[i] || "").trim().length > 0);
      const checkedCount = act.checklist.filter((_, i) => !!aState.checks[i]).length;
      return hasAllText && checkedCount >= 2;
    }

    function updateStatus() {
      const rdy = checkReady();
      if (rdy && !tProg.doneSteps[6]) {
        tProg.doneSteps[6] = true;
        saveState();
        updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: 6 });
      }
      configureDock({
        prevLabel: "← Bài tập 3 (Khung nhân quả)",
        onPrev: () => goTo(scenarioId, 5),
        statusText: rdy ? "Đã sẵn sàng tổng kết Bài 01!" : "Điền 2 ô và tick cam kết để hoàn tất",
        nextLabel: "Hoàn thành & Xem Tổng kết →",
        onNext: () => {
          if (rdy) tProg.doneSteps[7] = true;
          saveState();
          goTo(scenarioId, 7);
        },
        nextSuccess: rdy,
        pulse: rdy
      });
    }

    const fieldNodes = act.fields.map((f, idx) => {
      const id = `real-write-${idx}`;
      return h(
        "div",
        { className: "causal-field" },
        h("label", { for: id, className: "causal-label" }, f.label),
        h("textarea", {
          id,
          rows: 3,
          className: "clean-textarea",
          placeholder: f.placeholder,
          value: aState.values[idx] || "",
          onInput: e => {
            aState.values[idx] = e.target.value;
            saveState();
            updateStatus();
          }
        })
      );
    });

    const checklistEl = h(
      "fieldset",
      { className: "rubric-box" },
      h("legend", { style: "font-weight:700;font-size:0.9rem;padding:0 0.35rem" }, "Bảng cam kết tự kiểm 4 chữ D"),
      ...act.checklist.map((item, i) =>
        h(
          "label",
          { className: "rubric-item" },
          h("input", {
            type: "checkbox",
            checked: !!aState.checks[i],
            onChange: e => {
              aState.checks[i] = e.target.checked;
              saveState();
              updateStatus();
            }
          }),
          h("span", null, item)
        )
      )
    );

    container.append(
      h(
        "header",
        { className: "step-header" },
        h("p", { className: "step-eyebrow" }, `TRANG 6 / 7 · ${act.phase}`),
        h("h1", { className: "step-title", tabindex: "-1" }, act.title),
        h("p", { className: "step-lead" }, act.lead)
      ),
      h("div", { className: "surface-card" }, h("div", { className: "causal-grid" }, ...fieldNodes), checklistEl)
    );

    updateStatus();
  }

  // ==================== STEP 7: SUMMARY & TRAP PDF CASE FILES ====================
  function renderStep7Summary(container, scenarioId, tProg) {
    tProg.doneSteps[7] = true;
    saveState();
    updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: 7 });

    const exSteps = [3, 4, 5, 6];
    const doneEx = exSteps.filter(n => !!tProg.doneSteps[n]);
    const missingEx = exSteps.filter(n => !tProg.doneSteps[n]);
    const otherId = scenarioId === "adult" ? "student" : "adult";
    const otherSc = DATA.scenarios[otherId];

    const fillVals = tProg.acts["act-fill"]?.values || [];
    const hasFill = fillVals.some(v => (v || "").trim().length > 0);

    const summaryCard = h(
      "section",
      { className: "summary-hero-card" },
      h("span", { className: "completion-badge" }, `✓ ĐÃ HOÀN TẤT ${doneEx.length}/4 BÀI TẬP THỰC HÀNH`),
      h("h1", { className: "step-title", tabindex: "-1" }, "Tổng kết Chinh phục Bài 01 · Khung Tư duy 4D"),
      h(
        "p",
        { className: "step-lead" },
        "Bạn đã nắm trọn quy tắc cốt lõi: Mình nghĩ trước — AI làm cùng — Mình kiểm cuối. Dưới đây là bản lưu tư duy của bạn và kho hồ sơ PDF mẫu để tự đối chiếu."
      ),
      missingEx.length > 0 &&
        h(
          "div",
          { className: "explain-box", style: "margin-top:1rem" },
          "Bạn còn ",
          h("strong", null, `${missingEx.length} bài tập chưa hoàn tất`),
          ". Bấm quay lại làm nốt bất cứ lúc nào: ",
          ...missingEx.map(n =>
            h(
              "button",
              {
                type: "button",
                className: "icon-tool-btn",
                style: "margin-left:0.4rem",
                onClick: () => goTo(scenarioId, n)
              },
              `Mở Trang ${n} (${STEPS_META[n - 1].short})`
            )
          )
        ),
      h(
        "div",
        { className: "live-synthesis-card" },
        h("p", { className: "synthesis-kicker" }, "Công thức bỏ túi mang theo ra đời thật: SCQ + Trang – Sót – Bàn"),
        h(
          "p",
          { className: "synthesis-body" },
          hasFill
            ? `“Mình đang ${fillVals[0] || "[S]"}, nhưng ${fillVals[1] || "[C]"}. Mình cần biết: ${(fillVals[2] || "[Q]").replace(/\?+$/, "")}? Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.”`
            : "“Mình đang [S], nhưng [C]. Mình cần biết: [Q]? Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.”"
        )
      )
    );

    const sortedPDFs = [...DATA.caseFiles].sort((a, b) =>
      a.forScenario === scenarioId ? -1 : b.forScenario === scenarioId ? 1 : 0
    );

    const pdfSection = h(
      "section",
      { className: "surface-card" },
      h("h2", { className: "transcript-title", style: "font-size:1.1rem" }, "Kho Hồ sơ PDF 12 trang có cài bẫy (Tự mở đối chiếu)"),
      h("p", { className: "causal-hint", style: "margin-top:0.25rem" }, "Mở trực tiếp bản PDF 12 trang để tận mắt dò các trang gốc được nhắc tới trong bài học:"),
      h(
        "div",
        { className: "pdf-grid" },
        ...sortedPDFs.map(cf =>
          h(
            "div",
            { className: "pdf-card" },
            h(
              "div",
              null,
              h("p", { style: "margin:0 0 0.3rem;font-weight:700;font-size:0.95rem" }, cf.title),
              h("p", { className: "causal-hint" }, cf.meta),
              h(
                "details",
                { className: "trap-spoiler" },
                h("summary", null, "Xem đáp án các điểm bẫy ngầm"),
                h("p", { style: "margin:0.55rem 0 0;font-size:0.86rem;color:var(--ink-secondary)" }, cf.answerSummary)
              )
            ),
            h(
              "div",
              null,
              h("a", { href: cf.fileHref, target: "_blank", rel: "noopener", className: "btn-secondary" }, "Mở tài liệu PDF ↗")
            )
          )
        )
      )
    );

    container.append(summaryCard, pdfSection);

    configureDock({
      prevLabel: "← Bài tập 4",
      onPrev: () => goTo(scenarioId, 6),
      statusText: "Bạn cũng có thể khám phá thêm góc nhìn còn lại",
      nextLabel: `Xem thêm ${otherSc.badge} →`,
      onNext: () => goTo(otherId, 1)
    });
  }

  // ==================== MAIN RENDER DISPATCH ====================
  function render() {
    const route = parseRoute();
    const stage = document.getElementById("stage-main");
    if (!stage) return;

    const animClass = route.step >= prevRouteStep ? "slide-next" : "slide-prev";
    prevRouteStep = route.step;

    updateHeaderAndDock(route);

    stage.classList.toggle("welcome-mode", route.screen === "welcome");
    stage.classList.toggle("theater-mode", route.screen === "step" && (route.step === 1 || route.step === 2));
    if (!(route.screen === "step" && (route.step === 1 || route.step === 2))) {
      stage.classList.remove("drawer-expanded");
    }

    const screenWrap = h("div", { className: `page-screen ${animClass}` });

    if (route.screen === "welcome") {
      renderWelcomeScreen(screenWrap);
    } else {
      const tProg = state.tracks[route.scenario];
      tProg.visited[route.step] = true;
      tProg.lastStep = route.step;
      saveState();

      if (route.step === 1) renderStep1Scenario(screenWrap, route.scenario, tProg);
      else if (route.step === 2) renderStep2FourD(screenWrap, route.scenario, tProg);
      else if (route.step === 3) renderStep3Quiz(screenWrap, route.scenario, tProg);
      else if (route.step === 4) renderStep4Sort(screenWrap, route.scenario, tProg);
      else if (route.step === 5) renderStep5Fill(screenWrap, route.scenario, tProg);
      else if (route.step === 6) renderStep6Write(screenWrap, route.scenario, tProg);
      else renderStep7Summary(screenWrap, route.scenario, tProg);
    }

    stage.replaceChildren(screenWrap);
    window.scrollTo({ top: 0, behavior: "instant" });
    const heading = screenWrap.querySelector(".step-title");
    if (heading) heading.focus({ preventScroll: true });
  }

  // ==================== GLOBAL CONTROLS ====================
  function initControls() {
    document.getElementById("home-chip-btn")?.addEventListener("click", () => {
      pauseAllVideos();
      goTo(null, 0);
    });

    // Live Academy Palette Switcher (88-9-3 Tonal Hierarchy)
    const validPalettes = ["anthropic", "minerva", "brilliant", "sutd"];
    const rawPalette = document.documentElement.dataset.palette;
    const activePalette = validPalettes.includes(rawPalette) ? rawPalette : "anthropic";
    document.documentElement.dataset.palette = activePalette;
    const swatches = document.querySelectorAll(".swatch-btn");
    swatches.forEach(btn => {
      const p = btn.dataset.swatch;
      btn.classList.toggle("active", p === activePalette);
      btn.addEventListener("click", () => {
        document.documentElement.dataset.palette = p;
        try {
          localStorage.setItem(PALETTE_KEY, p);
        } catch (e) {}
        swatches.forEach(b => b.classList.toggle("active", b.dataset.swatch === p));
        const names = {
          anthropic: "Anthropic Academy (Ivory · Đen than · Đất nung)",
          minerva: "Minerva University (Đá vôi ấm · Than chì · Đỏ rượu)",
          brilliant: "Brilliant × Koto (Trắng phấn · Đen tuyền · Xanh lê điện)",
          sutd: "Maven & SUTD × MIT (Xám kiến trúc · Navy đậm · Đỏ cam)"
        };
        showToast(`Đã đổi hệ màu: ${names[p]}`);
      });
    });

    document.getElementById("export-btn")?.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify({ version: 2, exportedAt: new Date().toISOString(), state }, null, 2)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const a = h("a", { href: url, download: "bai-01-tien-do.json" });
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1200);
      showToast("Đã tải tệp sao lưu tiến độ (.json).");
    });

    document.getElementById("reset-btn")?.addEventListener("click", () => {
      if (!window.confirm("Xóa toàn bộ tiến độ và câu trả lời để làm lại từ màn đầu tiên?")) return;
      pauseAllVideos();
      state = defaultState();
      saveState();
      goTo(null, 0);
      render();
      showToast("Đã đặt lại toàn bộ bài học.");
    });

    window.addEventListener("hashchange", () => {
      pauseAllVideos();
      render();
    });
  }

  initControls();
  render();
})();
