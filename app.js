(() => {
  "use strict";

  const DATA = window.LESSON_01_DATA;
  if (!DATA) return;

  const STORAGE_KEY = "bai01-pageturn-state-v4";
  const PALETTE_KEY = "bai01-palette";
  const PROMPT_TAIL =
    DATA.promptTail ||
    "Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.";

  const STEPS_META = [
    { num: 1, short: "Tình huống", label: "Clip Thực chiến trên Gemini thật" },
    { num: 2, short: "Quy luật 4D", label: "Clip Quy luật Tư duy 4D" },
    { num: 3, short: "Bài tập 1", label: "Phân vai đúng theo Quy luật 4D" },
    { num: 4, short: "Bài tập 2", label: "Phân biệt & Bắt bệnh S – C – Q" },
    { num: 5, short: "Bài tập 3", label: "Tự nhớ & Ghép lệnh S – C – Q" },
    { num: 6, short: "Bài tập 4", label: "Mở trang gốc & Tự chốt chữ A" },
    { num: 7, short: "Tổng kết", label: "Ôn nhanh S–C–Q & Hồ sơ PDF" }
  ];

  const defaultTrackProgress = () => ({
    lastStep: 1,
    visited: {},
    doneSteps: {},
    transcriptOpen: { scenario: false, fourD: false },
    recallChecked: false,
    recallVals: ["", "", ""],
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

  // ==================== 2-PILLAR SPINE STRIP & 3-COLOR SCQ LEGEND ====================
  function renderSpineStrip(activeIndices = []) {
    const pillars = DATA.spinePillars || [];
    if (!pillars.length) return null;
    return h(
      "div",
      { className: "spine-strip", "aria-label": "Trục kết nối Quy luật 4D và Công thức S – C – Q" },
      ...pillars.map((p, idx) => {
        const isActive = activeIndices.includes(idx);
        return [
          idx > 0 && h("span", { className: "spine-arrow", "aria-hidden": "true" }, "→"),
          h(
            "div",
            { className: `spine-node ${isActive ? "active" : ""}` },
            h("span", { className: "spine-step" }, p.step),
            h("span", { className: "spine-sub" }, p.sub)
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
            doneCount > 0 && h("span", { className: "journey-resume-pill" }, `Đã qua ${doneCount}/7`)
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
          h("span", { className: "welcome-kicker" }, "BÀI 01 · TƯ DUY 4D × S (HOÀN CẢNH) · C (CÁI KHÓ) · Q (CÂU HỎI)"),
          h("h1", { className: "welcome-title" }, "Tóm tắt tài liệu dài cùng Gemini"),
          h(
            "p",
            { className: "welcome-sub" },
            "Hỏi “Tóm tắt” chỉ biết tài liệu viết gì — nghĩ trước bằng ",
            h("span", { className: "marker-sweep" }, "S (Hoàn cảnh) · C (Cái khó) · Q (Câu hỏi)"),
            " mới biết bạn mất gì, dùng được gì!"
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
                h("strong", null, isOk ? "✓ Chuẩn vai: " : `✕ Đúng ra thuộc “${cols[c.col]}”: `),
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
            h("strong", null, `Kết quả: Đúng ${correctCount}/${cards.length} hành động. `),
            correctCount === cards.length
              ? "Xuất sắc! Bạn đã gắn chặt Quy luật 4D với bộ khung S (Hoàn cảnh) · C (Cái khó) · Q (Câu hỏi) · A (Tự chốt)."
              : "Xem giải thích dưới từng thẻ hoặc bấm Chọn lại để xếp chuẩn cả 6 hành động."
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
              allPicked ? "Kiểm tra đáp án phân vai 4D" : `Chọn đủ vai cho ${cards.length} hành động để kiểm tra`
            )
          )
        );
      }

      cardHost.replaceChildren(...nodes);

      configureDock({
        prevLabel: `← Trang ${stepNum - 1}: ${STEPS_META[stepNum - 2].short}`,
        onPrev: () => goTo(scenarioId, stepNum - 1),
        statusText: aState.checked
          ? `Đã kiểm tra (${correctCount}/${cards.length} thẻ đúng)`
          : "Xếp mỗi hành động vào đúng nhịp trong Quy luật 4D",
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
        h("p", { className: "step-eyebrow" }, `TRANG ${stepNum} / 7 · ${act.phase}`),
        h("h1", { className: "step-title", tabindex: "-1" }, act.title),
        h("p", { className: "step-lead" }, act.lead)
      ),
      act.showScqLegend && renderScqLegend(),
      cardHost
    );

    drawSort();
  }

  // ==================== ACTIVITY KIND: QUIZ (S - C - Q DISCRIMINATION & DIAGNOSTICS) ====================
  function renderActivityQuiz(container, scenarioId, tProg, act, stepNum) {
    if (!tProg.acts[act.id]) tProg.acts[act.id] = { qIdx: 0, picked: [] };
    const aState = tProg.acts[act.id];

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
      renderSpineStrip(act.spineActive),
      h(
        "header",
        { className: "step-header" },
        h("p", { className: "step-eyebrow" }, `TRANG ${stepNum} / 7 · ${act.phase}`),
        h("h1", { className: "step-title", tabindex: "-1" }, act.title),
        h("p", { className: "step-lead" }, act.lead)
      ),
      act.showScqLegend && renderScqLegend(),
      cardHost
    );

    drawQuiz();
  }

  // ==================== ACTIVITY KIND: FILL (FADED SCAFFOLDING SCQ BUILDER) ====================
  function renderActivityFill(container, scenarioId, tProg, act, stepNum) {
    if (
      !tProg.acts[act.id] ||
      !Array.isArray(tProg.acts[act.id].values) ||
      tProg.acts[act.id].values.length !== act.fields.length
    ) {
      tProg.acts[act.id] = { values: act.fields.map(() => ""), revealed: {} };
    }
    if (!tProg.acts[act.id].revealed) tProg.acts[act.id].revealed = {};
    const aState = tProg.acts[act.id];
    const isStudent = scenarioId === "student";
    const fields = act.fields;
    const matchedCaseFile = DATA.caseFiles.find(cf => cf.forScenario === scenarioId) || DATA.caseFiles[0];
    const transferBrief = isStudent ? act.transferPromptStudent : act.transferPromptAdult;

    function isComplete() {
      return fields.every((_, i) => (aState.values[i] || "").trim().length > 0);
    }

    function buildPromptText() {
      const sVal = (aState.values[0] || "").trim() || "[S]";
      const cVal = (aState.values[1] || "").trim() || "[C]";
      const qVal = (aState.values[2] || "").trim().replace(/\?+$/, "") || "[Q]";
      return `Mình đang ${sVal}, nhưng ${cVal}. Mình cần biết: ${qVal}? ${PROMPT_TAIL}`;
    }

    const synBody = h("div", { className: "synthesis-body", style: "white-space:pre-line" });
    const cTestBanner = h("div", { className: "c-test-banner", hidden: true }, act.cTestNote || "");
    const selfCheckBanner = h("div", { className: "explain-box ok", hidden: !tProg.doneSteps[stepNum] }, act.revealNote);

    const copyBtn = h(
      "button",
      {
        type: "button",
        disabled: !isComplete(),
        className: "btn-tactile",
        style: "margin-top:0.95rem",
        onClick: () => copyText(buildPromptText())
      },
      "📋 Sao chép câu lệnh để dán vào Gemini"
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
      "Mở PDF mẫu 12 trang để thử ngay ↗"
    );

    function syncStatementAndDock() {
      const slotNode = (i, fallback, colorCls) => {
        const val = (aState.values[i] || "").trim();
        return h("span", { className: `syn-slot ${colorCls} ${val ? "filled" : "empty"}` }, val || fallback);
      };

      synBody.replaceChildren(
        "Mình đang ",
        slotNode(0, "[S · Hoàn cảnh]", "slot-blue"),
        ", nhưng ",
        slotNode(1, "[C · Cái khó]", "slot-amber"),
        ". Mình cần biết: ",
        slotNode(2, "[Q · Câu hỏi]", "slot-mint"),
        `? ${PROMPT_TAIL}`
      );

      const hasC = (aState.values[1] || "").trim().length > 0;
      cTestBanner.hidden = !hasC;

      const ready = isComplete();
      copyBtn.disabled = !ready;
      if (ready && !tProg.doneSteps[stepNum]) {
        tProg.doneSteps[stepNum] = true;
        selfCheckBanner.hidden = false;
        saveState();
        updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: stepNum });
      }

      configureDock({
        prevLabel: `← Trang ${stepNum - 1}: ${STEPS_META[stepNum - 2].short}`,
        onPrev: () => goTo(scenarioId, stepNum - 1),
        statusText: ready
          ? "Câu lệnh S – C – Q + Trang – Sót – Bàn đã sẵn sàng!"
          : "Tự nhớ nghĩa S – C – Q và điền đủ 3 ô bên trên",
        nextLabel: `Tiếp tục sang ${STEPS_META[stepNum].short} →`,
        onNext: () => goTo(scenarioId, stepNum + 1),
        nextSuccess: ready
      });
    }

    const textareas = [];
    const revealUpdaters = [];

    const fieldNodes = fields.map((f, idx) => {
      const hint = isStudent ? f.hintStudent : f.hintAdult;
      const sample = isStudent ? f.sampleStudent : f.sampleAdult;
      const id = `causal-slot-${f.slot}`;
      const labelMeaning = h("span", { className: "faded-meaning" });
      const hintLine = h("p", { className: "causal-hint" });
      const revealBtn = h("button", { type: "button", className: "icon-tool-btn recall-pill-btn" });

      const ta = h("textarea", {
        id,
        rows: 2,
        className: "clean-textarea",
        value: aState.values[idx] || "",
        onInput: e => {
          aState.values[idx] = e.target.value;
          saveState();
          syncStatementAndDock();
        }
      });
      textareas.push(ta);

      function syncFieldReveal() {
        const isRev = !!aState.revealed[f.slot];
        if (isRev) {
          labelMeaning.textContent = `${f.en} · ${f.vi.toUpperCase()} (${f.signal})`;
          labelMeaning.classList.add("revealed");
          hintLine.textContent = hint;
          ta.placeholder = `Điền (${f.slot} · ${f.vi}) — ví dụ: “${sample}”`;
          revealBtn.textContent = "Ẩn nhắc nghĩa";
        } else {
          labelMeaning.textContent = f.recallPrompt || "Nhẩm thử nghĩa chữ này trước khi bấm nhắc!";
          labelMeaning.classList.remove("revealed");
          hintLine.textContent = `Mở đầu bằng từ khóa của chữ ${f.slot} (bấm 💡 để xem ví dụ gợi ý)`;
          ta.placeholder = `Tự điền mảnh (${f.slot}) của bạn vào đây...`;
          revealBtn.textContent = `💡 Nhắc nghĩa chữ ${f.slot}`;
        }
      }

      revealBtn.onclick = () => {
        aState.revealed[f.slot] = !aState.revealed[f.slot];
        saveState();
        syncFieldReveal();
      };

      syncFieldReveal();
      revealUpdaters.push(syncFieldReveal);

      return h(
        "div",
        { className: `causal-field field-${f.color}` },
        h(
          "div",
          { className: "causal-head-row" },
          h(
            "label",
            { for: id, className: "causal-label" },
            h("span", { className: `scq-letter-chip chip-${f.color}` }, f.slot),
            labelMeaning
          ),
          revealBtn
        ),
        hintLine,
        ta
      );
    });

    const toolbar = h(
      "div",
      { className: "helper-toolbar" },
      h("span", null, `Đang thực hành: ${isStudent ? "Hành trình Học sinh" : "Hành trình Người lớn"}`),
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
                aState.revealed[f.slot] = true;
                textareas[idx].value = sample;
              });
              revealUpdaters.forEach(fn => fn());
              saveState();
              syncStatementAndDock();
              showToast("Đã mở nghĩa S – C – Q và điền thử tình huống mới!");
            }
          },
          "Điền thử tình huống mới"
        ),
        h(
          "button",
          {
            type: "button",
            className: "icon-tool-btn",
            onClick: () => {
              fields.forEach((f, idx) => {
                const vSample = isStudent ? f.videoStudent || f.sampleStudent : f.videoAdult || f.sampleAdult;
                aState.values[idx] = vSample;
                aState.revealed[f.slot] = true;
                textareas[idx].value = vSample;
              });
              revealUpdaters.forEach(fn => fn());
              saveState();
              syncStatementAndDock();
              showToast("Đã điền nguyên văn câu lệnh S – C – Q trong video thực chiến!");
            }
          },
          "Xem câu mẫu trong video"
        ),
        h(
          "button",
          {
            type: "button",
            className: "icon-tool-btn",
            onClick: () => {
              fields.forEach((f, idx) => {
                aState.values[idx] = "";
                aState.revealed[f.slot] = false;
                textareas[idx].value = "";
              });
              revealUpdaters.forEach(fn => fn());
              saveState();
              syncStatementAndDock();
            }
          },
          "Ẩn gợi ý & Xóa trống"
        )
      )
    );

    const card = h(
      "div",
      { className: "surface-card" },
      transferBrief && h("div", { className: "scenario-brief-box" }, transferBrief),
      toolbar,
      h("div", { className: "causal-grid" }, ...fieldNodes),
      cTestBanner,
      h(
        "div",
        { className: "live-synthesis-card" },
        h("p", { className: "synthesis-kicker" }, "Câu lệnh bỏ túi hoàn chỉnh: S (Hoàn cảnh) · C (Cái khó) · Q (Câu hỏi) + Trang – Sót – Bàn"),
        synBody,
        h("div", { style: "display:flex;gap:0.65rem;flex-wrap:wrap" }, copyBtn, samplePdfLink)
      ),
      selfCheckBanner
    );

    container.append(
      renderSpineStrip(act.spineActive),
      h(
        "header",
        { className: "step-header" },
        h("p", { className: "step-eyebrow" }, `TRANG ${stepNum} / 7 · ${act.phase}`),
        h("h1", { className: "step-title", tabindex: "-1" }, act.title),
        h("p", { className: "step-lead" }, act.lead)
      ),
      card
    );

    syncStatementAndDock();
  }

  // ==================== ACTIVITY KIND: WRITE (VERIFY SOURCE PAGE & UNLOCK "A - ANSWER") ====================
  function renderActivityWrite(container, scenarioId, tProg, act, stepNum) {
    if (!tProg.acts[act.id]) tProg.acts[act.id] = { values: ["", ""], checks: {} };
    const aState = tProg.acts[act.id];
    const isStudent = scenarioId === "student";
    const vCase = isStudent ? act.verifyCaseStudent : act.verifyCaseAdult;
    const matchedCaseFile = DATA.caseFiles.find(cf => cf.forScenario === scenarioId) || DATA.caseFiles[0];

    const spineHost = h("div");
    const unlockBanner = h("div", { className: "explain-box ok", hidden: true }, act.unlockAnswerNote || "");

    function checkReady() {
      const hasAllText = act.fields.every((_, i) => (aState.values[i] || "").trim().length > 0);
      const checkedCount = act.checklist.filter((_, i) => !!aState.checks[i]).length;
      return hasAllText && checkedCount >= 2;
    }

    function updateStatus() {
      const hasAnswerText = (aState.values[1] || "").trim().length > 0;
      unlockBanner.hidden = !hasAnswerText;
      const rdy = checkReady();
      spineHost.replaceChildren(renderSpineStrip(hasAnswerText || rdy ? [0, 1, 2] : act.spineActive));

      if (rdy && !tProg.doneSteps[stepNum]) {
        tProg.doneSteps[stepNum] = true;
        saveState();
        updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: stepNum });
      }
      configureDock({
        prevLabel: `← Trang ${stepNum - 1}: ${STEPS_META[stepNum - 2].short}`,
        onPrev: () => goTo(scenarioId, stepNum - 1),
        statusText: rdy
          ? "Đã mở khóa trọn bộ S – C – Q – A & Quy luật 4D!"
          : "Điền kết quả kiểm trang gốc, tự chốt chữ A & tick cam kết",
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

    const writeTas = [];
    const checkInputs = [];

    const verifyCard =
      vCase &&
      h(
        "div",
        { className: "verify-draft-card" },
        h(
          "div",
          { className: "verify-draft-top" },
          h("span", { className: "verify-badge" }, vCase.badge),
          h(
            "div",
            { style: "display:flex;gap:0.45rem;flex-wrap:wrap" },
            h(
              "a",
              {
                href: matchedCaseFile.fileHref,
                target: "_blank",
                rel: "noopener",
                className: "icon-tool-btn"
              },
              "Mở PDF 12 trang đối chiếu ↗"
            ),
            h(
              "button",
              {
                type: "button",
                className: "icon-tool-btn",
                onClick: () => {
                  aState.values[0] = vCase.sampleVerify;
                  aState.values[1] = vCase.sampleDecision;
                  if (writeTas[0]) writeTas[0].value = vCase.sampleVerify;
                  if (writeTas[1]) writeTas[1].value = vCase.sampleDecision;
                  act.checklist.forEach((_, idx) => {
                    aState.checks[idx] = true;
                    if (checkInputs[idx]) checkInputs[idx].checked = true;
                  });
                  saveState();
                  updateStatus();
                  showToast("Đã điền mẫu thẩm định trang gốc & mở khóa chữ A (Answer)!");
                }
              },
              "Xem mẫu đối chiếu chuẩn"
            )
          )
        ),
        h("p", { className: "verify-quote" }, vCase.aiDraft),
        h("p", { className: "verify-hint" }, vCase.checkHint)
      );

    const fieldNodes = act.fields.map((f, idx) => {
      const id = `real-write-${idx}`;
      const ph = isStudent ? f.placeholderStudent || f.placeholder : f.placeholderAdult || f.placeholder;
      const ta = h("textarea", {
        id,
        rows: 3,
        className: "clean-textarea",
        placeholder: ph,
        value: aState.values[idx] || "",
        onInput: e => {
          aState.values[idx] = e.target.value;
          saveState();
          updateStatus();
        }
      });
      writeTas.push(ta);
      return h(
        "div",
        { className: "causal-field" },
        h("label", { for: id, className: "causal-label" }, f.label),
        ta
      );
    });

    const checklistEl = h(
      "fieldset",
      { className: "rubric-box" },
      h("legend", { style: "font-weight:700;font-size:0.9rem;padding:0 0.35rem" }, "Bảng tự kiểm 4D × S – C – Q – A trước khi chốt"),
      ...act.checklist.map((item, i) => {
        const inp = h("input", {
          type: "checkbox",
          checked: !!aState.checks[i],
          onChange: e => {
            aState.checks[i] = e.target.checked;
            saveState();
            updateStatus();
          }
        });
        checkInputs.push(inp);
        return h("label", { className: "rubric-item" }, inp, h("span", null, item));
      })
    );

    container.append(
      spineHost,
      h(
        "header",
        { className: "step-header" },
        h("p", { className: "step-eyebrow" }, `TRANG ${stepNum} / 7 · ${act.phase}`),
        h("h1", { className: "step-title", tabindex: "-1" }, act.title),
        h("p", { className: "step-lead" }, act.lead)
      ),
      h(
        "div",
        { className: "surface-card" },
        verifyCard,
        h("div", { className: "causal-grid" }, ...fieldNodes),
        unlockBanner,
        checklistEl
      )
    );

    updateStatus();
  }

  // ==================== STEP 7: SUMMARY + 3-SLOT ACTIVE RECALL + PDF CASE FILES ====================
  function renderStep7Summary(container, scenarioId, tProg) {
    tProg.doneSteps[7] = true;
    if (!Array.isArray(tProg.recallVals)) tProg.recallVals = ["", "", ""];
    saveState();
    updateHeaderAndDock({ screen: "step", scenario: scenarioId, step: 7 });

    const exSteps = [3, 4, 5, 6];
    const doneEx = exSteps.filter(n => !!tProg.doneSteps[n]);
    const missingEx = exSteps.filter(n => !tProg.doneSteps[n]);
    const otherId = scenarioId === "adult" ? "student" : "adult";
    const otherSc = DATA.scenarios[otherId];

    const fillVals = tProg.acts["act-fill"]?.values || [];
    const hasFill = fillVals.some(v => (v || "").trim().length > 0);

    // Non-blocking 3-Slot Active Recall Card (Zero hints first!)
    const recallHost = h("section", { className: "surface-card" });
    const normVi = s =>
      (s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .trim();

    function drawRecallCard() {
      const rVals = tProg.recallVals;
      const okS = /hoan canh|tinh huong|situation/.test(normVi(rVals[0]));
      const okC = /cai kho|kho khan|complication/.test(normVi(rVals[1]));
      const okQ = /cau hoi|question/.test(normVi(rVals[2]));
      const allOk = okS && okC && okQ;

      const inputs = [
        { code: "S", color: "blue", ok: okS, ph: "Gõ nghĩa tiếng Việt của S..." },
        { code: "C", color: "amber", ok: okC, ph: "Gõ nghĩa tiếng Việt của C..." },
        { code: "Q", color: "mint", ok: okQ, ph: "Gõ nghĩa tiếng Việt của Q..." }
      ].map((item, idx) =>
        h(
          "div",
          { className: `recall-slot-box ${tProg.recallChecked ? (item.ok ? "ok" : "show-ans") : ""}` },
          h(
            "label",
            { className: "recall-slot-lbl" },
            h("span", { className: `scq-letter-chip chip-${item.color}` }, item.code),
            h("span", null, `Chữ ${item.code} nghĩa là gì?`)
          ),
          h("input", {
            type: "text",
            className: "clean-input",
            placeholder: item.ph,
            value: rVals[idx] || "",
            onInput: e => {
              tProg.recallVals[idx] = e.target.value;
              saveState();
            }
          })
        )
      );

      const extraNodes = tProg.recallChecked
        ? [
            h(
              "div",
              { className: `explain-box ${allOk ? "ok" : ""}`, style: "margin-top:0.9rem" },
              h(
                "strong",
                null,
                allOk
                  ? "✓ Thuộc nằm lòng 3/3 chữ! "
                  : "💡 Đối chiếu nhanh để nhớ in vào đầu: "
              ),
              "S = Situation · Hoàn cảnh (“Mình đang…”)  |  C = Complication · Cái khó (“…nhưng…”)  |  Q = Question · Câu hỏi (“Mình cần biết…?”)."
            ),
            h("div", { style: "margin-top:0.85rem" }, renderScqLegend())
          ]
        : [];

      recallHost.replaceChildren(
        h("h2", { className: "transcript-title", style: "font-size:1.05rem" }, "🧠 Thử thách trí nhớ 10 giây (Không nhìn gợi ý): S – C – Q là gì?"),
        h(
          "p",
          { className: "causal-hint", style: "margin-top:0.25rem;margin-bottom:0.85rem" },
          "Tự gõ lại nghĩa tiếng Việt ngắn gọn của 3 chữ S – C – Q để khóa chặt công thức vào trí nhớ dài hạn:"
        ),
        h("div", { className: "recall-grid-3" }, ...inputs),
        h(
          "div",
          { style: "margin-top:0.85rem;display:flex;gap:0.55rem;flex-wrap:wrap" },
          h(
            "button",
            {
              type: "button",
              className: "btn-tactile",
              onClick: () => {
                tProg.recallChecked = true;
                saveState();
                drawRecallCard();
              }
            },
            "Kiểm tra trí nhớ S – C – Q"
          ),
          tProg.recallChecked &&
            h(
              "button",
              {
                type: "button",
                className: "btn-secondary",
                onClick: () => {
                  tProg.recallChecked = false;
                  tProg.recallVals = ["", "", ""];
                  saveState();
                  drawRecallCard();
                }
              },
              "Nhẩm lại lần nữa"
            )
        ),
        ...extraNodes
      );
    }

    drawRecallCard();

    const summaryCard = h(
      "section",
      { className: "summary-hero-card" },
      h("span", { className: "completion-badge" }, `✓ ĐÃ HOÀN TẤT ${doneEx.length}/4 BÀI TẬP 4D × SCQ`),
      h("h1", { className: "step-title", tabindex: "-1" }, "Tổng kết Bài 01 · Quy luật 4D × S (Hoàn cảnh) · C (Cái khó) · Q (Câu hỏi)"),
      h(
        "p",
        { className: "step-lead" },
        "Mình nghĩ trước bằng S – C – Q, giao AI làm cùng qua Trang – Sót – Bàn, rồi Mình mở trang gốc kiểm cuối & tự chốt chữ A (Answer)!"
      ),
      renderSpineStrip([0, 1, 2]),
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
        h("p", { className: "synthesis-kicker" }, "Công thức bỏ túi mang theo ra đời thật: S (Hoàn cảnh) · C (Cái khó) · Q (Câu hỏi) + Trang – Sót – Bàn"),
        h(
          "p",
          { className: "synthesis-body" },
          hasFill
            ? `“Mình đang ${fillVals[0] || "[S · Hoàn cảnh]"}, nhưng ${fillVals[1] || "[C · Cái khó]"}. Mình cần biết: ${(fillVals[2] || "[Q · Câu hỏi]").replace(/\?+$/, "")}? ${PROMPT_TAIL}”`
            : `“Mình đang [S · Hoàn cảnh], nhưng [C · Cái khó]. Mình cần biết: [Q · Câu hỏi]? ${PROMPT_TAIL}”`
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

    container.append(summaryCard, recallHost, pdfSection);

    configureDock({
      prevLabel: "← Bài tập 4",
      onPrev: () => goTo(scenarioId, 6),
      statusText: "Bạn cũng có thể khám phá thêm hành trình còn lại",
      nextLabel: `Xem thêm ${otherSc.badge} →`,
      onNext: () => goTo(otherId, 1)
    });
  }

  // ==================== MAIN RENDER DISPATCH ====================
  function renderActivityByStep(container, scenarioId, tProg, stepNum) {
    const act = DATA.activities[stepNum - 3];
    if (!act) return;
    if (act.kind === "sort") renderActivitySort(container, scenarioId, tProg, act, stepNum);
    else if (act.kind === "quiz") renderActivityQuiz(container, scenarioId, tProg, act, stepNum);
    else if (act.kind === "fill") renderActivityFill(container, scenarioId, tProg, act, stepNum);
    else if (act.kind === "write") renderActivityWrite(container, scenarioId, tProg, act, stepNum);
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
      else if (route.step >= 3 && route.step <= 6) renderActivityByStep(screenWrap, route.scenario, tProg, route.step);
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
