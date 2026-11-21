(() => {
  const PROMPT_TAIL =
    "Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.";

  const SCQ_META = [
    {
      code: "S",
      en: "Situation",
      vi: "Hoàn cảnh",
      fullLabel: "S · Situation (Hoàn cảnh)",
      signal: "“Mình đang…”",
      color: "blue",
      desc: "Việc trước mắt & tài liệu bạn đang xử lý"
    },
      {
      code: "C",
      en: "Complication",
      vi: "Cái khó",
      fullLabel: "C · Complication (Cái khó)",
      signal: "“…nhưng…”",
      color: "amber",
      desc: "Giới hạn, điều kiện ngặt nghèo hoặc cái khó riêng của bạn"
    },
    {
      code: "Q",
      en: "Question",
      vi: "Câu hỏi",
      fullLabel: "Q · Question (Câu hỏi)",
      signal: "“Mình cần biết…?”",
      color: "mint",
      desc: "Câu hỏi cụ thể cần trả lời để bạn ra quyết định"
    }
  ];

  window.LESSON_01_DATA = {
    courseTitle: "Giáo trình Tư duy & Làm chủ AI",
    lessonCode: "BÀI 01 · NGHĨ TRƯỚC KHI HỎI AI",
    lessonTitle: "Tóm tắt tài liệu dài cùng Gemini",
    lessonLead:
      "Kết hợp hai bộ khung nổi tiếng: Khung làm chủ AI 4 Chữ D của Anthropic (gói gọn 3 bước: Mình nghĩ trước – AI làm cùng – Mình kiểm cuối) và Khuôn nghĩ trước S – C – Q của McKinsey: S (Situation · Hoàn cảnh) – C (Complication · Cái khó) – Q (Question · Câu hỏi).",
    promptTail: PROMPT_TAIL,
    scqMeta: SCQ_META,

    spinePillars: [
      {
        step: "1. Mình nghĩ trước",
        sub: "D1 · S (Hoàn cảnh) · C (Cái khó) · Q (Câu hỏi)"
      },
      {
        step: "2. AI làm cùng",
        sub: "D2 · Kèm Trang · Chỉ Sót · Cùng Bàn"
      },
      {
        step: "3. Mình kiểm cuối",
        sub: "D3–D4 · Mở trang gốc & Tự chốt A (Answer)"
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
        journeyMeta: "2 video ngắn · 4 bài tập + Bài về nhà 4F",
        videoSrc: "media/tinh-huong-1-hop-dong.mp4",
        posterSrc: "media/poster-hop-dong.jpg",
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
          videoSrc: "media/quy-luat-4d-hop-dong.mp4",
          posterSrc: "media/poster-4d.jpg",
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
        journeyMeta: "2 video ngắn · 4 bài tập + Bài về nhà 4F",
        videoSrc: "media/tinh-huong-2-lich-su.mp4",
        posterSrc: "media/poster-lich-su.jpg",
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
          videoSrc: "media/quy-luat-4d-lich-su.mp4",
          posterSrc: "media/poster-4d-lich-su.jpg",
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
        title: "Trách nhiệm (Mình tự chốt A — Answer)",
        desc: "AI chỉ đưa bản nháp; chính mình mới là người hiểu rõ, tự chốt chữ A (Answer — Quyết định cuối) và chịu trách nhiệm."
      }
    ],

    activities: [
      // ==================== ACTIVITY 1 (STEP 3): 4D × SCQA ROLE SORT ====================
      {
        id: "act-sort",
        kind: "sort",
        spineActive: [0, 1, 2],
        showScqLegend: true,
        phase: "Trụ cột 1 · Quy luật 4D × S – C – Q · 4 phút",
        title: "Bài tập 1: Ai làm bước nào trong Quy luật 4D?",
        lead: "Quy luật 4D gói gọn trong 3 nhịp: Mình nghĩ trước (S·C·Q) — AI làm cùng (Trang·Sót·Bàn) — Mình kiểm cuối (Chốt A). Hãy xếp mỗi hành động dưới đây vào đúng vai.",
        columns: [
          "1. Mình nghĩ trước (S·C·Q)",
          "2. AI làm cùng (Trang·Sót·Bàn)",
          "3. Mình kiểm cuối (Chốt A)",
          "✕ Sai vai (Giao trắng cho AI)"
        ],
        cardsAdult: [
          {
            label: "Trước khi mở Gemini, chị Hà tự xác định rõ 3 mảnh: S · Hoàn cảnh (xem hợp đồng 12 trang), C · Cái khó (nhưng vốn chỉ đủ 10 tháng), Q · Câu hỏi (nghỉ ở tháng 10 mất bao nhiêu tiền?).",
            col: 0,
            why: "Chuẩn D1 (Mình nghĩ trước): dùng bộ 3 S (Situation · Hoàn cảnh) – C (Complication · Cái khó) – Q (Question · Câu hỏi) làm mỏ neo."
          },
          {
            label: "Anh Tuấn quăng tệp hợp đồng 12 trang vào AI nhắn: “Đọc hết rồi quyết định luôn giúp tôi xem chiều nay 3h có nên ký không nhé!”",
            col: 3,
            why: "Sai vai! Giao trắng quyền phán đoán và chịu trách nhiệm tài chính cho máy là rơi thẳng vào vòng lặp lệ thuộc AI."
          },
          {
            label: "Trong câu lệnh, chị Hà dặn Gemini: “Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.”",
            col: 1,
            why: "Chuẩn D2 (AI làm cùng): giao AI dò 12 trang kèm số trang, soi điểm mù dễ sót và gợi mở hướng đàm phán."
          },
          {
            label: "Thấy bảng tóm tắt của AI trình bày đẹp mắt, anh Nam yên tâm mang hợp đồng đi ký cọc luôn mà không mở tệp PDF gốc ra xem lại.",
            col: 3,
            why: "Sai vai! Bị “rác bóng bẩy” đánh lừa, bỏ qua hoàn toàn bước thẩm định nguyên văn trên bản gốc."
          },
          {
            label: "Khi AI báo tổng thiệt hại 197,5 triệu nằm ở Trang 3, Trang 4 và Phụ lục Trang 12, chị Hà mở tệp PDF gốc lật đúng các trang đó đọc kiểm lại từng con số.",
            col: 2,
            why: "Chuẩn D3 (Mình kiểm cuối): dùng số trang AI trích dẫn để tự mắt kiểm chứng trên tài liệu gốc."
          },
          {
            label: "Đối chiếu bản gốc xong, chị Hà tự chốt phương án (chữ A – Answer): nhắn chủ nhà xin đàm phán sửa điều khoản khấu hao thiết bị trước khi đặt bút ký.",
            col: 2,
            why: "Chuẩn D4 (Mình kiểm cuối & Chốt A): AI chỉ nháp, còn câu trả lời chốt cuối cùng thuộc về bạn."
          }
        ],
        cardsStudent: [
          {
            label: "Trước khi hỏi AI, nhóm 8A2 tự ghi rõ 3 mảnh: S · Hoàn cảnh (viết kịch 3 phút về Trần Quốc Toản), C · Cái khó (nhưng thầy bắt cảnh chính chỉ dùng chính sử), Q · Câu hỏi (chi tiết nào diễn chính, chi tiết nào tách riêng?).",
            col: 0,
            why: "Chuẩn D1 (Mình nghĩ trước): dùng bộ 3 S (Situation · Hoàn cảnh) – C (Complication · Cái khó) – Q (Question · Câu hỏi) trước khi đụng vào AI."
          },
          {
            label: "Vừa nhận tệp tư liệu thầy Hùng gửi trong nhóm lớp, bạn Huy không mở tệp mà nhắn AI: “Viết luôn kịch bản 3 phút thật xúc động để thứ Hai nhóm mình diễn nhé!”",
            col: 3,
            why: "Sai vai! Giao trắng việc làm bài cho AI, bỏ qua cái khó của đề bài nên rất dễ trộn tiểu thuyết vào chính sử."
          },
          {
            label: "Nhóm dặn Gemini: “Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.”",
            col: 1,
            why: "Chuẩn D2 (AI làm cùng): giao AI kẻ bảng kèm số trang, soi điểm mù (Trần Kiện, tuổi 1282–1285) và gợi mở bố cục kịch."
          },
          {
            label: "Thấy AI viết sẵn lời thoại vua Trần Nhân Tông ban quả cam nghe rất hay, nhóm chép nguyên xi mang lên lớp diễn mà không dò lại tập tư liệu.",
            col: 3,
            why: "Sai vai! Rơi vào bẫy “vui giả”: lời văn mượt mà nhưng sai tiêu chí chấm điểm ở Trang 11."
          },
          {
            label: "Nhìn số trang Gemini trích dẫn, cả nhóm mở tệp PDF của thầy lật đúng Trang 3, Trang 4, Trang 8 và Trang 11 đọc đối chiếu lại từng dòng.",
            col: 2,
            why: "Chuẩn D3 (Mình kiểm cuối): kiểm chứng tận mắt trên tư liệu gốc thay vì tin mù quáng."
          },
          {
            label: "Kiểm tra xong, cả nhóm tự chốt kịch bản (chữ A – Answer): 2 phút đầu diễn cảnh Bình Than theo chính sử, 1 phút cuối tách riêng lời bình văn học.",
            col: 2,
            why: "Chuẩn D4 (Mình kiểm cuối & Chốt A): chính nhóm hiểu bài, tự chốt phương án và tự tin bảo vệ bài trước lớp."
          }
        ]
      },

      // ==================== ACTIVITY 2 (STEP 4): S vs C DISCRIMINATION + MISSING PIECE QUIZ ====================
      {
        id: "act-quiz",
        kind: "quiz",
        spineActive: [0, 1],
        showScqLegend: true,
        phase: "Trụ cột 2 · Nhớ sâu S – C – Q không học vẹt · 5 phút",
        title: "Bài tập 2: Phân biệt S – C – Q & Bắt bệnh câu lệnh khuyết mảnh",
        lead: "Đừng học vẹt chữ viết tắt — hãy nắm 3 từ khóa báo hiệu (“Mình đang…” / “…nhưng…” / “Mình cần biết…?”) và phép thử chữ C: “Bỏ đoạn này đi, AI có trả lời khác hẳn không?”.",
        questionsAdult: [
          {
            q: "Để nhớ công thức S – C – Q suốt đời mà không nhầm lẫn, bộ giải nghĩa và từ khóa báo hiệu nào dưới đây là CHÍNH XÁC nhất?",
            options: [
              "S = Summary (Tóm tắt) · C = Copy (Sao chép) · Q = Quick (Nhanh gọn).",
              "S = Situation · Hoàn cảnh (“Mình đang…”)  |  C = Complication · Cái khó (“…nhưng…”)  |  Q = Question · Câu hỏi (“Mình cần biết…?”).",
              "S = Search (Tìm kiếm) · C = Check (Kiểm tra) · Q = Quote (Trích dẫn).",
              "Ba chữ S – C – Q chỉ là ký hiệu ngẫu nhiên, không có nghĩa tiếng Anh hay tiếng Việt."
            ],
            answer: 1,
            explain:
              "Mẹo nhớ cực nhanh: S – Situation (Hoàn cảnh: “Mình đang…”), C – Complication (Cái khó: trùng âm đầu chữ C, luôn đi sau chữ “nhưng…”), Q – Question (Câu hỏi: “Mình cần biết…?”)."
          },
          {
            q: "Trong câu lệnh: “Mình đang xem hợp đồng thuê mặt bằng mở quán 12 trang, [nhưng vốn mình chỉ trụ được 10 tháng nếu vắng khách]. Mình cần biết: nghỉ ở tháng thứ 10 thì mất bao nhiêu tiền?”, phần đặt trong ngoặc vuông [...] thuộc chữ nào?",
            options: [
              "Chữ S — Situation (Hoàn cảnh), vì nó giới thiệu tên tài liệu.",
              "Chữ C — Complication (Cái khó), vì đi sau chữ “nhưng” và nếu bỏ đoạn “10 tháng vốn” này đi, AI sẽ không bao giờ biết để cộng chéo 3 khoản phạt nghỉ sớm!",
              "Chữ Q — Question (Câu hỏi), vì nó có chứa con số 10.",
              "Phần giao việc Trang – Sót – Bàn."
            ],
            answer: 1,
            explain:
              "Áp dụng đúng phép thử chữ C: Bỏ đoạn “nhưng vốn chỉ trụ được 10 tháng” đi là AI trả lời khác hẳn (chỉ liệt kê chung chung thay vì tính thiệt hại mốc tháng 10) → Đó chính là C · Complication (Cái khó)!"
          },
          {
            q: "Chị Lan gõ: “Mình đang xem hợp đồng thuê mặt bằng 12 trang. Mình cần biết: có điều khoản phạt nào đáng lưu ý không?”. Câu lệnh này đang THIẾU mảnh nào trong S – C – Q?",
            options: [
              "Thiếu S — Situation (Hoàn cảnh).",
              "Thiếu C — Complication (Cái khó riêng sau chữ “nhưng…”, ví dụ: vốn chỉ đủ 10 tháng hoặc cần được sang nhượng quán), khiến AI chỉ liệt kê bề mặt.",
              "Thiếu Q — Question (Câu hỏi).",
              "Không thiếu mảnh nào cả."
            ],
            answer: 1,
            explain:
              "Có S (“Mình đang xem hợp đồng…”) và có Q (“Mình cần biết…”), nhưng khuyết hẳn C — Complication (Cái khó riêng của chị Lan) nên AI không biết xoáy sâu vào rủi ro nào."
          },
          {
            q: "Anh Hoàng nhắn AI: “Mình đang đọc quy chế thưởng Tết 10 trang của công ty, nhưng đầu tháng 3 tới mình định xin nghỉ chuyển việc. Xem giúp mình nhé!”. Câu lệnh đã có S và C, nhưng thiếu mảnh nào?",
            options: [
              "Thiếu S — Situation (Hoàn cảnh).",
              "Thiếu C — Complication (Cái khó).",
              "Thiếu Q — Question (Câu hỏi cần chốt: “Mình cần biết nghỉ đầu tháng 3 có bị thu hồi thưởng Tết hay đền phí đào tạo không?”), làm AI dễ nhận xét lan man.",
              "Thiếu tên công ty."
            ],
            answer: 2,
            explain:
              "S (Hoàn cảnh) và C (Cái khó) dựng bối cảnh, còn Q — Question (Câu hỏi) khóa chặt đầu ra để AI giải quyết đúng quyết định bạn đang cân nhắc."
          },
          {
            q: "Sau khi ghép đủ S – C – Q, vì sao phần đuôi luôn dặn AI đủ 3 chữ “Trang – Sót – Bàn” (“trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé”)?",
            options: [
              "Chỉ để câu lệnh dài hơn cho đẹp mắt.",
              "“Kèm số TRANG” để mở bản gốc kiểm cuối (D3); “chỉ chỗ dễ SÓT” để soi điểm mù ngoài câu hỏi (như cấm sang nhượng ở Trang 2); “gợi ý & cùng BÀN” để AI làm cố vấn đối thoại (D2).",
              "Để AI chịu trách nhiệm đền tiền thay người ký hợp đồng.",
              "Để khỏi cần đọc lại bản PDF gốc."
            ],
            answer: 1,
            explain:
              "S – C – Q thực thi nhịp 1 (Mình nghĩ trước), còn Trang – Sót – Bàn thực thi nhịp 2 (AI làm cùng) và bắc cầu thẳng sang nhịp 3 (Mình kiểm cuối)!"
          }
        ],
        questionsStudent: [
          {
            q: "Để nhớ công thức S – C – Q suốt đời mà không nhầm lẫn, bộ giải nghĩa và từ khóa báo hiệu nào dưới đây là CHÍNH XÁC nhất?",
            options: [
              "S = Summary (Tóm tắt) · C = Copy (Chép bài) · Q = Quick (Làm nhanh).",
              "S = Situation · Hoàn cảnh (“Mình đang…”)  |  C = Complication · Cái khó (“…nhưng…”)  |  Q = Question · Câu hỏi (“Mình cần biết…?”).",
              "S = Story (Câu chuyện) · C = Character (Nhân vật) · Q = Quote (Câu nói).",
              "Ba chữ S – C – Q chỉ đặt cho vui, không có ý nghĩa cụ thể."
            ],
            answer: 1,
            explain:
              "Mẹo nhớ cực nhanh: S – Situation (Hoàn cảnh: “Mình đang…”), C – Complication (Cái khó: trùng âm đầu chữ C, luôn bắt đầu bằng chữ “nhưng…”), Q – Question (Câu hỏi: “Mình cần biết…?”)."
          },
          {
            q: "Trong câu lệnh của nhóm 8A2: “Mình đang viết kịch bản 3 phút về Trần Quốc Toản từ tư liệu thầy phát, [nhưng thầy bắt cảnh chính chỉ dùng chính sử còn chi tiết văn học phải tách riêng]. Mình cần biết: chi tiết nào đưa vào cảnh diễn, chi tiết nào tách riêng?”, đoạn trong ngoặc vuông [...] là chữ nào?",
            options: [
              "Chữ S — Situation (Hoàn cảnh), vì nhắc tới thầy giáo.",
              "Chữ C — Complication (Cái khó), vì đi sau chữ “nhưng” và nếu bỏ đoạn này đi, AI sẽ trộn lẫn tiểu thuyết vào kịch bản ngay!",
              "Chữ Q — Question (Câu hỏi), vì nói về cách chia cảnh.",
              "Phần kiểm tra trang gốc."
            ],
            answer: 1,
            explain:
              "Áp dụng đúng phép thử chữ C: Bỏ đoạn “nhưng thầy bắt cảnh chính chỉ dùng chính sử…” đi là AI trả lời khác hẳn (viết kịch lồng cảnh vua ban cam vào ngay) → Đó chính là C · Complication (Cái khó)!"
          },
          {
            q: "Bạn Mai gõ: “Mình đang viết kịch bản đóng vai 3 phút về Trần Quốc Toản từ tập tư liệu thầy phát. Mình cần biết: nên đưa những cảnh nào vào kịch bản cho hấp dẫn?”. Câu lệnh này đang THIẾU mảnh nào?",
            options: [
              "Thiếu S — Situation (Hoàn cảnh).",
              "Thiếu C — Complication (Cái khó của đề bài sau chữ “nhưng…”: cảnh chính chỉ được dùng chính sử, văn học phải tách riêng) — khiến AI dễ gợi ý cảnh tiểu thuyết vào kịch chính!",
              "Thiếu Q — Question (Câu hỏi).",
              "Câu lệnh đã đủ cả S – C – Q."
            ],
            answer: 1,
            explain:
              "Thiếu C — Complication (Cái khó ở tiêu chí chấm Trang 11), AI sẽ ưu tiên kịch tính truyền miệng thay vì giữ nghiêm ranh giới sử liệu."
          },
          {
            q: "Nhóm gõ: “Mình đang soạn kịch 3 phút từ tư liệu Trần Quốc Toản, nhưng thầy bắt cảnh chính chỉ dùng chính sử thôi. Giúp nhóm mình nhé!”. Đã có S và C, câu lệnh còn thiếu mảnh nào?",
            options: [
              "Thiếu S — Situation (Hoàn cảnh).",
              "Thiếu C — Complication (Cái khó).",
              "Thiếu Q — Question (Câu hỏi cụ thể: “Mình cần biết chi tiết nào đưa vào cảnh diễn chính, chi tiết nào phải tách sang lời bình?”) để AI kẻ ngay bảng phân loại 2 cột.",
              "Thiếu lời cảm ơn cuối câu."
            ],
            answer: 2,
            explain:
              "S (Hoàn cảnh) và C (Cái khó) cho AI biết luật chơi, còn Q — Question (Câu hỏi) chỉ đạo thẳng đầu ra để nhóm có bảng lọc dùng ngay."
          },
          {
            q: "Nhờ ghép S – C – Q với phần đuôi “Trang – Sót – Bàn” (“trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé”), nhóm 8A2 đã được AI soi thêm điểm mù nào?",
            options: [
              "AI tự đi diễn kịch trên lớp thay cả nhóm.",
              "AI chỉ ra nhân vật đối trọng Hoài Nhân vương Trần Kiện (Trang 4, 10) và bẫy nhầm tuổi năm 1282 vs 1285, kèm rõ số trang để nhóm mở PDF gốc kiểm chứng!",
              "AI xóa bớt 10 trang tư liệu cho ngắn.",
              "Không thay đổi gì so với hỏi tóm tắt."
            ],
            answer: 1,
            explain:
              "Đó là sức mạnh cộng hưởng của 4D × SCQ: Mình nghĩ trước (S–C–Q) → AI làm cùng soi điểm mù kèm trang (Trang–Sót–Bàn) → Mình kiểm trang gốc & tự chốt!"
          }
        ]
      },

      // ==================== ACTIVITY 3 (STEP 5): FADED SCAFFOLDING SCQ BUILDER ====================
      {
        id: "act-fill",
        kind: "fill",
        spineActive: [0, 1],
        showScqLegend: false,
        phase: "Thực hành Mình nghĩ trước (S–C–Q) + AI làm cùng · 5 phút",
        title: "Bài tập 3: Tự nhớ & Ghép câu lệnh “S – C – Q + Trang – Sót – Bàn”",
        lead: "Thử tự nhẩm trong đầu nghĩa của từng chữ S – C – Q trước khi bấm nút “💡 Nhắc nghĩa” trên mỗi ô, rồi điền vào tình huống mới bên dưới (hoặc tài liệu thật của bạn).",
        transferPromptAdult:
          "🎯 Tình huống mới để tập nghĩ S – C – Q: Công ty vừa gửi Quy chế thưởng Tết & cam kết đào tạo dày 10 trang. Đầu tháng 3 tới (ngay sau khi nhận thưởng Tết) bạn định xin nghỉ chuyển việc, nên rất sợ vướng điều khoản thu hồi thưởng hoặc đền phí đào tạo.",
        transferPromptStudent:
          "🎯 Tình huống mới để tập nghĩ S – C – Q: Cô Sinh học vừa phát tài liệu chuyên đề Di truyền dày 10 trang. Sáng mai kiểm tra 15 phút chỉ hỏi dạng bài sơ đồ phả hệ, mà tối nay bạn chỉ còn đúng 45 phút ôn bài.",
        fields: [
          {
            slot: "S",
            en: "Situation",
            vi: "Hoàn cảnh",
            signal: "Mình đang…",
            color: "blue",
            recallPrompt: "Thử tự nhẩm: Chữ S viết tắt của từ gì, nghĩa tiếng Việt là gì? (Bấm 💡 nếu cần nhắc)",
            hintAdult: "Ví dụ tình huống mới: đọc quy chế thưởng Tết và cam kết đào tạo 10 trang của công ty",
            hintStudent: "Ví dụ tình huống mới: ôn tài liệu chuyên đề Di truyền 10 trang cô Sinh vừa phát",
            sampleAdult: "đọc quy chế thưởng Tết và cam kết đào tạo 10 trang của công ty",
            sampleStudent: "ôn tài liệu chuyên đề Di truyền 10 trang cô Sinh vừa phát",
            videoAdult: "xem hợp đồng thuê mặt bằng mở quán 12 trang",
            videoStudent: "viết kịch bản đóng vai 3 phút về Trần Quốc Toản từ tập tư liệu thầy phát"
          },
          {
            slot: "C",
            en: "Complication",
            vi: "Cái khó",
            signal: "…nhưng…",
            color: "amber",
            recallPrompt: "Thử tự nhẩm: Chữ C trùng âm đầu với từ tiếng Việt nào, đi sau từ nối nào?",
            hintAdult: "Ví dụ tình huống mới: đầu tháng 3 tới mình định xin nghỉ việc ngay sau khi nhận thưởng Tết",
            hintStudent: "Ví dụ tình huống mới: sáng mai kiểm tra 15 phút phần sơ đồ phả hệ mà tối nay mình chỉ còn 45 phút ôn",
            sampleAdult: "đầu tháng 3 tới mình định xin nghỉ việc ngay sau khi nhận thưởng Tết",
            sampleStudent: "sáng mai kiểm tra 15 phút phần sơ đồ phả hệ mà tối nay mình chỉ còn 45 phút ôn",
            videoAdult: "vốn mình chỉ trụ được 10 tháng nếu vắng khách",
            videoStudent: "thầy bắt cảnh chính chỉ dùng chính sử còn chi tiết văn học phải tách riêng"
          },
          {
            slot: "Q",
            en: "Question",
            vi: "Câu hỏi",
            signal: "Mình cần biết…?",
            color: "mint",
            recallPrompt: "Thử tự nhẩm: Chữ Q khóa chặt điều gì ở cuối phần nghĩ trước?",
            hintAdult: "Ví dụ tình huống mới: nghỉ vào đầu tháng 3 thì có bị thu hồi thưởng Tết hay đền chi phí đào tạo không",
            hintStudent: "Ví dụ tình huống mới: trang nào nêu quy tắc giải nhanh phả hệ và lỗi nào dễ tính nhầm nhất",
            sampleAdult: "nghỉ vào đầu tháng 3 thì có bị thu hồi thưởng Tết hay đền chi phí đào tạo không",
            sampleStudent: "trang nào nêu quy tắc giải nhanh phả hệ và lỗi nào dễ tính nhầm nhất",
            videoAdult: "nếu nghỉ ở tháng thứ 10 thì tổng cộng mất bao nhiêu tiền",
            videoStudent: "chi tiết nào được đưa vào cảnh diễn, chi tiết nào phải tách riêng"
          }
        ],
        cTestNote:
          "🔍 Phép thử chữ C (Complication · Cái khó): Thử bỏ ô (C) đi — nếu lúc đó AI trả lời KHÁC HẲN so với khi giữ ô (C), nghĩa là bạn đã viết đúng “Cái khó” của riêng mình!",
        revealNote:
          "✓ Thuộc nằm lòng trọn đời: S (Situation · Hoàn cảnh: “Mình đang…”) — C (Complication · Cái khó: “…nhưng…”) — Q (Question · Câu hỏi: “Mình cần biết…?”) + TRANG – SÓT – BÀN!"
      },

      // ==================== ACTIVITY 4 (STEP 6): VERIFY SOURCE & UNLOCK "A - ANSWER" ====================
      {
        id: "act-write",
        kind: "write",
        spineActive: [2],
        showScqLegend: false,
        phase: "Thực hành Mình kiểm cuối (D3 & D4) · 5 phút",
        title: "Bài tập 4: Mở trang gốc bắt lỗi & Tự chốt chữ A (Answer)",
        lead: "Bản nháp giả lập bên dưới cố tình cài 1 chi tiết sai lệch so với PDF 12 trang. Hãy mở tệp PDF gốc bắt lỗi (D3) rồi tự chốt quyết định của bạn để mở khóa mảnh ghép cuối cùng: Chữ A!",
        verifyCaseAdult: {
          badge: "Bản nháp giả lập để tập thẩm định (Có cài 1 chỗ lệch số liệu)",
          aiDraft:
            "“Theo hợp đồng thuê mặt bằng 12 trang, nếu bạn trả quán ở tháng thứ 10: (1) Mất tiền cọc 75 triệu tại Điều 4, Trang 3; (2) Hoàn trả 100% gói hỗ trợ cải tạo 37,5 triệu tại Điều 5, Trang 4; (3) Phạt khấu hao thiết bị tại Phụ lục 02, Trang 12 là 50 triệu đồng và được trả góp trong 30 ngày.”",
          checkHint:
            "🔍 Mở PDF kiểm tra: Lật Điều 7.2 (Trang 7) và Phụ lục 02 (Trang 12) xem mức khấu hao khung tháng 7–12 thực sự là 50 triệu hay 85 triệu, và hạn thanh toán là 30 ngày hay 05 ngày làm việc!",
          sampleVerify:
            "Đã mở PDF gốc đối chiếu: Trang 3 (cọc 75tr) và Trang 4 (hoàn trả 37,5tr) đúng; NHƯNG Phụ lục 02 Trang 12 ghi rõ khung tháng 7–12 phạt khấu hao thiết bị 85 triệu đồng (không phải 50 triệu) và Điều 7.2 Trang 7 bắt thanh toán trong 05 ngày làm việc (không phải 30 ngày). Tổng mất thực tế là 197,5 triệu!",
          sampleDecision:
            "Mình tự chốt (Chữ A): Chưa đặt bút ký lúc 3h chiều nay; chủ động nhắn chủ nhà xin đàm phán tách gói thiết bị Phụ lục 02, xin phép được sang nhượng quán và hạ trần tăng giá năm hai xuống dưới 10%."
        },
        verifyCaseStudent: {
          badge: "Bản nháp giả lập để tập thẩm định (Có cài 1 chỗ lệch sử liệu)",
          aiDraft:
            "“Theo tập tư liệu Trần Quốc Toản 12 trang: (1) Sự kiện bóp nát quả cam diễn ra tại Hội nghị Bình Than năm 1282 ở Trang 3; (2) Chính sử Trang 4 chép Quốc Toản tự cầm cam bóp nát và viết 6 chữ lên cờ; (3) Chính sử Đại Việt sử ký toàn thư ở Trang 4 cũng ghi rõ Trần Quốc Toản anh dũng hy sinh ở tuổi 16 ngay tại trận Chương Dương năm 1285.”",
          checkHint:
            "🔍 Mở PDF kiểm tra: Lật đúng Trang 4 (trích đoạn Đại Việt sử ký toàn thư) và Trang 8 (Bảng đối chiếu) xem chính sử có ghi tuổi mất 16 và nguyên nhân hy sinh không!",
          sampleVerify:
            "Đã mở PDF gốc đối chiếu: Trang 3 (Bình Than 1282) và ý đầu Trang 4 đúng; NHƯNG ý số (3) sai! Trang 4 và Trang 8 ghi rõ chính sử KHÔNG chép năm mất hay nguyên nhân mất (năm 1285 ông đã khoảng 18–19 tuổi); chi tiết hy sinh tuổi 16 là sáng tạo văn học của Nguyễn Huy Tưởng.",
          sampleDecision:
            "Nhóm tự chốt (Chữ A): 2 phút đầu diễn cảnh Bình Than 1282 đối thoại với Hoài Nhân vương Trần Kiện đúng chính sử Trang 4; 1 phút cuối người dẫn chuyện tách riêng lời bình tôn vinh chi tiết quả cam vua ban, lá cờ mẹ thêu và hình tượng tuổi 16 trong văn học."
        },
        fields: [
          {
            label: "1. Kết quả thẩm định trang gốc (D3 — Chi tiết nào đúng, chi tiết nào bị lệch khi bạn tự mở PDF 12 trang đối chiếu?):",
            placeholderAdult:
              "Ví dụ: Mở Phụ lục 02 Trang 12 và Điều 7.2 Trang 7 thấy mức khấu hao thực tế là 85 triệu (không phải 50 triệu) và phải nộp trong 05 ngày làm việc...",
            placeholderStudent:
              "Ví dụ: Mở Trang 4 và Trang 8 thấy chính sử không ghi hy sinh tuổi 16 ở Chương Dương; chi tiết hy sinh tuổi 16 nằm ở cột Văn học Trang 8..."
          },
          {
            label: "2. Chữ A — Answer (Quyết định cuối cùng do chính bạn tự chốt sau khi đã kiểm trang gốc):",
            placeholderAdult:
              "Ví dụ: Mình chốt chưa ký vội chiều nay; đề nghị chủ nhà bỏ khoản phạt thiết bị Phụ lục 02 và cho phép sang nhượng...",
            placeholderStudent:
              "Ví dụ: Nhóm chốt 2 phút đầu diễn chính sử Bình Than 1282 (Trang 3–4), 1 phút cuối tách riêng lời bình văn học (Trang 8)..."
          }
        ],
        unlockAnswerNote:
          "🎁 Đã mở khóa mảnh ghép cuối: Chữ A — Answer (Câu trả lời chốt)! S · C · Q là phần Mình nghĩ trước, AI làm cùng ra bản nháp, còn chữ A luôn là quyết định do chính Mình kiểm cuối & Tự chốt!",
        checklist: [
          "D1 · Mình nghĩ trước (S–C–Q): Đã nắm rõ S · Situation (Hoàn cảnh), C · Complication (Cái khó), Q · Question (Câu hỏi).",
          "D2 · AI làm cùng (Trang–Sót–Bàn): Đã yêu cầu AI trích rõ số trang, chỉ điểm mù dễ sót và gợi ý hướng thảo luận.",
          "D3 · Mình kiểm cuối (Mở trang gốc): Đã tự tay mở đúng trang trên tệp PDF gốc để kiểm chứng từng chi tiết.",
          "D4 · Tự chốt chữ A (Answer): Chính mình hiểu rõ và chịu trách nhiệm quyết định cuối (không tải CCCD/dữ liệu mật lên mạng)."
        ]
      }
    ],

    caseFiles: [
      {
        id: "cf-lease",
        forScenario: "adult",
        title: "Hồ sơ mẫu 1 · Hợp đồng thuê mặt bằng kinh doanh (12 trang)",
        meta: "Dành cho Người lớn · Gồm cấm sang nhượng (Trang 2), tiền cọc (Trang 3), hỗ trợ sửa quán (Trang 4), hạn phạt 05 ngày (Trang 7) & khấu hao thiết bị (Trang 12).",
        fileHref: "tai-lieu/Hop-dong-Thue-mat-bang-Mau-12-trang.pdf",
        answerSummary:
          "Bẫy ngầm khi trả mặt bằng ở tháng thứ 10: (1) Mất cọc 75 triệu (Điều 4, Trang 3); (2) Hoàn trả 37,5 triệu gói hỗ trợ cải tạo mặt bằng (Điều 5, Trang 4); (3) Thanh toán 85 triệu khấu hao thiết bị khung tháng 7–12 (Phụ lục 02, Trang 12) → Tổng thiệt hại 197,5 triệu đồng, buộc quyết toán trong 05 ngày làm việc (Trang 7) và cấm tự ý sang nhượng (Trang 2)."
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
        "Đem S – C – Q + Trang – Sót – Bàn áp vào 1 tài liệu thật của bạn trên Gemini, tự mở trang gốc kiểm lại, rồi viết 4F ngay bên dưới để buổi sau xem lại.",
      taskStudent:
        "Đem S – C – Q + Trang – Sót – Bàn áp vào 1 đề cương hoặc tư liệu môn học thật trên Gemini, tự mở trang gốc dò lại, rồi viết 4F ngay bên dưới để buổi sau trao đổi.",
      leadNote:
        "Gập bài học lại rồi gõ thẳng vào từng mục — gõ tới mục nào chữ ví dụ mờ của mục đó sẽ tự biến mất:",
      zones: [
        {
          key: "facts",
          title: "1. Facts",
          cue: "Đã nghe gì từ bài & đã tự làm gì (tài liệu thật, câu lệnh đã gõ, trang gốc đã mở)?",
          ghost:
            "🍳 VD (chuyện học rán trứng): Xem clip dạy lửa nhỏ, cuộn lúc mặt trứng còn ướt.\n- Tối vào bếp rán thử 2 mẻ trên chảo mỏng: mẻ 1 để lửa vừa bị cháy xém & gãy đôi; mẻ 2 hạ nhỏ lửa thì cuộn được.",
          rows: 3
        },
        {
          key: "feelings",
          title: "2. Feelings",
          cue: "Lúc học và lúc tự làm thấy sao — vì sao? (thành thật với mình, không ai chấm)",
          ghost:
            "🍳 VD: Lúc xem clip thấy chủ quan vì nhìn đầu bếp lật nhẹ tênh tưởng dễ.\n- Lúc mẻ đầu cháy khét thì vừa quê vừa cay cú; tới mẻ 2 lành lặn mới thở phào.",
          rows: 2
        },
        {
          key: "findings",
          title: "3. Findings",
          cue: "Tưởng vậy, hóa ra…? (điều trước khi học & tự tay làm bạn chưa nhận ra)",
          ghost:
            "🍳 VD: Xem người khác làm mượt rất dễ tưởng mình đã biết làm.\n- Tưởng rách do tay lật vụng, hóa ra chảo mỏng ở nhà nóng gắt hơn bếp từ trong clip; chi tiết thử nhiệt đầu đũa clip có nói mà mình nghe lướt.",
          rows: 3
        },
        {
          key: "future",
          title: "4. Future",
          cue: "Lần tới làm việc nhỏ nào (tài liệu gì, khi nào) hoặc còn câu hỏi nào thắc mắc?",
          ghost:
            "🍳 VD: [ ] Sáng thứ Bảy rán lại: thử đầu đũa trước khi đổ trứng và nhấc chảo khỏi bếp 10 giây lúc cuộn.\n- [ ] Tìm hiểu xem pha thêm 1 thìa sữa tươi có giúp trứng đỡ khô nhanh không.",
          rows: 2
        }
      ]
    }
  };
})();
