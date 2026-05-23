# MemorIAI — UI/UX Demo

Bản UI tĩnh demo cho dashboard AI gateway. Mục đích: làm tài liệu tham khảo design — không backend, không database, không secret.

Tất cả dữ liệu đều là **mock hardcode** trong client. Không gọi API thật, không xử lý thanh toán, không xác thực.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- TypeScript
- Không có server code — chỉ static UI

## Chạy thử

```bash
npm install
npm run dev
# mở http://localhost:3000
```

Build production:

```bash
npm run build
npm run start
```

## Trang có sẵn

- `/` — landing marketing
- `/buy` — flow mua plan / nạp credit (UI only, QR là ảnh placeholder)
- `/my` — dashboard người dùng (KPI, request logs, billing, playground — mock data)
- `/docs` — hướng dẫn cài đặt cho Claude Code, Cursor, Cline, Kilo, OpenClaw, Hermes

## Lưu ý

- Nội dung số tài khoản, số điện thoại, base URL trong demo này **đều là placeholder** (`bank-account-placeholder`, `https://api.example.com`...). Thay bằng giá trị thật khi deploy.
- File `landing.html` trong `public/` là static HTML cho trang chủ — nội dung từ thiết kế gốc, đã thay placeholder cho phần liên hệ.
- Theme sáng/tối và VI/EN toggle ở góc dưới phải.
