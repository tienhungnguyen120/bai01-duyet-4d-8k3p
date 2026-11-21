(() => {
  "use strict";

  const DATA = window.LESSON_01_DATA;
  if (!DATA) return;

  const STORAGE_KEY = "bai01-pageturn-state-v6";
  const PALETTE_KEY = "bai01-palette";
  const PROMPT_TAIL_GENERAL =
    DATA.promptTailGeneral ||
    "Chỉ thêm chỗ mình dễ sót, gợi ý hướng giải quyết và thảo luận cùng mình nhé.";
  const PROMPT_TAIL_DOC =
    DATA.promptTailDoc ||
    "Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.";

  const STEPS_META = [
    { num: 1, short: "Tình huống", label: "Clip Thực chiến trên Gemini thật" },
    { num: 2, short: "Quy luật 4D", label: "Clip Quy luật Tư duy 4D" },
    { num: 3, short: "Bài tập 1", label: "Việc này thuộc bước nào trong 4D?" },
    { num: 4, short: "Bài tập 2", label: "Bắt bệnh câu lệnh S – C – Q" },
    { num: 5, short: "Làm việc thật", label: "Áp dụng S – C – Q vào việc thật" },
    { num: 6, short: "Về nhà · 4F", label: "Bài tập về nhà · Suy ngẫm 4F" },
    { num: 7, short: "Tổng kết", label: "Lưu câu lệnh của bạn & Hồ sơ mẫu" }
  ];
  const TOTAL_STEPS = STEPS_META.length;

  const defaultTrackProgress = () => ({
    lastStep: 1,
    visited: {},
    doneSteps: {},
    transcriptOpen: { scenario: false, fourD: false },
    fourF: { facts: "", feelings: "", findings: "", future: "" },
    peekFourFExample: false,
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
    const scenario =
      scSlug === "hoc-sinh" || scSlug === "student"
        ? "student"
        : scSlug === "nguoi-lon" || scSlug === "adult"
        ? "adult"
        : null;
    if (!scenario) {
      return { screen: "welcome", scenario: null, step: 0 };
    }
    const step = Math.min(TOTAL_STEPS, Math.max(1, Number(stepStr) || 1));
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
    capLeft.textContent = `Trang ${route.step} / ${TOTAL_STEPS}`;
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

  // ==================== 2-PILLAR SPINE STRIP & 3-COLOR SCQ LEGEND ====================
  function renderSpineStrip(activeIndices = [], maskScq = false) {
    const pillars = DATA.spinePillars || [];
    if (!pillars.length) return null;
    return h(
      "div",
      { className: "spine-strip", "aria-label": "Ba bước làm chủ AI theo Khung 4D" },
      ...pillars.map((p, idx) => {
        const isActive = activeIndices.includes(idx);
        const subText = idx === 0 && maskScq ? "Khuôn 3 chữ S – C – Q" : p.sub;
        return [
          idx > 0 && h("span", { className: "spine-arrow", "aria-hidden": "true" }, "→"),
          h(
            "div",
            { className: `spine-node ${isActive ? "active" : ""}` },
            h("span", { className: "spine-step" }, p.step),
            h("span", { className: "spine-sub" }, subText)
          )
        ];
      })
    );
  }

  function renderScqLegend() {
    const meta = DATA.scqMeta || [];
    if (!meta.length) return null;
    return h(
      "div",
      { className: "scq-legend-grid", "aria-label": "Bảng giải nghĩa công thức S – C – Q" },
      ...meta.map(m =>
        h(
          "div",
          { className: `scq-legend-card scq-${m.color}` },
          h(
            "div",
            { className: "scq-legend-top" },
            h(
              "span",
              { className: "scq-legend-title" },
              h("span", { className: `scq-letter-chip chip-${m.color}` }, m.code),
              h("span", null, `${m.en} · `, h("strong", null, m.vi.toUpperCase()))
            ),
            h("span", { className: "scq-signal-tag" }, m.signal)
          ),
          h("p", { className: "scq-legend-desc" }, m.desc)
        )
      )
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
            doneCount > 0 && h("span", { className: "journey-resume-pill" }, `Đã qua ${doneCount}/${TOTAL_STEPS}`)
          ),
          h("h2", { className: "journey-title" }, sc.cardTitle || sc.shortName)
        ),
        h(
          "div",
          { className: "journey-foot" },
          h("span", { className: "journey-meta" }, sc.journeyMeta || `Video ${sc.duration} · 4 bài tập`),
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
          h("span", { className: "welcome-kicker" }, "BÀI 01 · NGHĨ TRƯỚC KHI HỎI AI"),
          h("h1", { className: "welcome-title" }, "Tóm tắt tài liệu dài cùng Gemini"),
          h(
            "p",
            { className: "welcome-sub" },
            "Hỏi “tóm tắt”, AI chỉ kể tài liệu viết gì — nghĩ trước ",
            h("span", { className: "marker-sweep" }, "S (Hoàn cảnh) · C (Cái khó) · Q (Câu hỏi)"),
            ", AI mới chỉ ra bạn mất gì, dùng được gì!"
          )
        ),
        h("p", { className: "journey-section-label" }, "Chọn hành trình gần với bạn nhất để bắt đầu:"),
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
        statusText: "Đã xem xong tình huống thực chiến trên Gemini thật!",
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
        statusText: "Đã nắm trọn Khung 4D! Sẵn sàng vào chuỗi bài tập 4D × SCQ.",
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
      { className: "surface-card", style: "margin-bottom:0", "aria-label": "Tóm tắt Khung 4D × SCQ" },
      h(
        "div",
        { className: "mantra-strip" },
        h("p", { className: "mantra-row warn" }, "✕ Mình không nghĩ — AI làm thay — Ra rác bóng bẩy!"),
        h("p", { className: "mantra-row good" }, "✓ Mình nghĩ trước (S·C·Q) — AI làm cùng (Trang·Sót·Bàn) — Mình kiểm cuối (Chốt A)!")
      ),
      renderScqLegend(),
      h(
        "div",
        { className: "d4-cards", style: "margin-top:0.85rem" },
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
      refBtn.textContent = openRef ? "Thu gọn Tóm tắt 4D × SCQ ↑" : "Bảng tóm tắt 4D × SCQ ↓";
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

  // ==================== ACTIVITY KIND: SORT (4D × SCQ ROLES) ====================
  function renderActivitySort(container, scenarioId, tProg, act, stepNum) {
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
                h("strong", null, isOk ? "✓ Đúng bước: " : `✕ Thuộc “${cols[c.col]}”: `),
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
            h("strong", null, `Kết quả: Đúng ${correctCount}/${cards.length} việc làm. `),
            correctCount === cards.length
              ? "Xuất sắc! Bạn đã nắm chắc ranh giới giữa 3 bước: Mình nghĩ trước — AI làm cùng — Mình kiểm cuối."
              : "Xem giải thích ngắn dưới câu chưa đúng hoặc bấm Chọn lại để làm lại nhé."
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
                  tProg.doneSteps[stepNum] = true;
                  saveState();
                  updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: stepNum });
                  drawSort();
                }
              },
              allPicked ? "Kiểm tra đáp án" : `Chọn bước cho đủ ${cards.length} việc để kiểm tra`
            )
          )
        );
      }

      cardHost.replaceChildren(...nodes);

      configureDock({
        prevLabel: `← Trang ${stepNum - 1}: ${STEPS_META[stepNum - 2].short}`,
        onPrev: () => goTo(scenarioId, stepNum - 1),
        statusText: aState.checked
          ? `Đã kiểm tra (${correctCount}/${cards.length} câu đúng)`
          : "Chọn bước tương ứng cho từng việc bên trên",
        nextLabel: `Tiếp tục sang ${STEPS_META[stepNum].short} →`,
        onNext: () => goTo(scenarioId, stepNum + 1),
        nextSuccess: !!tProg.doneSteps[stepNum],
        pulse: !!aState.checked
      });
    }

    container.append(
      renderSpineStrip(act.spineActive),
      h(
        "header",
        { className: "step-header" },
        h("p", { className: "step-eyebrow" }, `TRANG ${stepNum} / ${TOTAL_STEPS} · ${act.phase}`),
        h("h1", { className: "step-title", tabindex: "-1" }, act.title),
        h("p", { className: "step-lead" }, act.lead)
      ),
      cardHost
    );

    drawSort();
  }

  // ==================== ACTIVITY KIND: QUIZ (S - C - Q DISCRIMINATION & DIAGNOSTICS) ====================
  function renderActivityQuiz(container, scenarioId, tProg, act, stepNum) {
    if (!tProg.acts[act.id]) tProg.acts[act.id] = { qIdx: 0, picked: [] };
    const aState = tProg.acts[act.id];

    const spineWrap = h("div");
    const cardHost = h("div", { className: "surface-card" });

    function drawQuiz() {
      const qs =
        scenarioId === "student"
          ? act.questionsStudent || act.questions
          : act.questionsAdult || act.questions;
      const idx = Math.min(aState.qIdx || 0, qs.length - 1);
      const qObj = qs[idx];
      const picked = typeof aState.picked[idx] === "number" ? aState.picked[idx] : null;
      const allAnswered = qs.every((_, i) => typeof aState.picked[i] === "number");
      const score = qs.reduce((acc, q, i) => acc + (aState.picked[i] === q.answer ? 1 : 0), 0);

      const shouldMaskScq = !!act.hideScqInSpineBeforeQ1 && typeof aState.picked[0] !== "number";
      spineWrap.replaceChildren(renderSpineStrip(act.spineActive, shouldMaskScq));

      if (allAnswered && !tProg.doneSteps[stepNum]) {
        tProg.doneSteps[stepNum] = true;
        saveState();
        updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: stepNum });
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
            h("strong", null, isOk ? "✓ Chính xác! " : "✕ Điểm mấu chốt của S – C – Q: "),
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
              `Làm lại ${qs.length} câu`
            )
          )
        );
      }

      cardHost.replaceChildren(...children);

      const isLastQ = idx === qs.length - 1;
      configureDock({
        prevLabel: idx > 0 ? `← Câu ${idx}/${qs.length}` : `← Trang ${stepNum - 1}: ${STEPS_META[stepNum - 2].short}`,
        onPrev: () => {
          if (idx > 0) {
            aState.qIdx = idx - 1;
            saveState();
            drawQuiz();
          } else {
            goTo(scenarioId, stepNum - 1);
          }
        },
        statusText:
          picked === null
            ? `Chọn 1 đáp án cho câu ${idx + 1}/${qs.length}`
            : allAnswered
            ? `Đã hoàn thành ${score}/${qs.length} câu S – C – Q`
            : `Đã trả lời câu ${idx + 1}/${qs.length}`,
        nextLabel:
          picked !== null && !isLastQ
            ? `Sang câu ${idx + 2}/${qs.length} →`
            : allAnswered
            ? `Đạt ${score}/${qs.length} · Sang ${STEPS_META[stepNum].short} →`
            : `Bỏ qua sang ${STEPS_META[stepNum].short} →`,
        onNext: () => {
          if (picked !== null && !isLastQ) {
            aState.qIdx = idx + 1;
            saveState();
            drawQuiz();
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            goTo(scenarioId, stepNum + 1);
          }
        },
        nextSuccess: picked !== null,
        pulse: picked !== null
      });
    }

    container.append(
      spineWrap,
      h(
        "header",
        { className: "step-header" },
        h("p", { className: "step-eyebrow" }, `TRANG ${stepNum} / ${TOTAL_STEPS} · ${act.phase}`),
        h("h1", { className: "step-title", tabindex: "-1" }, act.title),
        h("p", { className: "step-lead" }, act.lead)
      ),
      cardHost
    );

    drawQuiz();
  }

  // Helper: Snapshot of learner's real-world S-C-Q prompt & Gemini answer from Step 5
  function buildAssembledPrompt(values, hasDoc) {
    const sVal = (values[0] || "").trim();
    const cVal = (values[1] || "").trim();
    const qVal = (values[2] || "").trim().replace(/\?+$/, "");
    if (!sVal && !cVal && !qVal) return "";
    const tail = hasDoc ? PROMPT_TAIL_DOC : PROMPT_TAIL_GENERAL;
    return `Mình đang ${sVal || "[S · Hoàn cảnh]"}, nhưng ${cVal || "[C · Cái khó]"}. Mình cần biết: ${qVal || "[Q · Câu hỏi]"}? ${tail}`;
  }

  function getRealWorkSnapshot(tProg) {
    const rw = tProg.acts["act-real"] || {};
    const vals = Array.isArray(rw.values) ? rw.values : ["", "", ""];
    const assembled = buildAssembledPrompt(vals, !!rw.hasDoc);
    const finalPrompt = (rw.promptEdited ? rw.customPrompt || "" : assembled).trim();
    const aiAnswer = (rw.aiAnswer || "").trim();
    return { vals, hasDoc: !!rw.hasDoc, finalPrompt, aiAnswer };
  }

  // ==================== ACTIVITY KIND: REAL (STEP 5: REAL-WORLD S-C-Q + PROMPT + GEMINI ANSWER) ====================
  function renderActivityReal(container, scenarioId, tProg, act, stepNum) {
    if (
      !tProg.acts[act.id] ||
      !Array.isArray(tProg.acts[act.id].values) ||
      tProg.acts[act.id].values.length !== act.fields.length
    ) {
      tProg.acts[act.id] = {
        values: act.fields.map(() => ""),
        hasDoc: false,
        promptEdited: false,
        customPrompt: "",
        aiAnswer: "",
        showIdeas: false
      };
    }
    const aState = tProg.acts[act.id];
    const isStudent = scenarioId === "student";
    const fields = act.fields;
    const ideas = isStudent ? act.topicIdeasStudent || [] : act.topicIdeasAdult || [];

    function currentPromptText() {
      if (aState.promptEdited) return aState.customPrompt || "";
      return buildAssembledPrompt(aState.values, !!aState.hasDoc);
    }

    function isComplete() {
      return currentPromptText().trim().length > 0 && (aState.aiAnswer || "").trim().length > 0;
    }

    const ideasDrawer = h(
      "div",
      { className: "ideas-drawer", hidden: !aState.showIdeas },
      h("span", { className: "ideas-drawer-lbl" }, "Gợi ý vài chủ đề gần gũi bạn có thể đem ra hỏi ngay:"),
      h(
        "div",
        { className: "ideas-chip-row" },
        ...ideas.map(txt => h("span", { className: "idea-static-chip" }, txt))
      )
    );

    const ideasToggleBtn = h(
      "button",
      {
        type: "button",
        className: "icon-tool-btn",
        onClick: () => {
          aState.showIdeas = !aState.showIdeas;
          ideasDrawer.hidden = !aState.showIdeas;
          ideasToggleBtn.textContent = aState.showIdeas ? "Ẩn gợi ý chủ đề" : "Chưa nghĩ ra việc gì để hỏi?";
          saveState();
        }
      },
      aState.showIdeas ? "Ẩn gợi ý chủ đề" : "Chưa nghĩ ra việc gì để hỏi?"
    );

    const scqInputs = [];
    const promptTa = h("textarea", {
      id: "real-prompt-box",
      rows: 3,
      className: "clean-textarea prompt-compose-box",
      placeholder:
        "Câu lệnh sẽ tự ghép khi bạn gõ 3 ô S – C – Q ở trên (hoặc bạn có thể gõ / dán thẳng câu lệnh của mình vào đây)...",
      value: currentPromptText()
    });

    const resyncBtn = h(
      "button",
      {
        type: "button",
        className: "icon-tool-btn",
        hidden: !aState.promptEdited,
        onClick: () => {
          aState.promptEdited = false;
          aState.customPrompt = "";
          promptTa.value = currentPromptText();
          resyncBtn.hidden = true;
          saveState();
          syncStateAndDock();
        }
      },
      "↺ Ghép lại từ 3 ô S – C – Q"
    );

    promptTa.addEventListener("input", e => {
      aState.promptEdited = true;
      aState.customPrompt = e.target.value;
      resyncBtn.hidden = false;
      saveState();
      syncStateAndDock();
    });

    const docCheckbox = h("input", {
      type: "checkbox",
      checked: !!aState.hasDoc,
      onChange: e => {
        aState.hasDoc = e.target.checked;
        if (!aState.promptEdited) {
          promptTa.value = currentPromptText();
        }
        saveState();
        syncStateAndDock();
      }
    });

    const cTestBanner = h("div", { className: "c-test-banner", hidden: true }, act.cTestNote || "");
    const doneBanner = h("div", { className: "explain-box ok", hidden: !isComplete() }, act.doneNote || "");

    const openGeminiBtn = h(
      "button",
      {
        type: "button",
        className: "btn-tactile",
        onClick: () => {
          const pText = currentPromptText().trim();
          if (!pText) {
            showToast("Hãy ghi tình huống S – C – Q hoặc nhập câu lệnh trước khi sao chép nhé!");
            if (scqInputs[0]) scqInputs[0].focus();
            return;
          }
          copyText(pText);
          window.open("https://gemini.google.com/app", "_blank", "noopener");
        }
      },
      "Sao chép câu lệnh & Mở Gemini ↗"
    );

    const copyOnlyBtn = h(
      "button",
      {
        type: "button",
        className: "btn-secondary",
        onClick: () => {
          const pText = currentPromptText().trim();
          if (!pText) {
            showToast("Hãy ghi tình huống S – C – Q hoặc nhập câu lệnh trước nhé!");
            if (scqInputs[0]) scqInputs[0].focus();
            return;
          }
          copyText(pText);
        }
      },
      "Chỉ sao chép câu lệnh"
    );

    const answerTa = h("textarea", {
      id: "real-gemini-answer",
      rows: 4,
      className: "clean-textarea",
      placeholder: act.answerPlaceholder || "Dán đoạn trả lời tâm đắc nhất của Gemini vào đây...",
      value: aState.aiAnswer || "",
      onInput: e => {
        aState.aiAnswer = e.target.value;
        saveState();
        syncStateAndDock();
      }
    });

    function syncStateAndDock() {
      const hasC = (aState.values[1] || "").trim().length > 0;
      cTestBanner.hidden = !hasC;

      const ready = isComplete();
      doneBanner.hidden = !ready;

      if (ready && !tProg.doneSteps[stepNum]) {
        tProg.doneSteps[stepNum] = true;
        saveState();
        updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: stepNum });
      } else if (!ready && tProg.doneSteps[stepNum]) {
        delete tProg.doneSteps[stepNum];
        saveState();
        updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: stepNum });
      }

      const hasPrompt = currentPromptText().trim().length > 0;
      configureDock({
        prevLabel: `← Trang ${stepNum - 1}: ${STEPS_META[stepNum - 2].short}`,
        onPrev: () => goTo(scenarioId, stepNum - 1),
        statusText: ready
          ? "Đã lưu câu lệnh & câu trả lời tâm đắc!"
          : hasPrompt
          ? "Sao chép qua hỏi Gemini rồi dán đoạn trả lời tâm đắc vào mục 3"
          : "Ghi việc thật bạn đang vướng vào S – C – Q bên trên",
        nextLabel: `Tiếp tục sang ${STEPS_META[stepNum].short} →`,
        onNext: () => goTo(scenarioId, stepNum + 1),
        nextSuccess: ready,
        pulse: ready
      });
    }

    const fieldNodes = fields.map((f, idx) => {
      const ph = isStudent ? f.placeholderStudent : f.placeholderAdult;
      const id = `real-scq-${f.slot}`;
      const inp = h("input", {
        id,
        type: "text",
        className: "clean-input real-scq-input",
        placeholder: ph,
        value: aState.values[idx] || "",
        onInput: e => {
          aState.values[idx] = e.target.value;
          if (!aState.promptEdited) {
            promptTa.value = currentPromptText();
          }
          saveState();
          syncStateAndDock();
        }
      });
      scqInputs.push(inp);

      return h(
        "div",
        { className: `causal-field field-${f.color} compact-scq-field` },
        h(
          "label",
          { for: id, className: "causal-label" },
          h("span", { className: `scq-letter-chip chip-${f.color}` }, f.slot),
          h("span", { className: "faded-meaning revealed" }, `${f.en} · ${f.vi.toUpperCase()} (${f.signal})`)
        ),
        inp
      );
    });

    const clearAllBtn = h(
      "button",
      {
        type: "button",
        className: "icon-tool-btn",
        onClick: () => {
          if ((currentPromptText().trim() || (aState.aiAnswer || "").trim()) && !window.confirm("Xóa trắng phần thực hành này để viết lại việc khác?")) {
            return;
          }
          aState.values = fields.map(() => "");
          aState.hasDoc = false;
          aState.promptEdited = false;
          aState.customPrompt = "";
          aState.aiAnswer = "";
          scqInputs.forEach(inp => {
            inp.value = "";
          });
          docCheckbox.checked = false;
          promptTa.value = "";
          answerTa.value = "";
          resyncBtn.hidden = true;
          saveState();
          syncStateAndDock();
        }
      },
      "Xóa trắng"
    );

    const card = h(
      "div",
      { className: "surface-card real-practice-card" },
      // Block 1: Think first with S - C - Q
      h(
        "div",
        { className: "real-block" },
        h(
          "div",
          { className: "real-block-head" },
          h("span", { className: "real-block-title" }, "1. Ghi tình huống thật của bạn theo S – C – Q"),
          h("div", { style: "display:flex;gap:0.45rem;flex-wrap:wrap" }, ideasToggleBtn, clearAllBtn)
        ),
        ideasDrawer,
        h("div", { className: "causal-grid compact-grid" }, ...fieldNodes),
        cTestBanner
      ),
      // Block 2: Prompt (auto-built & editable/pasteable)
      h(
        "div",
        { className: "real-block" },
        h(
          "div",
          { className: "real-block-head" },
          h("label", { for: "real-prompt-box", className: "real-block-title" }, "2. Câu lệnh (Prompt) bạn gửi cho Gemini"),
          h(
            "div",
            { style: "display:flex;align-items:center;gap:0.6rem;flex-wrap:wrap" },
            resyncBtn,
            h(
              "label",
              { className: "doc-toggle-lbl" },
              docCheckbox,
              h("span", null, "Mình có gửi kèm tài liệu")
            )
          )
        ),
        promptTa,
        h("div", { className: "real-prompt-actions" }, openGeminiBtn, copyOnlyBtn)
      ),
      // Block 3: Paste favorite Gemini answer
      h(
        "div",
        { className: "real-block" },
        h(
          "div",
          { className: "real-block-head" },
          h("label", { for: "real-gemini-answer", className: "real-block-title" }, "3. Dán đoạn trả lời tâm đắc nhất của Gemini")
        ),
        answerTa,
        act.step3Reminder && h("p", { className: "real-step3-note" }, act.step3Reminder),
        doneBanner
      )
    );

    container.append(
      renderSpineStrip(act.spineActive),
      h(
        "header",
        { className: "step-header" },
        h("p", { className: "step-eyebrow" }, `TRANG ${stepNum} / ${TOTAL_STEPS} · ${act.phase}`),
        h("h1", { className: "step-title", tabindex: "-1" }, act.title),
        h("p", { className: "step-lead" }, act.lead)
      ),
      card
    );

    syncStateAndDock();
  }

  // ==================== STEP 7: SUMMARY (NO MEMORY QUIZ — SHOWCASE REAL WORK + PDF REF) ====================
  function renderStep7Summary(container, scenarioId, tProg) {
    tProg.doneSteps[7] = true;
    saveState();
    updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: 7 });

    const exSteps = [3, 4, 5];
    const doneEx = exSteps.filter(n => !!tProg.doneSteps[n]);
    const missingEx = exSteps.filter(n => !tProg.doneSteps[n]);
    const otherId = scenarioId === "adult" ? "student" : "adult";
    const otherSc = DATA.scenarios[otherId];
    const snap = getRealWorkSnapshot(tProg);
    const hasRealWork = snap.finalPrompt.length > 0 || snap.aiAnswer.length > 0;

    const realWorkBox = hasRealWork
      ? h(
          "div",
          { className: "live-synthesis-card" },
          h("p", { className: "synthesis-kicker" }, "Sản phẩm thật của bạn trong Bài 01"),
          snap.finalPrompt &&
            h(
              "div",
              { style: "margin-bottom:0.8rem" },
              h("p", { className: "saved-sub-lbl" }, "Câu lệnh (Prompt) của bạn:"),
              h("p", { className: "synthesis-body", style: "white-space:pre-wrap" }, snap.finalPrompt)
            ),
          snap.aiAnswer &&
            h(
              "div",
              null,
              h("p", { className: "saved-sub-lbl" }, "Đoạn trả lời tâm đắc từ Gemini:"),
              h("p", { className: "saved-answer-body" }, snap.aiAnswer)
            ),
          h(
            "div",
            { style: "margin-top:0.9rem;display:flex;gap:0.55rem;flex-wrap:wrap" },
            h(
              "button",
              {
                type: "button",
                className: "btn-tactile",
                onClick: () => {
                  const bundle = [
                    snap.finalPrompt ? `CÂU LỆNH CỦA TÔI:\n${snap.finalPrompt}` : "",
                    snap.aiAnswer ? `ĐOẠN TRẢ LỜI TÂM ĐẮC:\n${snap.aiAnswer}` : ""
                  ]
                    .filter(Boolean)
                    .join("\n\n");
                  copyText(bundle);
                }
              },
              "Sao chép câu lệnh & câu trả lời"
            ),
            h(
              "button",
              {
                type: "button",
                className: "btn-secondary",
                onClick: () => goTo(scenarioId, 5)
              },
              "Chỉnh sửa ở Trang 5"
            )
          )
        )
      : h(
          "div",
          { className: "live-synthesis-card" },
          h("p", { className: "synthesis-kicker" }, "Công thức bỏ túi mang theo ra đời thật: S (Hoàn cảnh) · C (Cái khó) · Q (Câu hỏi)"),
          h(
            "p",
            { className: "synthesis-body" },
            `“Mình đang [S · Hoàn cảnh], nhưng [C · Cái khó]. Mình cần biết: [Q · Câu hỏi]? ${PROMPT_TAIL_GENERAL}”`
          ),
          h(
            "div",
            { style: "margin-top:0.85rem" },
            h(
              "button",
              {
                type: "button",
                className: "btn-secondary",
                onClick: () => goTo(scenarioId, 5)
              },
              "Quay lại Trang 5 thử trên việc thật của bạn →"
            )
          )
        );

    const summaryCard = h(
      "section",
      { className: "summary-hero-card" },
      h("span", { className: "completion-badge" }, `✓ ĐÃ HOÀN TẤT ${doneEx.length}/3 BÀI THỰC HÀNH`),
      h("h1", { className: "step-title", tabindex: "-1" }, "Tổng kết Bài 01 · Nghĩ trước khi hỏi AI"),
      h(
        "p",
        { className: "step-lead" },
        "Mình nghĩ trước bằng S – C – Q, giao AI làm cùng để mở rộng góc nhìn, rồi đối chiếu thực tế & tự chốt quyết định cuối!"
      ),
      renderSpineStrip([0, 1, 2]),
      missingEx.length > 0 &&
        h(
          "div",
          { className: "explain-box", style: "margin-top:1rem" },
          "Bạn còn ",
          h("strong", null, `${missingEx.length} phần thực hành chưa hoàn tất`),
          ". Bấm quay lại bất cứ lúc nào: ",
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
      realWorkBox
    );

    const sortedPDFs = [...DATA.caseFiles].sort((a, b) =>
      a.forScenario === scenarioId ? -1 : b.forScenario === scenarioId ? 1 : 0
    );

    const pdfSection = h(
      "section",
      { className: "surface-card" },
      h("h2", { className: "transcript-title", style: "font-size:1.1rem" }, "Hồ sơ PDF 12 trang trong video (Tham khảo thêm)"),
      h("p", { className: "causal-hint", style: "margin-top:0.25rem" }, "Nếu muốn tự tay thử lại đúng 2 tình huống trong video bài học, bạn có thể tải / mở trực tiếp 2 tệp PDF 12 trang dưới đây:"),
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
                h("summary", null, "Xem tóm tắt các điểm bẫy ngầm trong tài liệu"),
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
      prevLabel: "← Trang 6: Về nhà · 4F",
      onPrev: () => goTo(scenarioId, 6),
      statusText: "Bạn cũng có thể xem thêm hành trình còn lại",
      nextLabel: `Xem thêm ${otherSc.badge} →`,
      onNext: () => goTo(otherId, 1)
    });
  }

  // ==================== STEP 6: HOMEWORK 4F (SINGLE SHEET WITH PINNED REAL PROMPT) ====================
  function renderStep6Homework4F(container, scenarioId, tProg) {
    const hw = DATA.homework4F;
    if (!hw) return;

    if (!tProg.fourF || typeof tProg.fourF !== "object") {
      tProg.fourF = { facts: "", feelings: "", findings: "", future: "" };
    }
    const bag = tProg.fourF;
    const isStudent = scenarioId === "student";
    const taskText = isStudent ? hw.taskStudent : hw.taskAdult;
    const snap = getRealWorkSnapshot(tProg);

    function hasAnyText() {
      return hw.zones.some(z => (bag[z.key] || "").trim().length > 0);
    }

    function autoFit(ta, minRows) {
      ta.rows = minRows;
      ta.style.height = "auto";
      ta.style.height = ta.scrollHeight + "px";
    }

    function compileNote() {
      const header = snap.finalPrompt ? `Câu lệnh thực tế đã hỏi:\n${snap.finalPrompt}\n\n` : "";
      return (
        header +
        hw.zones
          .map(z => `${z.title}:\n${(bag[z.key] || "").trim() || "- (Chưa ghi)"}`)
          .join("\n\n")
      );
    }

    function syncDoneAndDock() {
      const any = hasAnyText();
      if (any && !tProg.doneSteps[6]) {
        tProg.doneSteps[6] = true;
        saveState();
        updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: 6 });
      }
      configureDock({
        prevLabel: "← Trang 5: Làm việc thật",
        onPrev: () => goTo(scenarioId, 5),
        statusText: any
          ? "Đã lưu bài suy ngẫm 4F vào trình duyệt!"
          : "Ngẫm lại lần làm thật vừa rồi & ghi nhanh 4F tại đây",
        nextLabel: "Hoàn thành & Xem Tổng kết →",
        onNext: () => {
          tProg.doneSteps[7] = true;
          saveState();
          goTo(scenarioId, 7);
        },
        nextSuccess: any,
        pulse: any
      });
    }

    const wrap = h("div", { className: "hw-4f-wrap" });

    const pinnedCard =
      snap.finalPrompt.length > 0 &&
      h(
        "div",
        { className: "pinned-real-prompt" },
        h("span", { className: "pinned-real-lbl" }, "Câu lệnh việc thật bạn vừa làm ở Trang 5:"),
        h("p", { className: "pinned-real-text" }, `“${snap.finalPrompt}”`),
        snap.aiAnswer.length > 0 &&
          h(
            "details",
            { className: "trap-spoiler", style: "margin-top:0.4rem" },
            h("summary", null, "Xem lại đoạn trả lời tâm đắc bạn đã lưu"),
            h("p", { style: "margin:0.45rem 0 0;font-size:0.86rem;color:var(--ink-secondary);white-space:pre-wrap" }, snap.aiAnswer)
          )
      );

    function drawSheet(focusIdx = null) {
      const any = hasAnyText();
      const saveLbl = h(
        "span",
        { className: `save-status ${any ? "saved" : ""}` },
        any
          ? "Đã tự lưu trên máy này ✓"
          : "Chữ mờ chỉ là ví dụ chuyện rán trứng — cứ đặt chuột gõ đè lên"
      );

      const inputs = [];
      const zoneNodes = hw.zones.map((z, idx) => {
        const typed = (bag[z.key] || "").trim().length > 0;
        const ta = h("textarea", {
          className: "f-zone-input",
          rows: z.rows,
          placeholder: z.ghost,
          value: bag[z.key] || "",
          "aria-label": `${z.title} — ${z.cue}`,
          onInput: e => {
            const wasEmpty = !hasAnyText();
            bag[z.key] = e.target.value;
            saveState();
            autoFit(ta, z.rows);
            const nowAny = hasAnyText();
            if (wasEmpty !== nowAny) {
              syncDoneAndDock();
              drawSheet(idx);
            } else {
              saveLbl.textContent = nowAny
                ? "Đã tự lưu trên máy này ✓"
                : "Chữ mờ chỉ là ví dụ chuyện rán trứng — cứ đặt chuột gõ đè lên";
              saveLbl.classList.toggle("saved", nowAny);
            }
          }
        });
        inputs.push({ ta, rows: z.rows });

        return h(
          "div",
          { className: "f-zone" },
          h(
            "div",
            { className: "f-zone-head" },
            h("span", { className: "f-zone-title" }, z.title),
            h("span", { className: "f-zone-cue" }, `· ${z.cue}`)
          ),
          typed &&
            tProg.peekFourFExample &&
            h("div", { className: "peek-example-bar" }, z.ghost.replace(/\n/g, " ")),
          ta
        );
      });

      wrap.replaceChildren(
        ...[
          h(
            "div",
            { className: "hw-task-line" },
            h("strong", null, "🏠 Bài tập về nhà · 4F: "),
            taskText
          ),
          pinnedCard,
          h(
            "section",
            { className: "notebook-sheet" },
            h(
              "div",
              { className: "sheet-top" },
              h("p", { className: "sheet-note" }, "✍️ ", h("strong", null, hw.leadNote)),
              h(
                "div",
                { style: "display:flex;gap:0.4rem" },
                any &&
                  h(
                    "button",
                    {
                      type: "button",
                      className: "icon-tool-btn",
                      onClick: () => {
                        tProg.peekFourFExample = !tProg.peekFourFExample;
                        saveState();
                        drawSheet();
                      }
                    },
                    tProg.peekFourFExample ? "Ẩn ví dụ nhắc" : "👁️ Xem lại ví dụ"
                  ),
                h(
                  "button",
                  {
                    type: "button",
                    className: "icon-tool-btn",
                    onClick: () => {
                      if (
                        hasAnyText() &&
                        !window.confirm("Xóa nội dung đang gõ để hiện lại chữ ví dụ mờ ban đầu?")
                      ) {
                        return;
                      }
                      tProg.fourF = { facts: "", feelings: "", findings: "", future: "" };
                      Object.assign(bag, tProg.fourF);
                      tProg.peekFourFExample = false;
                      delete tProg.doneSteps[6];
                      saveState();
                      updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: 6 });
                      syncDoneAndDock();
                      drawSheet();
                    }
                  },
                  "Xóa trắng"
                )
              )
            ),
            h("div", null, ...zoneNodes),
            h(
              "div",
              { className: "sheet-footer" },
              saveLbl,
              h(
                "button",
                {
                  type: "button",
                  className: "btn-tactile",
                  style: "padding:0.48rem 0.95rem;font-size:0.86rem",
                  onClick: () => {
                    if (!hasAnyText()) {
                      showToast("Hãy gõ vài dòng vào các mục trước khi sao chép nhé!");
                      if (inputs[0]) inputs[0].ta.focus();
                      return;
                    }
                    copyText(compileNote());
                  }
                },
                "📋 Sao chép bài 4F để nộp"
              )
            )
          )
        ].filter(Boolean)
      );

      requestAnimationFrame(() => {
        inputs.forEach(({ ta, rows }) => autoFit(ta, rows));
        if (focusIdx !== null && inputs[focusIdx]) {
          const fTa = inputs[focusIdx].ta;
          fTa.focus();
          fTa.setSelectionRange(fTa.value.length, fTa.value.length);
        }
      });
    }

    container.append(wrap);
    syncDoneAndDock();
    drawSheet();
  }

  // ==================== MAIN RENDER DISPATCH ====================
  function renderActivityByStep(container, scenarioId, tProg, stepNum) {
    const act = DATA.activities[stepNum - 3];
    if (!act) return;
    if (act.kind === "sort") renderActivitySort(container, scenarioId, tProg, act, stepNum);
    else if (act.kind === "quiz") renderActivityQuiz(container, scenarioId, tProg, act, stepNum);
    else if (act.kind === "real") renderActivityReal(container, scenarioId, tProg, act, stepNum);
  }

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
      else if (route.step >= 3 && route.step <= 5) renderActivityByStep(screenWrap, route.scenario, tProg, route.step);
      else if (route.step === 6) renderStep6Homework4F(screenWrap, route.scenario, tProg);
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
      const blob = new Blob([JSON.stringify({ version: 4, exportedAt: new Date().toISOString(), state }, null, 2)], {
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
