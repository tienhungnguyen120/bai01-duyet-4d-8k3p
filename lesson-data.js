(() => {
  const PROMPT_TAIL_GENERAL =
    "Chỉ thêm chỗ mình dễ sót, gợi ý hướng giải quyết và thảo luận cùng mình nhé.";
  const PROMPT_TAIL_DOC =
    "Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.";

  const SCQ_META = [
    {
      code: "S",
      en: "Situation",
      vi: "Hoàn cảnh",
      fullLabel: "S · Situation (Hoàn cảnh)",
      signal: "“Mình đang…”",
      color: "blue",
      desc: "Việc hoặc bối cảnh bạn đang xử lý"
    },
    {
      code: "C",
      en: "Complication",
      vi: "Cái khó",
      fullLabel: "C · Complication (Cái khó)",
      signal: "“…nhưng…”",
      color: "amber",
      desc: "Giới hạn, vướng mắc hoặc cái khó riêng của bạn"
    },
    {
      code: "Q",
      en: "Question",
      vi: "Câu hỏi",
      fullLabel: "Q · Question (Câu hỏi)",
      signal: "“Mình cần biết…?”",
      color: "mint",
      desc: "Câu hỏi cụ thể cần làm rõ để bạn ra quyết định"
    }
  ];

  window.LESSON_01_DATA = {
    courseTitle: "Giáo trình Tư duy & Làm chủ AI",
    lessonCode: "BÀI 01 · NGHĨ TRƯỚC KHI HỎI AI",
    lessonTitle: "Tóm tắt tài liệu dài cùng Gemini",
    lessonLead:
      "Kết hợp hai bộ khung nổi tiếng: Khung làm chủ AI 4 Chữ D của Anthropic (gói gọn 3 bước: Mình nghĩ trước – AI làm cùng – Mình kiểm cuối) và Khuôn nghĩ trước S – C – Q của McKinsey: S (Situation · Hoàn cảnh) – C (Complication · Cái khó) – Q (Question · Câu hỏi).",
    promptTailGeneral: PROMPT_TAIL_GENERAL,
    promptTailDoc: PROMPT_TAIL_DOC,
    promptTail: PROMPT_TAIL_GENERAL,
    scqMeta: SCQ_META,

    spinePillars: [
      {
        step: "1. Mình nghĩ trước",
        sub: "S (Hoàn cảnh) · C (Cái khó) · Q (Câu hỏi)"
      },
      {
        step: "2. AI làm cùng",
        sub: "Chỉ chỗ dễ sót · Gợi ý & Cùng bàn"
      },
      {
        step: "3. Mình kiểm cuối",
        sub: "Đối chiếu thực tế & Tự chốt quyết định"
      }
    ],

    scenarios: {
      adult: {
        id: "adult",
        audienceLabel: "NGƯỜI LỚN",
        cardTitle: "Tóm tắt hợp đồng thuê mặt bằng",
        badge: "Tình huống 1 · Người lớn",
        shortName: "Tóm tắt hợp đồng thuê mặt bằng",
        title: "Chủ nhà giục ký hợp đồng 12 trang lúc 3h chiều — Mà vốn của bạn chỉ đủ trụ 10 tháng!",
        desc: "Thực chiến nối 3 trang hợp đồng rời rạc trên màn hình Gemini thật bằng Khung 4D (Anthropic) × Khuôn S – C – Q (McKinsey).",
        duration: "02:30",
        journeyMeta: "2 video ngắn · 3 bài thực hành + Suy ngẫm 4F",
        videoSrc: "media/tinh-huong-1-hop-dong.mp4?v=20261125",
        posterSrc: "media/poster-hop-dong.jpg?v=20261125",
        segments: [
          {
            time: 2.25,
            ts: "00:02",
            label: "Tin nhắn giục ký 3h chiều & Câu lửng “nhưng...”",
            text: "Chủ nhà vừa gửi hợp đồng 12 trang, giục 3 giờ chiều nay ký — mà vốn của bạn chỉ đủ 10 tháng. Chỉ còn vài tiếng, nên bạn muốn dùng AI tóm tắt cho nhanh, nhưng..."
          },
          {
            time: 12.65,
            ts: "00:12",
            label: "Bản đồ Bài 01 (Lần 1): 4D (Anthropic) × S – C – Q (McKinsey)",
            text: "…hỏi “tóm tắt” và hỏi đúng cách sẽ ra hai câu trả lời rất khác! Một là khung làm chủ AI 4 chữ D của Anthropic — hãng làm ra Claude — gói gọn ba bước: Mình nghĩ trước, AI làm cùng, và Mình kiểm cuối. Hai là khuôn S – C – Q của McKinsey: S là Situation (Hoàn cảnh); C là Complication (Cái khó); và Q là Question (Câu hỏi)."
          },
          {
            time: 44.71,
            ts: "00:44",
            label: "✕ Cách 1: Hỏi “Tóm tắt thành bảng” — Bảng đẹp mượt khiến dễ yên tâm ký",
            text: "Cách 1: Quăng thẳng hợp đồng vào Gemini rồi bảo “Tóm tắt hợp đồng này thành bảng”. Bảng hiện ra rất đẹp, ghi đủ tiền cọc 75 triệu, hỗ trợ cải tạo 37,5 triệu, không sai một chữ nào!"
          },
          {
            time: 55.53,
            ts: "00:55",
            label: "Cú lật 3 trang gốc: Nối Trang 3 + 4 + 12 lộ bẫy gần 200 triệu!",
            text: "Nhưng khoan ký vội! Mở bản gốc nối ba nơi: Trang 3 mất cọc 75 triệu; Trang 4 đền gói cải tạo 37,5 triệu; và tận Phụ lục Trang 12 phạt thêm thiết bị 85 triệu. Nghỉ ở tháng thứ 10 là mất gần 200 triệu — điều bảng tóm tắt rời rạc ở Cách 1 hoàn toàn bỏ lọt!"
          },
          {
            time: 77.89,
            ts: "01:17",
            label: "✓ Cách 2 Bước 1 (Nhắc lại S – C – Q lần 2) + Trang – Sót – Bàn",
            text: "Mở Gemini bấm dấu + gửi hợp đồng lên, rồi nghĩ trước theo S – C – Q: S là Situation (Hoàn cảnh) — mình đang xem hợp đồng thuê mặt bằng mở quán 12 trang; C là Complication (Cái khó) — nhưng vốn mình chỉ trụ được 10 tháng nếu vắng khách; Q là Question (Câu hỏi) — nghỉ ở tháng thứ 10 thì tổng cộng mất bao nhiêu tiền? Cuối cùng dặn thêm: trả lời kèm số trang, chỉ thêm chỗ dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé."
          },
          {
            time: 109.89,
            ts: "01:49",
            label: "✓ Cách 2 Bước 2 (AI làm cùng): Cảnh báo dòng đầu & Tự nối 197,5 triệu",
            text: "Ngay dòng đầu tiên, Gemini cảnh báo thẳng “Tuyệt đối không nên ký!”. Bên dưới, chính AI tự nối Trang 3, Trang 4 và Trang 12 ra gần 200 triệu (197,5 triệu); chỉ thêm chỗ dễ sót ở Trang 2 (cấm tự ý sang nhượng); rồi gợi ý sẵn các điểm cần đàm phán sửa lại."
          },
          {
            time: 130.5,
            ts: "02:10",
            label: "✓ Cách 2 Bước 3 (Kiểm trang gốc & Nhắc lại 4D lần 2)",
            text: "Cuối cùng, mở đúng Trang 2, 3, 4 và 12 trên bản gốc để tự đọc lại cho chắc chắn. Hãy nhớ nhé: Hỏi tóm tắt chỉ biết hợp đồng viết gì; còn đi đủ ba bước của 4 chữ D — Mình nghĩ trước, AI làm cùng, và Mình kiểm cuối — mới biết hợp đồng sẽ làm gì với bạn!"
          }
        ],
        fourD: {
          duration: "01:28",
          videoSrc: "media/quy-luat-4d-hop-dong.mp4?v=20261125",
          posterSrc: "media/poster-4d.jpg?v=20261125",
          bridgeNote: "Nối trực tiếp từ tình huống Hợp đồng thuê mặt bằng sang Khung 4D",
          segments: [
            {
              time: 0.35,
              ts: "00:00",
              label: "Vòng lặp lệ thuộc AI (Phản tác dụng)",
              text: "Qua câu chuyện gần 200 triệu vừa rồi, có một quy luật sống còn mình muốn chia sẻ: nếu mỗi lần gặp việc khó đều quăng ngay cho AI làm thay, não mình sẽ ngày càng lười suy nghĩ. Dùng AI kiểu đó là phản tác dụng, vì càng dùng mình càng yếu đi!"
            },
            {
              time: 17.7,
              ts: "00:17",
              label: "Bí quyết cốt lõi: Ghi suy nghĩ ra trước",
              text: "Ngược lại, mục đích thật sự của việc dùng AI là giúp chính mình tư duy tốt hơn! Và bí quyết đơn giản nhất là: luôn ghi ra những gì mình nghĩ để thảo luận với AI trước."
            },
            {
              time: 31.0,
              ts: "00:31",
              label: "D1 (Delegation) & D2 (Description)",
              text: "Thói quen đó giúp bạn áp dụng tự nhiên bộ khung 4 Chữ D nổi tiếng của Anthropic. Một — Delegation (Chia việc): mình tự nghĩ mục tiêu và hoàn cảnh trước, phần dò tìm mới giao cho AI. Hai — Description (Mô tả & Đối thoại): đưa suy nghĩ vào thảo luận qua lại để mở rộng góc nhìn rồi mới chốt lệnh."
            },
            {
              time: 54.45,
              ts: "00:54",
              label: "D3 (Discernment) & D4 (Diligence)",
              text: "Ba — Discernment (Thẩm định): bắt AI ghi rõ số trang, số điều và mở đúng trang gốc kiểm tra lại. Bốn — Diligence (Trách nhiệm): AI không đền tiền hay đi thi thay mình — mình chịu trách nhiệm cuối cùng!"
            },
            {
              time: 69.5,
              ts: "01:09",
              label: "Câu thần chú 4D",
              text: "Vì vậy, trước mọi tài liệu dài hay bài toán khó, hãy nhớ nằm lòng câu thần chú: Mình không nghĩ — AI làm thay — Ra rác bóng bẩy! Mình nghĩ trước — AI làm cùng — Mình kiểm cuối!"
            }
          ]
        }
      },

      student: {
        id: "student",
        audienceLabel: "HỌC SINH",
        cardTitle: "Tóm tắt tư liệu môn Lịch sử",
        badge: "Tình huống 2 · Học sinh",
        shortName: "Tóm tắt tư liệu môn Lịch sử",
        title: "Nhóm lớp 8A2 mãi đỉnh ❤️ nhận tệp Sử 12 trang — Cảnh chính chỉ được diễn chính sử!",
        desc: "Thực chiến lọc chính sử Đại Việt sử ký toàn thư và chi tiết văn học trên màn hình Gemini thật bằng Khung 4D (Anthropic) × Khuôn S – C – Q (McKinsey).",
        duration: "02:48",
        journeyMeta: "2 video ngắn · 3 bài thực hành + Suy ngẫm 4F",
        videoSrc: "media/tinh-huong-2-lich-su.mp4?v=20261125",
        posterSrc: "media/poster-lich-su.jpg?v=20261125",
        segments: [
          {
            time: 2.35,
            ts: "00:02",
            label: "Tin nhắn nhóm lớp 8A2 mãi đỉnh ❤️ & Câu lửng “nhưng...”",
            text: "Thầy dạy Sử vừa gửi vào nhóm lớp “8A2 mãi đỉnh ❤️” tập tư liệu Trần Quốc Toản 12 trang, dặn thứ Hai diễn kịch 3 phút — mà cảnh chính chỉ được dùng chính sử, chi tiết văn học phải tách riêng. Chỉ còn một tối, nên bạn muốn dùng AI tóm tắt cho nhanh, nhưng..."
          },
          {
            time: 16.68,
            ts: "00:16",
            label: "Bản đồ Bài 01 (Lần 1): 4D (Anthropic) × S – C – Q (McKinsey)",
            text: "…hỏi “tóm tắt” và hỏi đúng cách sẽ ra hai câu trả lời rất khác! Một là khung làm chủ AI 4 chữ D của Anthropic — hãng làm ra Claude — gói gọn ba bước: Mình nghĩ trước, AI làm cùng, và Mình kiểm cuối. Hai là khuôn S – C – Q của McKinsey: S là Situation (Hoàn cảnh); C là Complication (Cái khó); và Q là Question (Câu hỏi)."
          },
          {
            time: 48.53,
            ts: "00:48",
            label: "✕ Cách 1: Hỏi “Tóm tắt thành bảng” — Bảng đẹp mượt dễ làm chủ quan",
            text: "Cách 1: Quăng thẳng tư liệu vào Gemini rồi bảo “Tóm tắt tập tư liệu này thành bảng”. Bảng hiện ra rất đẹp, chia đủ các phần chính sử và văn học, không sai một chữ nào!"
          },
          {
            time: 59.48,
            ts: "00:59",
            label: "Cú lật 3 trang gốc: Nối Trang 3 + 4 + 8 lộ 2 lỗi sai sử liệu trước lớp!",
            text: "Nhưng khoan viết kịch bản vội! Mở bản gốc nối ba nơi: Trang 3 ghi Hội nghị Bình Than (1282); Trang 4 chỉ chép Quốc Toản tự cầm cam bóp nát và viết 6 chữ lên cờ; còn Trang 8 chỉ rõ vua ban cam quý và mẹ thêu cờ vàng là tiểu thuyết. Quen miệng diễn Diên Hồng hay vua ban cam là dính ngay 2 lỗi sai trước lớp!"
          },
          {
            time: 90.62,
            ts: "01:30",
            label: "✓ Cách 2 Bước 1 (Nhắc lại S – C – Q lần 2) + Trang – Sót – Bàn",
            text: "Mở Gemini bấm dấu + gửi tệp tư liệu lên, rồi nghĩ trước theo S – C – Q: S là Situation (Hoàn cảnh) — mình đang viết kịch bản đóng vai 3 phút về Trần Quốc Toản từ tập tư liệu thầy phát; C là Complication (Cái khó) — nhưng thầy bắt cảnh chính chỉ dùng chính sử còn chi tiết văn học phải tách riêng; Q là Question (Câu hỏi) — chi tiết nào đưa vào cảnh diễn, chi tiết nào phải tách riêng? Cuối cùng dặn thêm: trả lời kèm số trang, chỉ thêm chỗ dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé."
          },
          {
            time: 124.58,
            ts: "02:04",
            label: "✓ Cách 2 Bước 2 (AI làm cùng): Bảng tách 2 cột & Điểm mù Trần Kiện",
            text: "Ngay mục đầu, Gemini kẻ bảng tách rạch ròi chính sử (Trang 3, 4) với văn học (Trang 8). Bên dưới, AI chỉ điểm mù dễ sót: nhân vật đối trọng Trần Kiện ở Trang 4 và Trang 10, cùng bẫy nhầm tuổi 1282 vs 1285; rồi gợi ý sẵn bố cục kịch 3 phút kèm câu hỏi thảo luận tiếp."
          },
          {
            time: 148.62,
            ts: "02:28",
            label: "✓ Cách 2 Bước 3 (Kiểm trang gốc & Nhắc lại 4D lần 2)",
            text: "Cuối cùng, mở đúng Trang 3, 4, 8 và 11 trên bản gốc để tự đọc lại cho chắc chắn. Hãy nhớ nhé: Hỏi tóm tắt chỉ biết tư liệu viết gì; còn đi đủ ba bước của 4 chữ D — Mình nghĩ trước, AI làm cùng, và Mình kiểm cuối — mới biết dùng được gì cho bài của bạn!"
          }
        ],
        fourD: {
          duration: "01:28",
          videoSrc: "media/quy-luat-4d-lich-su.mp4?v=20261125",
          posterSrc: "media/poster-4d-lich-su.jpg?v=20261125",
          bridgeNote: "Nối trực tiếp từ tình huống Kịch bản Lịch sử sang Khung 4D",
          segments: [
            {
              time: 0.15,
              ts: "00:00",
              label: "Vòng lặp lệ thuộc AI (Phản tác dụng)",
              text: "Qua câu chuyện soạn kịch bản Lịch sử vừa rồi, có một quy luật sống còn mà mình muốn chia sẻ với các bạn: nếu mỗi lần gặp việc khó đều quăng ngay cho AI làm thay, não mình sẽ ngày càng lười suy nghĩ. Dùng AI kiểu đó là phản tác dụng, vì càng dùng mình càng yếu đi!"
            },
            {
              time: 17.7,
              ts: "00:17",
              label: "Bí quyết cốt lõi: Ghi suy nghĩ ra trước",
              text: "Ngược lại, mục đích thật sự của việc dùng AI là giúp chính mình tư duy tốt hơn! Và bí quyết đơn giản nhất là: luôn ghi ra những gì mình nghĩ để thảo luận với AI trước."
            },
            {
              time: 31.0,
              ts: "00:31",
              label: "D1 (Delegation) & D2 (Description)",
              text: "Thói quen đó giúp bạn áp dụng tự nhiên bộ khung 4 Chữ D nổi tiếng của Anthropic. Một — Delegation (Chia việc): mình tự nghĩ mục tiêu và hoàn cảnh trước, phần dò tìm mới giao cho AI. Hai — Description (Mô tả & Đối thoại): đưa suy nghĩ vào thảo luận qua lại để mở rộng góc nhìn rồi mới chốt lệnh."
            },
            {
              time: 54.45,
              ts: "00:54",
              label: "D3 (Discernment) & D4 (Diligence)",
              text: "Ba — Discernment (Thẩm định): bắt AI ghi rõ số trang, số điều và mở đúng trang gốc kiểm tra lại. Bốn — Diligence (Trách nhiệm): AI không đền tiền hay đi thi thay mình — mình chịu trách nhiệm cuối cùng!"
            },
            {
              time: 69.5,
              ts: "01:09",
              label: "Câu thần chú 4D",
              text: "Vì vậy, trước mọi tài liệu dài hay bài toán khó, hãy nhớ nằm lòng câu thần chú: Mình không nghĩ — AI làm thay — Ra rác bóng bẩy! Mình nghĩ trước — AI làm cùng — Mình kiểm cuối!"
            }
          ]
        }
      }
    },

    fourDSummary: [
      {
        code: "D1 · Delegation",
        title: "Chia việc (Mình nghĩ trước bằng S – C – Q)",
        desc: "Tự xác định S · Situation (Hoàn cảnh), C · Complication (Cái khó) và Q · Question (Câu hỏi) trước; phần đọc dài mới giao cho AI."
      },
      {
        code: "D2 · Description",
        title: "Mô tả & Đối thoại (AI làm cùng: Trang – Sót – Bàn)",
        desc: "Giao rõ 3 việc cho AI: trả lời kèm số trang, chỉ thêm chỗ dễ sót, rồi gợi ý hướng giải quyết và bàn tiếp cùng mình."
      },
      {
        code: "D3 · Discernment",
        title: "Thẩm định (Mở trang gốc kiểm chứng)",
        desc: "Không tin độ mượt của câu chữ. Luôn mở đúng số trang, số điều trong bản gốc để đọc kiểm lại bằng mắt."
      },
      {
        code: "D4 · Diligence",
        title: "Trách nhiệm (Mình tự chốt quyết định cuối)",
        desc: "AI chỉ đưa bản nháp; chính mình mới là người hiểu rõ, tự ra quyết định cuối và chịu trách nhiệm."
      }
    ],

    activities: [
      // ==================== ACTIVITY 1 (STEP 3): CLEAN 3-STEP 4D CLASSIFICATION ====================
      {
        id: "act-sort",
        kind: "sort",
        spineActive: [0, 1, 2],
        showScqLegend: false,
        phase: "Bài tập 1 · Khung 4D · 3 phút",
        title: "Bài tập 1: Việc này thuộc bước nào trong 4D?",
        lead: "Nhiệm vụ: Bấm chọn xem mỗi việc làm dưới đây thuộc bước nào trong 3 bước làm chủ AI.",
        columns: [
          "1. Mình nghĩ trước",
          "2. AI làm cùng",
          "3. Mình kiểm cuối"
        ],
        cardsAdult: [
          {
            label: "Ghi ra giới hạn tài chính của mình: vốn dự phòng chỉ đủ cầm cự quán 10 tháng.",
            col: 0,
            why: "Chỉ chính bạn mới biết hoàn cảnh và giới hạn vốn của mình — nếu bỏ qua bước này là giao trắng cho AI."
          },
          {
            label: "Chốt rõ câu hỏi trước khi mở máy: trả mặt bằng ở tháng thứ 10 thì mất tổng bao nhiêu tiền?",
            col: 0,
            why: "Xác định sẵn câu hỏi mấu chốt từ đầu giúp bạn làm chủ hướng phân tích thay vì đọc thụ động."
          },
          {
            label: "Gửi tệp hợp đồng 12 trang vào Gemini, dặn lọc các khoản phạt kèm số trang và chỉ chỗ dễ sót.",
            col: 1,
            why: "Phần dò tìm xuyên 12 trang và nối dữ liệu kèm số trang là việc giao cho AI làm cùng."
          },
          {
            label: "Mở Phụ lục 02 ở Trang 12 xem mức phạt thiết bị có đúng 85 triệu như AI vừa báo không.",
            col: 2,
            why: "Dù AI trích số trang rất tự tin, bạn vẫn phải lật đúng trang gốc kiểm lại con số bằng mắt."
          },
          {
            label: "Dò lại Khoản 2.1 ở Trang 2 trên tệp PDF gốc để đọc nguyên văn câu cấm tự ý sang nhượng.",
            col: 2,
            why: "Đối chiếu nguyên văn điều khoản trên bản gốc để chắc chắn AI không diễn giải sai câu chữ pháp lý."
          },
          {
            label: "Sau khi kiểm đủ các trang gốc, tự quyết định nhắn chủ nhà xin đàm phán lại trước khi ký.",
            col: 2,
            why: "AI không đền tiền thay bạn — người ký tên và chốt quyết định cuối cùng luôn phải là bạn."
          }
        ],
        cardsStudent: [
          {
            label: "Ghi rõ yêu cầu của thầy trước khi mở máy: cảnh chính chỉ dùng chính sử, văn học tách riêng.",
            col: 0,
            why: "Tự nắm chắc luật chấm điểm của đề bài trước khi hỏi — nếu bỏ qua là giao trắng việc học cho AI."
          },
          {
            label: "Chốt rõ điều cần lọc: chi tiết nào đưa vào cảnh diễn 3 phút, chi tiết nào để ở lời bình?",
            col: 0,
            why: "Đặt sẵn câu hỏi phân loại rõ ràng từ đầu để AI phục vụ đúng cấu trúc bài của mình."
          },
          {
            label: "Gửi tệp tư liệu 12 trang cho Gemini, dặn kẻ bảng kèm số trang và chỉ điểm dễ sót.",
            col: 1,
            why: "Nhờ AI rà soát nhanh 12 trang tư liệu, kẻ bảng đối chiếu kèm số trang để tiết kiệm thời gian."
          },
          {
            label: "Lật Trang 4 tập tư liệu xem Đại Việt sử ký toàn thư có chép cảnh vua ban cam như AI viết không.",
            col: 2,
            why: "AI rất hay quen tay trộn tiểu thuyết vào lịch sử — phải mở đúng trang sử gốc kiểm lại từng chi tiết."
          },
          {
            label: "So lại Bảng đối chiếu ở Trang 8 xem mốc tuổi năm 1285 mà AI nêu có khớp tư liệu gốc không.",
            col: 2,
            why: "Kiểm tra chéo niên đại và độ tuổi trên trang gốc để tránh lỗi mâu thuẫn trước lớp."
          },
          {
            label: "Kiểm chứng xong các trang gốc, tự chốt kịch bản: 2 phút diễn Bình Than, 1 phút lời bình.",
            col: 2,
            why: "AI chỉ gợi ý bản nháp; chính bạn hiểu bài, tự chốt kịch bản và tự tin trả lời thầy cô trên lớp."
          }
        ]
      },

      // ==================== ACTIVITY 2 (STEP 4): EQUAL-LENGTH S - C - Q DIAGNOSTIC QUIZ ====================
      {
        id: "act-quiz",
        kind: "quiz",
        spineActive: [0, 1],
        showScqLegend: false,
        hideScqInSpineBeforeQ1: true,
        phase: "Bài tập 2 · Khuôn S – C – Q · 4 phút",
        title: "Bài tập 2: Bắt bệnh câu lệnh S – C – Q",
        lead: "Nhiệm vụ: Chọn 1 đáp án đúng nhất cho mỗi câu hỏi dưới đây (5 câu).",
        questionsAdult: [
          {
            q: "Ba chữ S – C – Q trong khuôn nghĩ trước của McKinsey lần lượt là viết tắt của bộ từ nào?",
            options: [
              "S: Tóm tắt (Summary) · C: Sao chép (Copy) · Q: Hỏi nhanh (Quick)",
              "S: Tìm kiếm (Search) · C: Kiểm tra (Check) · Q: Trích dẫn (Quote)",
              "S: Hoàn cảnh (Situation) · C: Cái khó (Complication) · Q: Câu hỏi (Question)",
              "S: Bối cảnh (Setting) · C: Nội dung (Content) · Q: Kết quả (Quality)"
            ],
            answer: 2,
            explain:
              "Mẹo nhớ nhanh: S — Situation (Hoàn cảnh: “Mình đang…”), C — Complication (Cái khó: trùng âm đầu chữ C, đi sau từ “nhưng…”), Q — Question (Câu hỏi: “Mình cần biết…?”)."
          },
          {
            q: "Trong câu lệnh: “Mình đang xem hợp đồng thuê quán 12 trang, [nhưng vốn mình chỉ trụ được 10 tháng]. Mình cần biết: nghỉ ở tháng 10 mất bao nhiêu tiền?”, phần trong ngoặc [...] thuộc chữ nào?",
            options: [
              "Chữ C (Cái khó) — giới hạn riêng đứng ngay sau từ “nhưng”",
              "Chữ S (Hoàn cảnh) — thông tin giới thiệu tên tệp tài liệu",
              "Chữ Q (Câu hỏi) — yêu cầu tính toán con số thiệt hại cuối",
              "Phần giao việc — lời dặn AI trích dẫn đầy đủ kèm số trang"
            ],
            answer: 0,
            explain:
              "Phép thử chữ C: Nếu bỏ đoạn “nhưng vốn mình chỉ trụ được 10 tháng” đi, AI sẽ không bao giờ biết để cộng dồn 3 khoản phạt nghỉ sớm ở mốc tháng 10 — đó chính là C · Complication (Cái khó)!"
          },
          {
            q: "Chị Lan gõ: “Mình đang xem hợp đồng thuê mặt bằng 12 trang. Mình cần biết: hợp đồng này có điều khoản phạt nào cần lưu ý không?”. Câu lệnh trên đang yếu ở đâu?",
            options: [
              "Thiếu S (Hoàn cảnh): chưa nói rõ mình đang đọc loại tài liệu gì",
              "Thiếu C (Cái khó): chưa nêu giới hạn vốn hay điều mình lo ngại",
              "Thiếu Q (Câu hỏi): chưa có câu hỏi nào đặt ở cuối câu lệnh",
              "Đã đủ cả S – C – Q: có thể bấm gửi ngay không cần bổ sung"
            ],
            answer: 1,
            explain:
              "Chị Lan đã nêu S (đang xem hợp đồng 12 trang) và Q (hỏi điều khoản phạt), nhưng khuyết hẳn C (Cái khó riêng, ví dụ: vốn chỉ đủ 10 tháng hoặc cần quyền sang nhượng) nên AI chỉ liệt kê chung chung."
          },
          {
            q: "Anh Hoàng gõ: “Mình đang đọc quy chế thưởng Tết 10 trang của công ty, nhưng đầu tháng 3 tới mình định xin nghỉ việc. Xem giúp mình nhé!”. Câu lệnh này thiếu mảnh nào?",
            options: [
              "Thiếu S (Hoàn cảnh): chưa cho biết độ dài của quy chế đang đọc",
              "Thiếu C (Cái khó): chưa cho biết thời điểm dự kiến xin nghỉ việc",
              "Đã đủ cả S – C – Q: cụm “Xem giúp mình nhé” đã là câu hỏi rõ",
              "Thiếu Q (Câu hỏi): chưa hỏi rõ khoản thu hồi hay phạt cần kiểm"
            ],
            answer: 3,
            explain:
              "Đã có S (đọc quy chế thưởng Tết) và C (nhưng đầu tháng 3 xin nghỉ), song cụm “Xem giúp mình nhé!” quá mơ hồ — cần chốt Q thật cụ thể: “Mình cần biết nghỉ đầu tháng 3 có bị thu hồi thưởng Tết hay đền phí đào tạo không?”."
          },
          {
            q: "Sau khi viết đủ S – C – Q, vì sao ta luôn dặn thêm AI: “trả lời kèm số trang và chỉ thêm chỗ mình dễ sót”?",
            options: [
              "Để câu lệnh dài hơn giúp AI trình bày bảng biểu đẹp mắt hơn",
              "Để giao trọn trách nhiệm kiểm tra hợp đồng cho AI làm thay mình",
              "Để AI soi thêm điểm mù và có số trang mở bản gốc kiểm chứng",
              "Để AI tự động lược bỏ bớt các phụ lục dài ở cuối hợp đồng"
            ],
            answer: 2,
            explain:
              "“Chỉ thêm chỗ dễ sót” giúp phát hiện điểm mù ngoài câu hỏi (như lệnh cấm sang nhượng ở Trang 2), còn “kèm số trang” giúp bạn lật đúng bản gốc kiểm chứng ở Bước 3!"
          }
        ],
        questionsStudent: [
          {
            q: "Ba chữ S – C – Q trong khuôn nghĩ trước của McKinsey lần lượt là viết tắt của bộ từ nào?",
            options: [
              "S: Tóm tắt (Summary) · C: Sao chép (Copy) · Q: Làm nhanh (Quick)",
              "S: Câu chuyện (Story) · C: Nhân vật (Character) · Q: Câu nói (Quote)",
              "S: Hoàn cảnh (Situation) · C: Cái khó (Complication) · Q: Câu hỏi (Question)",
              "S: Môn học (Subject) · C: Chương bài (Chapter) · Q: Đề thi (Quiz)"
            ],
            answer: 2,
            explain:
              "Mẹo nhớ nhanh: S — Situation (Hoàn cảnh: “Mình đang…”), C — Complication (Cái khó: trùng âm đầu chữ C, đi sau từ “nhưng…”), Q — Question (Câu hỏi: “Mình cần biết…?”)."
          },
          {
            q: "Trong câu lệnh: “Mình đang viết kịch 3 phút về Trần Quốc Toản từ tư liệu thầy phát, [nhưng thầy bắt cảnh chính chỉ dùng chính sử]. Mình cần biết: chi tiết nào diễn chính, chi tiết nào tách riêng?”, đoạn trong ngoặc [...] là chữ nào?",
            options: [
              "Chữ C (Cái khó) — ràng buộc gắt gao đứng ngay sau từ “nhưng”",
              "Chữ S (Hoàn cảnh) — thông tin giới thiệu tên tập tư liệu Sử",
              "Chữ Q (Câu hỏi) — yêu cầu chia đôi hai cột cảnh diễn và lời bình",
              "Phần kiểm cuối — bước mở lại từng trang tư liệu gốc để dò bài"
            ],
            answer: 0,
            explain:
              "Phép thử chữ C: Nếu bỏ đoạn “nhưng thầy bắt cảnh chính chỉ dùng chính sử” đi, AI sẽ lập tức trộn cảnh vua ban cam vào kịch bản chính — vậy đó chính là C · Complication (Cái khó)!"
          },
          {
            q: "Bạn Mai gõ: “Mình đang viết kịch bản đóng vai 3 phút về Trần Quốc Toản từ tập tư liệu thầy phát. Mình cần biết: nên đưa những cảnh nào vào kịch bản cho hấp dẫn?”. Câu lệnh này đang yếu ở đâu?",
            options: [
              "Thiếu S (Hoàn cảnh): chưa nói rõ tên nhân vật lịch sử đang làm",
              "Thiếu C (Cái khó): chưa nêu quy định tách riêng chính sử và văn học",
              "Thiếu Q (Câu hỏi): chưa có câu hỏi nào đặt ở cuối câu lệnh",
              "Đã đủ cả S – C – Q: có thể bấm gửi ngay không cần sửa thêm"
            ],
            answer: 1,
            explain:
              "Bạn Mai đã có S (viết kịch 3 phút từ tư liệu) và Q (hỏi chọn cảnh nào), nhưng thiếu hẳn C (Cái khó: cảnh chính chỉ được dùng chính sử, văn học phải tách riêng) nên AI sẽ ưu tiên gợi ý cảnh tiểu thuyết."
          },
          {
            q: "Bạn Nam gõ: “Mình đang soạn kịch 3 phút từ tư liệu Trần Quốc Toản, nhưng thầy bắt cảnh chính chỉ dùng chính sử thôi. Giúp mình nhé!”. Câu lệnh này thiếu mảnh nào?",
            options: [
              "Thiếu S (Hoàn cảnh): chưa nói thời lượng vở kịch dài bao nhiêu phút",
              "Thiếu C (Cái khó): chưa nhắc tới quy định chỉ dùng chính sử của thầy",
              "Đã đủ cả S – C – Q: cụm “Giúp mình nhé” đã thay thế cho câu hỏi",
              "Thiếu Q (Câu hỏi): chưa hỏi rõ cần tách chi tiết nào khỏi cảnh chính"
            ],
            answer: 3,
            explain:
              "Đã có S và C nhưng “Giúp mình nhé!” chưa phải câu hỏi rõ — cần chốt Q cụ thể: “Mình cần biết chi tiết nào được đưa vào cảnh diễn chính, chi tiết nào phải tách sang lời bình?”."
          },
          {
            q: "Sau khi viết đủ S – C – Q, vì sao ta luôn dặn thêm AI: “trả lời kèm số trang và chỉ thêm chỗ mình dễ sót”?",
            options: [
              "Để câu lệnh dài hơn giúp AI viết lời văn bay bổng cảm xúc hơn",
              "Để AI tự chịu trách nhiệm nếu nhóm diễn sai sử liệu trước lớp",
              "Để AI chỉ thêm điểm mù và có số trang mở tư liệu gốc kiểm lại",
              "Để AI tự tóm lược bỏ đi các bảng đối chiếu ở cuối tập tư liệu"
            ],
            answer: 2,
            explain:
              "Nhờ câu dặn này, Gemini vừa chỉ thêm điểm mù cực đắt (Hoài Nhân vương Trần Kiện ở Trang 4, 10 & bẫy tuổi 1282–1285), vừa ghi rõ số trang để bạn mở PDF gốc kiểm lại!"
          }
        ]
      },

      // ==================== ACTIVITY 3 (STEP 5): REAL-LIFE S-C-Q + PROMPT + GEMINI ANSWER ====================
      {
        id: "act-real",
        kind: "real",
        spineActive: [0, 1, 2],
        showScqLegend: false,
        phase: "Bài tập 3 · Đưa vào việc thật của bạn · 5 phút",
        title: "Thực hành: Áp dụng S – C – Q vào việc thật của bạn",
        lead: "Chọn 1 vấn đề thật bạn đang vướng (có tài liệu hay không có tài liệu đều được), ghép câu lệnh hỏi Gemini rồi dán lại câu lệnh & đoạn trả lời bạn tâm đắc nhất.",
        fields: [
          {
            slot: "S",
            en: "Situation",
            vi: "Hoàn cảnh",
            signal: "Mình đang…",
            color: "blue",
            placeholderAdult:
              "VD: định mở quán cà phê nhỏ gần trường (hoặc đang phân vân đổi việc, đang xem hợp đồng…)",
            placeholderStudent:
              "VD: sắp thi giữa kỳ môn Toán (hoặc đang bí bài văn nghị luận, đang chia việc nhóm…)"
          },
          {
            slot: "C",
            en: "Complication",
            vi: "Cái khó",
            signal: "…nhưng…",
            color: "amber",
            placeholderAdult:
              "VD: vốn chỉ có 150 triệu và mình chưa từng tự vận hành quán bao giờ",
            placeholderStudent:
              "VD: hay mất điểm bài hình học vì không biết kẻ đường phụ bắt đầu từ đâu"
          },
          {
            slot: "Q",
            en: "Question",
            vi: "Câu hỏi",
            signal: "Mình cần biết…?",
            color: "mint",
            placeholderAdult:
              "VD: mình cần kiểm tra kỹ 3 điều gì trước khi xuống tiền thuê mặt bằng",
            placeholderStudent:
              "VD: mình nên ôn phần hình học theo thứ tự nào trong 2 tuần tới"
          }
        ],
        topicIdeasAdult: [
          "Đang phân vân đổi việc / đàm phán lương",
          "Đang tính mở quán / nhập hàng kinh doanh nhỏ",
          "Đang xử lý 1 ca khách hàng / đồng nghiệp khó",
          "Đang lên kế hoạch chi tiêu / trả nợ trong năm",
          "Đang đọc 1 hợp đồng / quy chế dài cần soi kỹ"
        ],
        topicIdeasStudent: [
          "Đang ôn thi 1 môn mình hay mất điểm",
          "Đang bí dàn ý bài văn / bài thuyết trình",
          "Đang phân công làm dự án nhóm trên lớp",
          "Đang muốn chia thời gian tự học buổi tối",
          "Đang đọc 1 tập đề cương / tư liệu dài thầy cô phát"
        ],
        cTestNote:
          "Mẹo kiểm chữ C (Cái khó): Nếu thử che ô (C) lại mà câu trả lời của AI khác hẳn so với khi có ô (C), nghĩa là bạn đã gọi trúng “Cái khó” riêng của mình!",
        answerPlaceholder:
          "Dán đoạn Gemini trả lời mà bạn tâm đắc hoặc thấy giải quyết trúng việc nhất vào đây...",
        step3Reminder:
          "Nhịp 3 của 4D (Mình kiểm cuối): AI giúp mở góc nhìn rất nhanh, còn bạn hãy đối chiếu lại với thực tế của mình rồi tự chốt quyết định nhé. (Bài làm chỉ lưu trên trình duyệt máy bạn).",
        doneNote:
          "✓ Đã lưu câu lệnh & câu trả lời tâm đắc của bạn! Bấm tiếp tục sang Trang 6 để ghi nhanh suy ngẫm 4F nhé."
      }
    ],

    caseFiles: [
      {
        id: "cf-lease",
        forScenario: "adult",
        title: "Hồ sơ mẫu 1 · Hợp đồng thuê mặt bằng kinh doanh (12 trang)",
        meta: "Dành cho Người lớn · Gồm cấm sang nhượng (Trang 2), tiền cọc & tăng giá 18% (Trang 3), hỗ trợ sửa quán (Trang 4), chấm dứt sớm (Trang 7) & khấu hao thiết bị 05 ngày (Trang 12).",
        fileHref: "tai-lieu/Hop-dong-Thue-mat-bang-Mau-12-trang.pdf",
        answerSummary:
          "Bẫy ngầm khi trả mặt bằng ở tháng thứ 10: (1) Mất cọc 75 triệu (Điều 4, Trang 3); (2) Hoàn trả 37,5 triệu gói hỗ trợ cải tạo mặt bằng (Điều 5, Trang 4); (3) Thanh toán 85 triệu khấu hao thiết bị khung tháng 7–12 và buộc chuyển khoản hoàn tất trong 05 ngày làm việc (Phụ lục 02, Trang 12) → Tổng thiệt hại 197,5 triệu đồng, không được cấn trừ vào tiền cọc (Điều 11, Trang 7) và cấm tự ý sang nhượng (Trang 2)."
      },
      {
        id: "cf-history",
        forScenario: "student",
        title: "Hồ sơ mẫu 2 · Tập tư liệu Lịch sử Trần Quốc Toản (12 trang)",
        meta: "Dành cho Học sinh · Gồm bối cảnh Bình Than 1282 (Trang 3), Đại Việt sử ký toàn thư (Trang 4), bảng đối chiếu văn học (Trang 8) & tiêu chí chấm (Trang 11).",
        fileHref: "tai-lieu/Tu-lieu-Lich-su-Tran-Quoc-Toan-12-trang.pdf",
        answerSummary:
          "Ranh giới cốt lõi: Sự kiện diễn ra tại Hội nghị Bình Than năm 1282 (Trang 3). Chính sử Đại Việt sử ký toàn thư (Trang 4) chỉ ghi Quốc Toản (đứng cùng Hoài Nhân vương Trần Kiện) tự cầm cam bóp nát lúc nào không biết và viết 6 chữ lên cờ; năm 1285 (~18–19 tuổi) sát cánh cùng Trần Nhật Duật, Nguyễn Khoái ở Tây Kết – Chương Dương và sử không chép tuổi mất. Chi tiết vua ban cam, mẹ thêu cờ vàng và hy sinh tuổi 16 (Trang 8) là sáng tạo văn học — bắt buộc tách sang lời bình theo quy định Trang 11."
      }
    ],

    homework4F: {
      taskAdult:
        "Suy ngẫm 4F về buổi học và chính lần bạn vừa đem việc thật của mình ra hỏi Gemini ở trang trước.",
      taskStudent:
        "Suy ngẫm 4F về buổi học và chính lần bạn vừa đem việc thật của mình ra hỏi Gemini ở trang trước.",
      leadNote:
        "Gập bài học lại rồi gõ thẳng vào từng mục — gõ tới mục nào chữ ví dụ mờ của mục đó sẽ tự biến mất:",
      zones: [
        {
          key: "facts",
          title: "1. Facts",
          cue: "Đã nghe gì từ bài & đã tự làm gì (việc thật bạn đem ra hỏi, câu lệnh đã gửi, AI trả lời gì)?",
          ghost:
            "🍳 VD (chuyện học rán trứng): Xem clip dạy lửa nhỏ, cuộn lúc mặt trứng còn ướt.\n- Tối vào bếp rán thử 2 mẻ trên chảo mỏng: mẻ 1 để lửa vừa bị cháy xém & gãy đôi; mẻ 2 hạ nhỏ lửa thì cuộn được.",
          rows: 3
        },
        {
          key: "feelings",
          title: "2. Feelings",
          cue: "Lúc học và lúc tự hỏi việc thật của mình thấy sao — vì sao? (thành thật với mình, không ai chấm)",
          ghost:
            "🍳 VD: Lúc xem clip thấy chủ quan vì nhìn đầu bếp lật nhẹ tênh tưởng dễ.\n- Lúc mẻ đầu cháy khét thì vừa quê vừa cay cú; tới mẻ 2 lành lặn mới thở phào.",
          rows: 2
        },
        {
          key: "findings",
          title: "3. Findings",
          cue: "Tưởng vậy, hóa ra…? (điều trước khi tự viết S – C – Q cho việc thật bạn chưa nhận ra)",
          ghost:
            "🍳 VD: Xem người khác làm mượt rất dễ tưởng mình đã biết làm.\n- Tưởng rách do tay lật vụng, hóa ra chảo mỏng ở nhà nóng gắt hơn bếp từ trong clip; chi tiết thử nhiệt đầu đũa clip có nói mà mình nghe lướt.",
          rows: 3
        },
        {
          key: "future",
          title: "4. Future",
          cue: "Lần tới bạn sẽ áp dụng S – C – Q vào việc cụ thể nào, hoặc còn câu hỏi nào muốn bàn tiếp?",
          ghost:
            "🍳 VD: [ ] Sáng thứ Bảy rán lại: thử đầu đũa trước khi đổ trứng và nhấc chảo khỏi bếp 10 giây lúc cuộn.\n- [ ] Tìm hiểu xem pha thêm 1 thìa sữa tươi có giúp trứng đỡ khô nhanh không.",
          rows: 2
        }
      ]
    }
  };
})();
