# Hướng dẫn Mở Xem Local & Bàn Giao Đưa Lên Web Online (Bài 01)

## 1. Mở duyệt ngay trên máy tính (Local)
- Nhấp đúp trực tiếp tệp `index.html` bằng trình duyệt Chrome / Safari / Edge (không bắt buộc cài đặt máy chủ vì toàn bộ dữ liệu bài học đã được đóng gói trong `lesson-data.js`).
- Hoặc chạy máy chủ tĩnh nếu muốn test qua địa chỉ `http://localhost`:
  ```bash
  python3 -m http.server 8080 --directory "."
  ```

## 2. Cấu trúc thư mục (Sẵn sàng nén gửi đi hoặc deploy lên Web)
```text
Web-Bai-01-Doc-Sau-4D/
├── index.html          # Khung giao diện chính (3 phần: Hoàn cảnh -> 4D -> Bài tập Conan)
├── styles.css          # Hệ thống màu sắc & bố cục (không dùng framework ngoài)
├── lesson-data.js      # Toàn bộ dữ liệu: đường dẫn video, transcript, 4 bài tập tương tác
├── app.js              # Logic chuyển tình huống, tua video theo transcript, chấm bài & lưu localStorage
├── media/              # 4 file video MP4 chuẩn H.264 720p (đã bật faststart để stream web tức thì)
│   ├── tinh-huong-1-hop-dong.mp4
│   ├── tinh-huong-2-lich-su.mp4
│   ├── quy-luat-4d-hop-dong.mp4
│   └── quy-luat-4d-lich-su.mp4
└── tai-lieu/           # 2 hồ sơ PDF 12 trang có cài bẫy để người học đối chiếu thực tế
    ├── Hop-dong-Thue-mat-bang-Mau-12-trang.pdf
    └── Tu-lieu-Lich-su-Tran-Quoc-Toan-12-trang.pdf
```

## 3. Ghi chú cho bạn kỹ thuật khi đưa lên Web Online
- Trang là **100% Static Web** (HTML/CSS/Vanilla JS), có thể đưa thẳng lên Cloudflare Pages, Vercel, Netlify hoặc nhúng vào LMS hiện có.
- Nếu lưu trữ video trên CDN riêng (Cloudflare R2 / Bunny Stream / S3) hoặc YouTube Unlisted, chỉ cần sửa 4 trường `videoSrc` trong tệp `lesson-data.js`.
- Trạng thái làm bài của người học hiện lưu tại `localStorage` theo khóa `bai01-doc-sau-state-v1` (có sẵn hàm xuất/nhập JSON để dễ nối API lưu về Database sau này nếu cần).
