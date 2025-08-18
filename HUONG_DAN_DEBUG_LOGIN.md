# HƯỚNG DẪN DEBUG VẤN ĐỀ ĐĂNG NHẬP

## 🔍 TÌNH TRẠNG HIỆN TẠI

✅ **Backend hoạt động bình thường:**
- Tài khoản `21521300@gm.uit.edu.vn` với mật khẩu `cp31012003` tồn tại
- GraphQL login mutation hoạt động đúng
- Session management hoạt động chính xác
- Database connection ổn định

❌ **Vấn đề:** Không thể đăng nhập từ giao diện web

---

## 🛠️ CÁCH KIỂM TRA CHI TIẾT

### Bước 1: Mở Developer Tools
1. Truy cập: http://localhost:3000/login
2. Nhấn **F12** để mở Developer Tools
3. Chuyển sang tab **Console** và **Network**

### Bước 2: Thử đăng nhập và quan sát
1. Điền thông tin:
   - **Username/Email:** `21521300@gm.uit.edu.vn`
   - **Password:** `cp31012003`

2. **TRƯỚC KHI NHẤN ĐĂNG NHẬP:**
   - Xóa tất cả logs trong tab Console
   - Xóa tất cả requests trong tab Network

3. **NHẤN ĐĂNG NHẬP** và quan sát:

---

## 📋 CHECKLIST KIỂM TRA

### ✅ Tab Console - Tìm lỗi JavaScript
**Cần kiểm tra:**
- [ ] Có lỗi màu đỏ nào không?
- [ ] Có warning màu vàng nào liên quan đến form không?
- [ ] Có lỗi về validation không?
- [ ] Có lỗi về GraphQL client không?

**Các lỗi thường gặp:**
```
❌ TypeError: Cannot read property 'mutate' of undefined
❌ GraphQL error: Network request failed
❌ Validation error: ...
❌ CORS error
```

### ✅ Tab Network - Kiểm tra requests
**Cần tìm request POST đến `/api`:**
- [ ] Request có được gửi không?
- [ ] Status code là gì? (200, 400, 500?)
- [ ] Request payload có đúng không?
- [ ] Response có lỗi gì không?

**Click vào request `/api` và kiểm tra:**

**Headers tab:**
```
Request Method: POST
Content-Type: application/json
```

**Payload tab (Request):**
```json
{
  "query": "mutation Login($input: LoginInputType) { ... }",
  "variables": {
    "input": {
      "username": "21521300@gm.uit.edu.vn",
      "password": "cp31012003"
    }
  }
}
```

**Response tab:**
- ✅ **Thành công:** `{"data": {"login": {...}}}`
- ❌ **Thất bại:** `{"errors": [{"message": "..."}]}`

### ✅ Tab Application - Kiểm tra Cookies
1. Vào **Application** > **Storage** > **Cookies** > **http://localhost:3000**
2. Sau khi đăng nhập, cần có cookies liên quan đến session
3. Tìm cookies có tên như: `next-auth.session-token`, `connect.sid`, hoặc tương tự

---

## 🔧 CÁC BƯỚC KHẮC PHỤC

### Nếu có lỗi JavaScript:
1. **Lỗi về useLogin hook:**
   ```bash
   # Kiểm tra file: src/hooks/auth.hooks.ts
   # Đảm bảo hook được import đúng
   ```

2. **Lỗi về GraphQL client:**
   ```bash
   # Kiểm tra cấu hình Apollo Client
   # Đảm bảo endpoint đúng: /api
   ```

### Nếu request không được gửi:
1. **Kiểm tra form submission:**
   - Form có `onSubmit` handler không?
   - Button có `type="submit"` không?
   - Có preventDefault() không?

2. **Kiểm tra validation:**
   - Form có pass validation không?
   - Có lỗi validation nào block submit không?

### Nếu request được gửi nhưng thất bại:
1. **Status 400 - Bad Request:**
   - Kiểm tra format dữ liệu gửi đi
   - Đảm bảo username/password đúng format

2. **Status 500 - Server Error:**
   - Kiểm tra server logs
   - Có thể có lỗi database hoặc GraphQL resolver

3. **GraphQL Errors:**
   - Đọc message trong response
   - Thường là "USER_NOT_FOUND" hoặc "INVALID_PASSWORD"

---

## 🚀 GIẢI PHÁP NHANH

### Thử các bước này theo thứ tự:

1. **Xóa cache và cookies:**
   - Ctrl + Shift + Delete
   - Xóa tất cả dữ liệu của localhost:3000

2. **Thử chế độ ẩn danh (Incognito):**
   - Mở cửa sổ ẩn danh
   - Truy cập http://localhost:3000/login
   - Thử đăng nhập

3. **Tắt extensions:**
   - Tắt tất cả browser extensions
   - Đặc biệt là ad blockers, security extensions

4. **Thử trình duyệt khác:**
   - Chrome, Firefox, Edge
   - Xem có cùng vấn đề không

5. **Hard refresh:**
   - Ctrl + F5 để reload hoàn toàn
   - Hoặc Ctrl + Shift + R

---

## 📞 NẾU VẪN KHÔNG ĐƯỢC

**Gửi cho tôi thông tin sau:**

1. **Screenshot của Console tab** (có lỗi)
2. **Screenshot của Network tab** (request/response)
3. **Trình duyệt đang dùng** (Chrome, Firefox, etc.)
4. **Có extensions nào đang chạy không**
5. **Thông báo lỗi cụ thể** (nếu có)

---

## 🎯 THÔNG TIN QUAN TRỌNG

- **Server đang chạy:** http://localhost:3000
- **GraphQL endpoint:** http://localhost:3000/api
- **Tài khoản test:** 21521300@gm.uit.edu.vn
- **Mật khẩu:** cp31012003
- **Backend status:** ✅ Hoạt động bình thường
- **Database:** ✅ Kết nối ổn định
- **Session management:** ✅ Hoạt động đúng

**Vấn đề chỉ nằm ở frontend/browser - backend hoàn toàn ổn!**