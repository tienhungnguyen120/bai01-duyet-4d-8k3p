(() => {
  const PROMPT_TAIL =
    "Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.";

  window.LESSON_01_DATA = {
    courseTitle: "Giáo trình Tư duy & Làm chủ AI",
    lessonCode: "BÀI 01",
    lessonTitle: "Tóm tắt tài liệu dài cùng Gemini",
    lessonLead:
      "Kết hợp hai trụ cột cốt lõi: Quy luật Tư duy 4D (Mình nghĩ trước – AI làm cùng – Mình kiểm cuối) và Khuôn nghĩ trước S – C – Q.",
    promptTail: PROMPT_TAIL,

    spinePillars: [
      {
        step: "1. Mình nghĩ trước",
        sub: "D1 · Khuôn S – C – Q"
      },
      {
        step: "2. AI làm cùng",
        sub: "D2 · Trang – Sót – Bàn"
      },
      {
        step: "3. Mình kiểm cuối",
        sub: "D3–D4 · Mở trang gốc & Tự chốt"
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
        desc: "Thực chiến nối 3 trang hợp đồng rời rạc trên màn hình Gemini thật bằng khuôn S – C – Q + Trang – Sót – Bàn.",
        duration: "01:36",
        journeyMeta: "2 video ngắn · 4 bài tập 4D × SCQ",
        videoSrc: "media/tinh-huong-1-hop-dong.mp4",
        posterSrc: "media/poster-hop-dong.jpg",
        segments: [
          {
            time: 2.35,
            ts: "00:02",
            label: "Tin nhắn giục ký & giới hạn vốn 10 tháng",
            text: "Chủ nhà vừa nhắn: “Chiều nay 3 giờ qua ký cọc luôn nhé em!”, kèm bản hợp đồng thuê mặt bằng dài 12 trang. Mà vốn trong tay bạn chỉ đủ cầm cự 10 tháng."
          },
          {
            time: 12.15,
            ts: "00:12",
            label: "Ba điều khoản rải rác nối thành bẫy gần 200 triệu",
            text: "Trải hợp đồng ra bàn: Trang 3 ghi đặt cọc 75 triệu. Trang 4 ghi chủ nhà hỗ trợ 37,5 triệu sửa quán — nghỉ sớm phải hoàn lại 100%. Lật tới tận Phụ lục Trang 12 mới thấy thêm phạt khấu hao thiết bị 85 triệu. Cộng ba trang đó lại, nếu tháng thứ 10 vắng khách phải trả quán, bạn mất trắng gần 200 triệu đồng!"
          },
          {
            time: 31.35,
            ts: "00:31",
            label: "Vì sao câu lệnh “Tóm tắt thành bảng” không cứu được bạn?",
            text: "Thế nhưng khi nhờ AI “Tóm tắt hợp đồng này thành bảng”, nó chỉ chép đúng từng khoản riêng lẻ chứ không cộng giúp bạn con số 200 triệu kia — vì bạn chỉ bảo nó tóm tắt, chứ chưa kể hoàn cảnh 10 tháng của mình."
          },
          {
            time: 40.25,
            ts: "00:40",
            label: "Gửi tệp lên Gemini & Ghép câu lệnh bỏ túi SCQ + Trang – Sót – Bàn",
            text: "Hãy mở Gemini, bấm dấu + chọn Files tải hợp đồng lên, rồi ghép đúng câu lệnh bỏ túi: “[S] Mình đang xem hợp đồng thuê mặt bằng mở quán 12 trang, [C] nhưng vốn mình chỉ trụ được 10 tháng nếu vắng khách. [Q] Mình cần biết: nếu nghỉ ở tháng thứ 10 thì tổng cộng mất bao nhiêu tiền? Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.”"
          },
          {
            time: 61.95,
            ts: "01:02",
            label: "Kết quả thật từ Gemini: Cộng chéo 197,5 triệu & Chỉ bẫy dễ sót",
            text: "Nhìn kết quả thật Gemini trả về: ngay dòng đầu, AI chốt thẳng rủi ro rất cao, rồi tự nối Trang 3, Trang 4 và Trang 12 ra đúng tổng thiệt hại 197.500.000 đồng. Chưa hết, nó chỉ ra điểm dễ sót ở Trang 2 — giá thuê năm hai tăng vọt 18%, gợi ý 3 điểm cần đàm phán sửa hợp đồng và hỏi lại để bàn tiếp cùng bạn."
          },
          {
            time: 81.4,
            ts: "01:21",
            label: "Mở trang gốc kiểm chứng & Quy tắc vàng",
            text: "Cuối cùng, bạn mở đúng Trang 3, 4, 7 và 12 trên bản gốc để tự đọc kiểm lại từng con số. Hãy nhớ: Hỏi tóm tắt chỉ biết hợp đồng viết gì; kể hoàn cảnh mới biết túi tiền của bạn mất gì. AI nháp — mình kiểm — mình chốt!"
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
        desc: "Thực chiến lọc chính sử Đại Việt sử ký toàn thư và chi tiết văn học trên màn hình Gemini thật bằng khuôn S – C – Q.",
        duration: "01:55",
        journeyMeta: "2 video ngắn · 4 bài tập 4D × SCQ",
        videoSrc: "media/tinh-huong-2-lich-su.mp4",
        posterSrc: "media/poster-lich-su.jpg",
        segments: [
          {
            time: 2.35,
            ts: "00:02",
            label: "Tin nhắn nhóm lớp 8A2 mãi đỉnh ❤️ & Đề bài của thầy",
            text: "Thầy dạy Sử vừa gửi vào nhóm lớp “8A2 mãi đỉnh ❤️” tệp tư liệu dày 12 trang về Trần Quốc Toản, dặn thứ Hai diễn kịch 3 phút. Nhưng thầy bắt buộc: cảnh chính chỉ dùng chính sử, còn chi tiết văn học phải tách riêng."
          },
          {
            time: 13.5,
            ts: "00:13",
            label: "Ba trang tư liệu vạch ranh giới Chính sử và Tiểu thuyết",
            text: "Trải tư liệu ra bàn: Trang 3 ghi sự kiện diễn ra ở Hội nghị Bình Than năm 1282. Trang 4, chính sử Đại Việt sử ký toàn thư chỉ chép Quốc Toản tự cầm cam bóp nát và viết sáu chữ lên cờ. Còn Trang 8 chỉ rõ cảnh vua ban cam quý và mẹ thêu cờ vàng là tiểu thuyết. Nếu quen miệng diễn cảnh Diên Hồng hay vua bước ra ban cam là dính ngay 2 lỗi sai trước lớp!"
          },
          {
            time: 36.66,
            ts: "00:36",
            label: "Vì sao bảng tóm tắt chung chung không vạch ranh giới kịch?",
            text: "Thế nhưng khi nhờ AI “Tóm tắt tập tư liệu này thành bảng”, nó chép đủ từng phần mà không hề vạch ranh giới cho vở kịch — vì bạn chỉ bảo nó tóm tắt, chứ chưa kể yêu cầu gắt gao của thầy."
          },
          {
            time: 45.78,
            ts: "00:45",
            label: "Gửi tệp lên Gemini & Ghép câu lệnh bỏ túi SCQ + Trang – Sót – Bàn",
            text: "Hãy mở Gemini, bấm dấu + gửi tệp tư liệu lên, rồi ghép đúng câu lệnh bỏ túi: “[S] Mình đang viết kịch bản đóng vai 3 phút về Trần Quốc Toản từ tập tư liệu thầy phát, [C] nhưng thầy bắt cảnh chính chỉ dùng chính sử còn chi tiết văn học phải tách riêng. [Q] Mình cần biết: chi tiết nào được đưa vào cảnh diễn, chi tiết nào phải tách riêng? Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé.”"
          },
          {
            time: 74.32,
            ts: "01:14",
            label: "Kết quả thật từ Gemini: Bảng tách 2 cột & Điểm mù Trần Kiện",
            text: "Nhìn kết quả thật Gemini trả về: ngay mục đầu, AI kẻ bảng tách rạch ròi cảnh diễn chính sử ở Trang 3, Trang 4 với phần lời bình văn học ở Trang 8. Ngay bên dưới, nó chỉ ra điểm mù cực dễ sót: nhân vật đối trọng Trần Kiện ở Trang 4 và Trang 10, cùng bẫy nhầm tuổi giữa năm 1282 và 1285; rồi gợi ý sẵn bố cục kịch 3 phút kèm câu hỏi thảo luận tiếp."
          },
          {
            time: 98.33,
            ts: "01:38",
            label: "Mở trang gốc kiểm lại & Quy tắc vàng",
            text: "Cuối cùng, bạn mở đúng Trang 3, 4, 8 và 11 trên bản gốc để tự đọc kiểm lại từng dòng. Hãy nhớ: Hỏi tóm tắt chỉ biết tư liệu viết gì; kể hoàn cảnh mới biết dùng được gì cho bài của bạn. AI nháp — mình kiểm — mình chốt!"
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
        desc: "Tự xác định Việc đang làm (S), Ràng buộc khó (C) và Câu hỏi mấu chốt (Q) trước; phần đọc dài và dò chi tiết mới giao cho AI."
      },
      {
        code: "D2 · Description",
        title: "Mô tả & Đối thoại (AI làm cùng: Trang – Sót – Bàn)",
        desc: "Giao rõ 3 việc cho AI: trả lời kèm số trang, chỉ thêm góc khuất dễ sót, rồi gợi ý hướng giải quyết và bàn tiếp cùng mình."
      },
      {
        code: "D3 · Discernment",
        title: "Thẩm định (Đối chiếu trang gốc)",
        desc: "Không tin độ mượt của câu chữ. Luôn mở đúng số trang, số điều trong bản gốc để đọc kiểm lại bằng mắt."
      },
      {
        code: "D4 · Diligence",
        title: "Trách nhiệm (Mình chốt cuối)",
        desc: "AI chỉ đưa bản nháp; chính mình mới là người hiểu rõ, tự ra quyết định và chịu trách nhiệm cuối cùng."
      }
    ],

    activities: [
      // ==================== ACTIVITY 1 (STEP 3): 4D ROLE SORT ====================
      {
        id: "act-sort",
        kind: "sort",
        spineActive: [0, 1, 2],
        phase: "Trụ cột 1 · Quy luật 4D · 4 phút",
        title: "Bài tập 1: Chia việc đúng vai theo Quy luật 4D",
        lead: "Quy luật 4D gói gọn trong 3 nhịp “Mình nghĩ trước — AI làm cùng — Mình kiểm cuối”. Hãy xếp mỗi hành động dưới đây vào đúng vai của nó.",
        columns: [
          "1. Mình nghĩ trước (S–C–Q)",
          "2. AI làm cùng (Trang–Sót–Bàn)",
          "3. Mình kiểm cuối (Mở trang & Chốt)",
          "✕ Sai vai (Giao trắng cho AI)"
        ],
        cardsAdult: [
          {
            label: "Trước khi mở Gemini, chị Hà tự gạch rõ: đang xem hợp đồng thuê quán 12 trang (S), vốn chỉ trụ được 10 tháng (C), cần tính tổng tiền mất nếu nghỉ ở tháng 10 (Q).",
            col: 0,
            why: "Đây chính là D1 (Mình nghĩ trước): dùng khuôn S – C – Q để khóa chặt hoàn cảnh và câu hỏi riêng của mình."
          },
          {
            label: "Anh Tuấn quăng tệp hợp đồng 12 trang vào AI nhắn: “Đọc hết rồi quyết định luôn giúp tôi xem chiều nay 3h có nên ký không nhé!”",
            col: 3,
            why: "Giao trắng quyền phán đoán và chịu trách nhiệm tài chính cho máy là rơi thẳng vào vòng lặp lệ thuộc AI."
          },
          {
            label: "Trong câu lệnh, chị Hà dặn Gemini: “Đọc hết tài liệu, trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng đàm phán và thảo luận cùng mình nhé.”",
            col: 1,
            why: "Đây là D2 (AI làm cùng): biến AI thành người dò tài liệu có trích dẫn trang và soi điểm mù để bàn tiếp cùng mình."
          },
          {
            label: "Thấy bảng tóm tắt của AI trình bày đẹp mắt, anh Nam yên tâm mang hợp đồng đi ký cọc luôn mà không mở tệp PDF gốc ra xem lại.",
            col: 3,
            why: "Bị “rác bóng bẩy” đánh lừa, bỏ qua hoàn toàn bước thẩm định nguyên văn trên bản gốc."
          },
          {
            label: "Khi AI báo tổng thiệt hại 197,5 triệu nằm ở Trang 3, Trang 4 và Phụ lục Trang 12, chị Hà mở tệp PDF gốc lật đúng ba trang đó đọc kiểm lại từng con số.",
            col: 2,
            why: "Chuẩn D3 (Thẩm định ở nhịp Mình kiểm cuối): dùng số trang AI chỉ để tự mắt kiểm chứng trên tài liệu gốc."
          },
          {
            label: "Sau khi đối chiếu bản gốc đúng thực tế, chị Hà tự chốt phương án: nhắn chủ nhà xin đàm phán sửa điều khoản phạt thiết bị trước khi đặt bút ký.",
            col: 2,
            why: "Chuẩn D4 (Trách nhiệm ở nhịp Mình kiểm cuối): AI nháp, còn quyết định đàm phán hay ký là do chính mình chốt."
          }
        ],
        cardsStudent: [
          {
            label: "Trước khi hỏi AI, nhóm 8A2 tự ghi rõ: đang viết kịch 3 phút về Trần Quốc Toản (S), thầy bắt cảnh chính chỉ dùng chính sử (C), cần tách rõ chi tiết diễn và lời bình (Q).",
            col: 0,
            why: "Đây chính là D1 (Mình nghĩ trước): dùng khuôn S – C – Q để nắm chắc yêu cầu đề bài trước khi dùng công cụ."
          },
          {
            label: "Vừa nhận tệp tư liệu thầy Hùng gửi trong nhóm lớp, bạn Huy không mở tệp mà nhắn AI: “Viết luôn kịch bản 3 phút thật xúc động để thứ Hai nhóm mình diễn nhé!”",
            col: 3,
            why: "Giao trắng việc làm bài cho AI, bỏ qua đề bài của thầy nên rất dễ trộn tiểu thuyết vào chính sử."
          },
          {
            label: "Nhóm dặn Gemini: “Đọc hết tập tư liệu, kẻ bảng kèm số trang, chỉ thêm chỗ nhóm dễ sót, rồi gợi ý bố cục 3 phút và thảo luận cùng nhóm nhé.”",
            col: 1,
            why: "Đây là D2 (AI làm cùng): giao cho AI dò 12 trang kèm số trang, soi điểm mù (như Trần Kiện, tuổi 1282–1285) và gợi mở dàn ý."
          },
          {
            label: "Thấy AI viết sẵn lời thoại vua Trần Nhân Tông ban quả cam nghe rất hay, nhóm chép nguyên xi mang lên lớp diễn mà không dò lại tập tư liệu.",
            col: 3,
            why: "Rơi vào bẫy “vui giả”: kịch bản nghe xuôi tai nhưng sai tiêu chí ranh giới sử liệu ở Trang 11."
          },
          {
            label: "Nhìn số trang Gemini trích dẫn, cả nhóm mở tệp PDF của thầy lật đúng Trang 3, Trang 4, Trang 8 và Trang 11 đọc đối chiếu lại từng dòng.",
            col: 2,
            why: "Chuẩn D3 (Thẩm định ở nhịp Mình kiểm cuối): kiểm chứng tận mắt trên tư liệu gốc thay vì tin mù quáng."
          },
          {
            label: "Kiểm tra xong, cả nhóm tự chốt kịch bản: 2 phút đầu diễn cảnh Bình Than theo chính sử, 1 phút cuối người dẫn chuyện tách riêng lời bình văn học.",
            col: 2,
            why: "Chuẩn D4 (Trách nhiệm ở nhịp Mình kiểm cuối): chính nhóm hiểu bài, tự chốt kịch bản và tự tin trả lời thầy trước lớp."
          }
        ]
      },

      // ==================== ACTIVITY 2 (STEP 4): DIAGNOSE MISSING S - C - Q ====================
      {
        id: "act-quiz",
        kind: "quiz",
        spineActive: [0, 1],
        phase: "Trụ cột 2 · Khuôn nghĩ trước S – C – Q · 4 phút",
        title: "Bài tập 2: Khi “Mình nghĩ trước”, câu lệnh khuyết mảnh nào trong S – C – Q?",
        lead: "Muốn “Mình nghĩ trước” không bị chung chung, ta nghĩ theo 3 mảnh S (Đang làm gì) – C (Ràng buộc khó) – Q (Câu hỏi cần chốt). Hãy bắt bệnh 4 câu lệnh dưới đây.",
        questionsAdult: [
          {
            q: "Anh Minh tải hợp đồng thuê mặt bằng 12 trang lên Gemini và chỉ gõ: “Tóm tắt hợp đồng này thành bảng giúp mình”. Vì sao bảng tóm tắt đúng từng chữ mà anh Minh vẫn suýt mất gần 200 triệu?",
            options: [
              "Vì Gemini bản miễn phí không đọc được các trang phụ lục ở cuối tệp PDF.",
              "Vì câu lệnh khuyết cả S – C – Q: AI không biết anh sắp thuê quán với vốn 10 tháng nên chỉ chép từng điều khoản rời rạc, không tự cộng chéo các khoản phạt nghỉ sớm.",
              "Vì anh Minh chưa yêu cầu AI dịch hợp đồng sang tiếng Anh.",
              "Vì bảng tóm tắt của AI luôn cố tình ẩn các con số tiền phạt."
            ],
            answer: 1,
            explain:
              "Khi thiếu hẳn S – C – Q, AI chỉ làm người chép lại bề mặt tài liệu (“hợp đồng viết gì”), không thể tính tác động lên túi tiền riêng của bạn."
          },
          {
            q: "Chị Lan gõ câu lệnh: “Mình đang xem hợp đồng thuê mặt bằng 12 trang. Mình cần biết: có điều khoản phạt nào đáng lưu ý không?”. So với khuôn S – C – Q, câu lệnh này đang KHUYẾT mảnh nào quan trọng nhất?",
            options: [
              "Khuyết chữ S (Chưa nói mình đang xem tài liệu gì).",
              "Khuyết chữ C (Chưa nêu giới hạn riêng: vốn chỉ trụ được 10 tháng nếu vắng khách) — khiến AI liệt kê chung chung thay vì tính thẳng kịch bản nghỉ ở tháng thứ 10.",
              "Khuyết chữ Q (Chưa có câu hỏi nào ở cuối câu).",
              "Không khuyết mảnh nào cả, câu lệnh đã hoàn hảo."
            ],
            answer: 1,
            explain:
              "Chữ C (Complication — cái khó, giới hạn riêng của bạn) chính là chiếc kính lúp giúp AI biết phải nối điều khoản nào với điều khoản nào."
          },
          {
            q: "Anh Hoàng nhắn AI: “Mình đang xem quy chế thưởng Tết 10 trang của công ty, nhưng đầu tháng 3 tới mình định xin nghỉ chuyển việc. Xem giúp mình nhé!”. Câu lệnh đã có S và C, nhưng thiếu chữ Q sẽ dẫn tới kết quả gì?",
            options: [
              "AI từ chối trả lời vì câu lệnh không có dấu chấm hỏi.",
              "AI hiểu bối cảnh nhưng dễ nhận xét lan man; thêm rõ chữ Q (“Mình cần biết: nghỉ đầu tháng 3 có bị thu hồi thưởng Tết hay đền chi phí đào tạo không?”) mới khóa đúng quyết định cần chốt.",
              "AI tự động xóa tệp PDF sau 1 lần đọc.",
              "Thiếu chữ Q làm AI đọc nhầm số trang."
            ],
            answer: 1,
            explain:
              "S và C dựng bối cảnh, còn chữ Q (Question) khóa mục tiêu đầu ra để AI trả lời trúng ngay bài toán bạn cần quyết định."
          },
          {
            q: "Sau khi ghép đủ S – C – Q, vì sao phần đuôi câu lệnh bỏ túi luôn dặn AI đủ 3 ý: “trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé”?",
            options: [
              "Chỉ để câu lệnh dài hơn thì AI mới chịu đọc hết 12 trang.",
              "“Kèm số trang” để mình mở bản gốc kiểm cuối (D3); “chỉ chỗ dễ sót” để soi điểm mù ngoài câu hỏi ban đầu (như giá thuê năm 2 tăng 18%); “gợi ý & thảo luận” để AI làm cố vấn bàn tiếp cùng mình (D2).",
              "Để AI tự chịu trách nhiệm pháp lý thay cho người ký hợp đồng.",
              "Để không bao giờ phải mở tệp PDF gốc ra đọc nữa."
            ],
            answer: 1,
            explain:
              "3 chữ “Trang – Sót – Bàn” nối liền mạch từ Mình nghĩ trước (SCQ) sang AI làm cùng (D2) và mở đường cho Mình kiểm cuối (D3–D4)."
          }
        ],
        questionsStudent: [
          {
            q: "Nhận tệp tư liệu Trần Quốc Toản 12 trang của thầy, bạn Nam tải lên Gemini và gõ: “Tóm tắt tập tư liệu này thành bảng”. Vì sao bảng tóm tắt rất đầy đủ mà nhóm Nam vẫn dễ mất điểm khi dựng kịch?",
            options: [
              "Vì Gemini không đọc được chữ tiếng Việt có dấu trong tệp lịch sử.",
              "Vì câu lệnh khuyết cả S – C – Q: AI chỉ tóm tắt tuần tự từng chương chứ không biết nhóm đang dựng kịch 3 phút với ràng buộc tách riêng chính sử và văn học.",
              "Vì bạn Nam chưa bảo AI viết dài đủ 10 trang.",
              "Vì AI luôn ghét môn Lịch sử."
            ],
            answer: 1,
            explain:
              "Hỏi “Tóm tắt” không kèm S – C – Q chỉ cho biết tư liệu có những mục nào, không giúp lọc chi tiết nào được đưa lên sân khấu."
          },
          {
            q: "Bạn Mai gõ: “Mình đang viết kịch bản đóng vai 3 phút về Trần Quốc Toản từ tập tư liệu thầy phát. Mình cần biết: nên đưa những cảnh nào vào kịch bản cho hấp dẫn?”. Câu lệnh này đang KHUYẾT mảnh nào trong S – C – Q?",
            options: [
              "Khuyết chữ S (Chưa nói đang làm bài gì).",
              "Khuyết chữ C (Chưa nêu ràng buộc bắt buộc của thầy: cảnh chính chỉ dùng chính sử, chi tiết văn học phải tách riêng) — nên AI rất dễ gợi ý luôn cảnh vua ban cam kịch tính vào kịch chính!",
              "Khuyết chữ Q (Chưa đặt câu hỏi).",
              "Câu lệnh đã đủ hết, không thiếu gì."
            ],
            answer: 1,
            explain:
              "Thiếu chữ C (ràng buộc chấm điểm của thầy ở Trang 11), AI sẽ ưu tiên chi tiết kịch tính truyền miệng thay vì giữ nghiêm ranh giới chính sử."
          },
          {
            q: "Nhóm gõ: “Mình đang soạn kịch 3 phút từ tư liệu Trần Quốc Toản, nhưng thầy bắt cảnh chính chỉ được dùng chính sử thôi. Giúp nhóm mình nhé!”. Đã có S và C, vì sao cần chốt thêm chữ Q thật sắc?",
            options: [
              "Vì không có dấu hỏi chấm thì Gemini bị treo máy.",
              "Vì chữ Q (“Mình cần biết: chi tiết nào đưa vào cảnh diễn chính, chi tiết nào phải tách sang lời bình?”) chỉ đạo thẳng đầu ra để AI kẻ ngay bảng phân loại 2 cột dùng được liền.",
              "Vì thêm chữ Q giúp bài kịch tự động dài lên 15 phút.",
              "Vì thầy giáo bắt nộp ảnh chụp dấu chấm hỏi."
            ],
            answer: 1,
            explain:
              "Có S + C giúp AI hiểu luật chơi, còn chữ Q sắc bén giúp AI xuất ra đúng bảng phân loại phục vụ ngay cho vở kịch."
          },
          {
            q: "Trong câu lệnh của nhóm 8A2, cụm đuôi “trả lời kèm số trang, chỉ thêm chỗ mình dễ sót, rồi gợi ý hướng giải quyết và thảo luận cùng mình nhé” đã giúp nhóm phát hiện thêm điều gì quý giá?",
            options: [
              "Giúp nhóm không cần đọc lại tập tư liệu 12 trang của thầy nữa.",
              "Nhờ “chỉ chỗ dễ sót”, AI phát hiện nhân vật đối trọng Trần Kiện (Trang 4, 10) và bẫy nhầm tuổi 1282 vs 1285; nhờ “kèm số trang”, nhóm mở đúng Trang 3, 4, 8, 11 kiểm lại tận mắt!",
              "Giúp AI tự lên bục giảng trả lời câu hỏi phản biện thay cả nhóm.",
              "Chỉ là câu xã giao lịch sự chứ không thay đổi kết quả của AI."
            ],
            answer: 1,
            explain:
              "Đó chính là sức mạnh cộng hưởng của 4D × SCQ: mình đặt khung đúng (SCQ), AI soi điểm mù kèm trang (Trang–Sót–Bàn), rồi mình kiểm trang gốc (D3)."
          }
        ]
      },

      // ==================== ACTIVITY 3 (STEP 5): SCQ PROMPT BUILDER (TRANSFER + VIDEO SAMPLE) ====================
      {
        id: "act-fill",
        kind: "fill",
        spineActive: [0, 1],
        phase: "Thực hành Mình nghĩ trước + AI làm cùng · 5 phút",
        title: "Bài tập 3: Tự ghép câu lệnh “S – C – Q + Trang – Sót – Bàn”",
        lead: "Áp dụng ngay khuôn S – C – Q vào một tình huống mới tinh bên dưới (hoặc tự điền tài liệu thật của bạn) để biến “Mình nghĩ trước” thành câu lệnh sắc bén.",
        transferPromptAdult:
          "🎯 Tình huống mới để bạn tập nghĩ S – C – Q: Công ty vừa gửi Quy chế thưởng Tết & cam kết đào tạo dày 10 trang. Bạn dự định nhận thưởng Tết xong đầu tháng 3 sẽ xin nghỉ chuyển việc, nên rất lo bị thu hồi thưởng hoặc đền phí đào tạo.",
        transferPromptStudent:
          "🎯 Tình huống mới để bạn tập nghĩ S – C – Q: Cô Sinh học vừa phát tài liệu chuyên đề Di truyền dày 10 trang. Sáng mai kiểm tra 15 phút chỉ xoay quanh dạng bài sơ đồ phả hệ, mà tối nay bạn chỉ còn đúng 45 phút ôn bài.",
        fields: [
          {
            slot: "S",
            label: "Mình đang... (Situation — Việc trước mắt & tài liệu đang xử lý)",
            hintAdult: "Gợi ý tình huống mới: đọc quy chế thưởng Tết và cam kết đào tạo 10 trang của công ty",
            hintStudent: "Gợi ý tình huống mới: ôn tài liệu chuyên đề Di truyền 10 trang cô Sinh vừa phát",
            sampleAdult: "đọc quy chế thưởng Tết và cam kết đào tạo 10 trang của công ty",
            sampleStudent: "ôn tài liệu chuyên đề Di truyền 10 trang cô Sinh vừa phát",
            videoAdult: "xem hợp đồng thuê mặt bằng mở quán 12 trang",
            videoStudent: "viết kịch bản đóng vai 3 phút về Trần Quốc Toản từ tập tư liệu thầy phát"
          },
          {
            slot: "C",
            label: "nhưng... (Complication — Ràng buộc khó, giới hạn hoặc nỗi lo riêng)",
            hintAdult: "Gợi ý tình huống mới: đầu tháng 3 tới mình định xin nghỉ việc sau khi nhận thưởng Tết",
            hintStudent: "Gợi ý tình huống mới: sáng mai kiểm tra 15 phút phần sơ đồ phả hệ mà tối nay mình chỉ còn 45 phút ôn",
            sampleAdult: "đầu tháng 3 tới mình định xin nghỉ việc sau khi nhận thưởng Tết",
            sampleStudent: "sáng mai kiểm tra 15 phút phần sơ đồ phả hệ mà tối nay mình chỉ còn 45 phút ôn",
            videoAdult: "vốn mình chỉ trụ được 10 tháng nếu vắng khách",
            videoStudent: "thầy bắt cảnh chính chỉ dùng chính sử còn chi tiết văn học phải tách riêng"
          },
          {
            slot: "Q",
            label: "Mình cần biết:... (Question — Câu hỏi quyết định cần làm rõ)",
            hintAdult: "Gợi ý tình huống mới: nghỉ vào đầu tháng 3 thì có bị thu hồi thưởng Tết hay đền chi phí đào tạo không",
            hintStudent: "Gợi ý tình huống mới: phần nào trong 10 trang là quy tắc giải phả hệ cần học ngay và lỗi nào dễ tính nhầm nhất",
            sampleAdult: "nghỉ vào đầu tháng 3 thì có bị thu hồi thưởng Tết hay đền chi phí đào tạo không",
            sampleStudent: "phần nào trong 10 trang là quy tắc giải phả hệ cần học ngay và lỗi nào dễ tính nhầm nhất",
            videoAdult: "nếu nghỉ ở tháng thứ 10 thì tổng cộng mất bao nhiêu tiền",
            videoStudent: "chi tiết nào được đưa vào cảnh diễn, chi tiết nào phải tách riêng"
          }
        ],
        revealNote:
          "Mẹo nhớ nằm lòng không cần mở web: Nghĩ trước bằng “Đang làm [S], nhưng vướng [C], cần biết [Q]?” → Giao AI 3 chữ “Kèm số TRANG, chỉ chỗ SÓT, gợi ý & cùng BÀN!”"
      },

      // ==================== ACTIVITY 4 (STEP 6): SOURCE PAGE VERIFICATION & FINAL DECISION ====================
      {
        id: "act-write",
        kind: "write",
        spineActive: [2],
        phase: "Thực hành Mình kiểm cuối (D3 & D4) · 5 phút",
        title: "Bài tập 4: Mở trang gốc bắt lỗi & Tự chốt quyết định",
        lead: "Dưới đây là một bản nháp giả lập có cài sẵn 1 chi tiết sai lệch so với hồ sơ PDF 12 trang. Hãy mở tệp PDF gốc đối chiếu để bắt lỗi (D3) rồi tự chốt phương án xử lý của bạn (D4).",
        verifyCaseAdult: {
          badge: "Bản nháp giả lập để tập thẩm định (Có cài 1 chỗ lệch số liệu)",
          aiDraft:
            "“Theo hợp đồng thuê mặt bằng 12 trang, nếu bạn trả quán ở tháng thứ 10: (1) Mất tiền cọc 75 triệu tại Điều 4, Trang 3; (2) Hoàn trả 100% gói hỗ trợ cải tạo 37,5 triệu tại Điều 5, Trang 4; (3) Phạt khấu hao thiết bị tại Phụ lục 02, Trang 12 là 50 triệu đồng và được trả góp trong 30 ngày.”",
          checkHint:
            "🔍 Gợi ý mở PDF kiểm tra: Lật Điều 7.2 (Trang 7) và Phụ lục 02 (Trang 12) xem mức khấu hao khung tháng 7–12 thực sự là 50 triệu hay 85 triệu, và hạn thanh toán là 30 ngày hay 05 ngày làm việc!",
          sampleVerify:
            "Đã mở PDF gốc đối chiếu: Trang 3 (cọc 75tr) và Trang 4 (hoàn trả 37,5tr) đúng; NHƯNG Phụ lục 02 Trang 12 ghi rõ khung tháng 7–12 phạt khấu hao thiết bị 85 triệu đồng (không phải 50 triệu) và Điều 7.2 Trang 7 bắt thanh toán trong 05 ngày làm việc (không phải 30 ngày). Tổng mất thực tế là 197,5 triệu!",
          sampleDecision:
            "Mình quyết định chưa đặt bút ký lúc 3h chiều nay; chủ động nhắn chủ nhà xin đàm phán tách gói thiết bị Phụ lục 02 hoặc giảm cam kết năm đầu xuống 10–12 tháng và trần tăng giá năm hai tối đa 8–10%."
        },
        verifyCaseStudent: {
          badge: "Bản nháp giả lập để tập thẩm định (Có cài 1 chỗ lệch sử liệu)",
          aiDraft:
            "“Theo tập tư liệu Trần Quốc Toản 12 trang: (1) Sự kiện bóp nát quả cam diễn ra tại Hội nghị Bình Than năm 1282 ở Trang 3; (2) Chính sử Trang 4 chép Quốc Toản tự cầm cam bóp nát và viết 6 chữ lên cờ; (3) Chính sử Đại Việt sử ký toàn thư ở Trang 4 cũng ghi rõ Trần Quốc Toản anh dũng hy sinh ở tuổi 16 ngay tại trận Chương Dương năm 1285.”",
          checkHint:
            "🔍 Gợi ý mở PDF kiểm tra: Lật đúng Trang 4 (trích đoạn Đại Việt sử ký toàn thư) và Trang 8 (Bảng đối chiếu) xem chính sử có ghi tuổi mất 16 và nguyên nhân hy sinh không!",
          sampleVerify:
            "Đã mở PDF gốc đối chiếu: Trang 3 (Bình Than 1282) và ý đầu Trang 4 đúng; NHƯNG ý số (3) sai! Trang 4 và Trang 8 ghi rõ chính sử KHÔNG chép năm mất hay nguyên nhân mất (năm 1285 ông đã khoảng 18–19 tuổi); chi tiết hy sinh tuổi 16 là sáng tạo văn học của Nguyễn Huy Tưởng.",
          sampleDecision:
            "Nhóm chốt kịch bản 3 phút: 2 phút đầu diễn cảnh Bình Than 1282 đối thoại với Hoài Nhân vương Trần Kiện đúng chính sử Trang 4; 1 phút cuối người dẫn chuyện tách riêng lời bình tôn vinh chi tiết quả cam vua ban, lá cờ mẹ thêu và hình tượng tuổi 16 trong văn học."
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
            label: "2. Quyết định cuối cùng tự mình chốt (D4 — Bạn quyết định đàm phán / trình bày kịch bản thế nào?):",
            placeholderAdult:
              "Ví dụ: Chưa ký vội chiều nay; đề nghị chủ nhà bỏ hoặc giảm mức khấu hao thiết bị Phụ lục 02 và giữ trần tăng giá năm 2 dưới 10%...",
            placeholderStudent:
              "Ví dụ: Chốt 2 phút đầu diễn chính sử Bình Than 1282 (Trang 3–4), 1 phút cuối tách riêng lời bình cho tác phẩm Lá cờ thêu sáu chữ vàng (Trang 8)..."
          }
        ],
        checklist: [
          "D1 · Mình nghĩ trước (S–C–Q): Đã xác định rõ Việc đang làm (S), Ràng buộc khó (C) và Câu hỏi cần chốt (Q).",
          "D2 · AI làm cùng (Trang–Sót–Bàn): Đã yêu cầu AI trích rõ số trang, chỉ điểm mù dễ sót và gợi ý hướng thảo luận.",
          "D3 · Mình kiểm cuối (Mở trang gốc): Đã tự tay mở đúng trang trên tệp PDF gốc để kiểm chứng từng chi tiết.",
          "D4 · Trách nhiệm cuối cùng: Chính mình hiểu rõ và tự chốt quyết định (không giao trắng và không tải dữ liệu mật/CCCD lên mạng)."
        ]
      }
    ],

    caseFiles: [
      {
        id: "cf-lease",
        forScenario: "adult",
        title: "Hồ sơ mẫu 1 · Hợp đồng thuê mặt bằng kinh doanh (12 trang)",
        meta: "Dành cho Người lớn · Gồm tiền cọc (Trang 3), hỗ trợ sửa quán (Trang 4), hạn phạt 05 ngày (Trang 7) & Phụ lục khấu hao thiết bị (Trang 12).",
        fileHref: "tai-lieu/Hop-dong-Thue-mat-bang-Mau-12-trang.pdf",
        answerSummary:
          "Bẫy ngầm khi trả mặt bằng ở tháng thứ 10: (1) Mất cọc 75 triệu (Điều 4, Trang 3); (2) Hoàn trả 37,5 triệu gói hỗ trợ cải tạo mặt bằng (Điều 5, Trang 4); (3) Thanh toán 85 triệu khấu hao thiết bị khung tháng 7–12 (Phụ lục 02, Trang 12) → Tổng thiệt hại 197,5 triệu đồng, buộc quyết toán trong 05 ngày làm việc (Trang 7) và giá thuê năm 2 tăng 18% (Trang 2)."
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
    ]
  };
})();
