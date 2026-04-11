# Nectar App — Bài tập AsyncStorage

**Họ và tên:** Phạm Quang Huy
**MSSV:** 23810310347

## Ảnh giao diện ứng dụng

<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/513fa6d5-9cf9-4ea3-a97f-467801326b15" />
<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/c227098a-5bed-4143-a285-a7931405d03a" />
<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/71e2343d-22ce-4d8b-9259-e592828a0c40" />
<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/98421b05-4517-4e2d-969b-a74c48b659d2" />
<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/27ab5b1d-c37d-419e-89fd-85579b1aa966" />
<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/8b4a3403-ab6f-4a6b-8499-1c775fe674d6" />
<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/007a2489-1c8a-4211-9950-a24af2a05844" />
<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/16faf683-a8b7-4e61-b773-d5ce16b7e51f" />
<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/64ea03ce-46b9-40c0-bfb0-53b5ba605314" />
<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/613d107b-d3a9-46f5-bf06-c16f67352162" />
<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/7358343e-76b2-49f4-aa13-96f2e7d27b95" />
<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/2b3218ee-c6f1-4bd3-877e-ef63397c04ec" />
<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/51646ec1-abe6-4710-8ec2-bce08d36f18f" />

Ứng dụng grocery (React Native + Expo Router) sử dụng `@react-native-async-storage/async-storage` để lưu trữ dữ liệu cục bộ: đăng nhập, giỏ hàng và lịch sử đơn hàng.

---

## 1. Mô tả chức năng

### 1.1 Xác thực & Auto Login
- Khi login thành công → lưu `user` + `token` vào AsyncStorage.
- Mở lại app → splash đọc storage và tự động chuyển vào `(tabs)` nếu đã đăng nhập.
- Nút **Log Out** ở màn Account → xóa toàn bộ dữ liệu (user, token, cart, orders) và quay về login.

### 1.2 Giỏ hàng (Cart) lưu cục bộ
- Toàn bộ cart được quản lý trong `CartContext` và đồng bộ về AsyncStorage mỗi lần thay đổi.
- Tăng/giảm số lượng và xóa item từ màn `My Cart`.
- Tắt app → mở lại → cart vẫn còn nguyên.
- Thêm sản phẩm từ màn **Product Detail** (nút *Add To Basket*).

### 1.3 Đơn hàng (Orders)
- Khi nhấn **Place Order** ở Checkout → lưu đơn hàng (sản phẩm, tổng tiền, thời gian) vào AsyncStorage và clear cart.
- Vào **Account → Orders** để xem danh sách đơn hàng.
- Reload app → orders vẫn được giữ.

---

## 2. Hướng dẫn chạy app

```bash
# 1. Cài đặt dependencies
npm install

# 2. Khởi động dev server
npx expo start

# 3. Mở trên iOS / Android
# Quét QR bằng Expo Go hoặc nhấn `i` (iOS) / `a` (Android) trong terminal
```

**Yêu cầu:**
- Node.js ≥ 18
- Expo SDK 54
- Expo Go app trên thiết bị thật, hoặc iOS Simulator / Android Emulator.

---

## 3. Cấu trúc dự án (phần thêm mới)

```
Nectar_App/
├── services/
│   └── storageService.ts      # Helper async/await cho AsyncStorage (auth, cart, orders)
├── contexts/
│   ├── AuthContext.tsx        # Quản lý user + login/logout
│   └── CartContext.tsx        # Quản lý cart, tự động persist
└── app/
    ├── index.tsx              # Splash → auto login
    ├── (auth)/login.tsx       # Lưu user khi login
    ├── (tabs)/cart.tsx        # Đọc cart từ context
    ├── (tabs)/account.tsx     # Logout xóa storage
    ├── product/[id].tsx       # Add To Basket → lưu vào cart
    ├── checkout.tsx           # Place Order → lưu order
    └── orders.tsx             # Danh sách đơn hàng từ AsyncStorage
```

---

## 4. Ảnh demo (9 ảnh bắt buộc)

> Đặt ảnh trong thư mục `docs/screenshots/` và đổi tên theo định dạng `MSSV_XX_<mota>.png`.

| # | Mô tả | Ảnh |
|---|-------|-----|
| 1 | Login thành công | `docs/screenshots/23810310347_01_login.png` |
| 2 | Tắt app → mở lại vẫn login | `docs/screenshots/23810310347_02_autologin.png` |
| 3 | Logout → quay về login | `docs/screenshots/23810310347_03_logout.png` |
| 4 | Thêm sản phẩm vào giỏ | `docs/screenshots/23810310347_04_add_cart.png` |
| 5 | Tắt app → mở lại giỏ vẫn còn | `docs/screenshots/23810310347_05_cart_persist.png` |
| 6 | Thay đổi số lượng | `docs/screenshots/23810310347_06_qty.png` |
| 7 | Đặt hàng thành công | `docs/screenshots/23810310347_07_order_placed.png` |
| 8 | Danh sách đơn hàng | `docs/screenshots/23810310347_08_orders.png` |
| 9 | Reload app vẫn còn đơn hàng | `docs/screenshots/23810310347_09_orders_reload.png` |

---

## 5. Video demo

**Link video:** _<dán link YouTube / Drive tại đây>_

Nội dung video (2–5 phút):
- Login → kill app → mở lại (auto login).
- Thêm sản phẩm vào giỏ → kill app → mở lại (cart persist).
- Tăng/giảm số lượng, xóa item.
- Checkout → vào Orders xem lại.
- Hiển thị tên sinh viên / MSSV trong app.

---

## 6. Trả lời 3 câu hỏi lý thuyết

### 6.1 AsyncStorage hoạt động như thế nào?

`AsyncStorage` là một key-value store **không đồng bộ**, **lưu cục bộ trên thiết bị** (unencrypted bằng mặc định). Trên Android nó dùng SQLite, trên iOS dùng file system. Tất cả các thao tác đều trả về `Promise`, vì vậy cần dùng `async/await` (hoặc `.then`) để đọc/ghi. Dữ liệu chỉ hỗ trợ kiểu `string`, nên với object/array phải `JSON.stringify` khi lưu và `JSON.parse` khi đọc. Dữ liệu sẽ tồn tại giữa các lần mở app, chỉ bị xóa khi user gỡ app hoặc gọi `removeItem`/`clear`.

### 6.2 Vì sao dùng AsyncStorage thay vì biến state?

Biến `useState` chỉ tồn tại trong **vòng đời của component**. Khi reload app hoặc kill app, state bị reset về giá trị ban đầu — user phải đăng nhập lại, giỏ hàng mất sạch. AsyncStorage ghi xuống bộ nhớ vật lý nên dữ liệu **bền vững (persistent)** giữa các phiên chạy app. Vì vậy AsyncStorage phù hợp với các dữ liệu cần lưu lâu dài như: token đăng nhập, giỏ hàng, lịch sử đơn hàng, cài đặt người dùng…

### 6.3 So sánh AsyncStorage với Context API

| Tiêu chí | AsyncStorage | Context API |
|---|---|---|
| Mục đích | Lưu trữ dữ liệu (storage) | Chia sẻ state giữa các component (state propagation) |
| Bền vững | ✅ Có — sống sau khi tắt app | ❌ Không — mất khi unmount/reload |
| Tốc độ | Chậm hơn (I/O bất đồng bộ) | Nhanh (in-memory) |
| Loại dữ liệu | Chỉ string (cần JSON.stringify) | Bất kỳ JS value |
| Trigger re-render | ❌ Không | ✅ Có |
| Vai trò | Tầng persistence | Tầng quản lý state runtime |

→ Trong project này tôi **kết hợp cả hai**: `CartContext` giữ state để re-render UI, đồng thời mỗi khi state thay đổi sẽ gọi `saveCart()` xuống AsyncStorage. Khi app khởi động, context đọc lại từ storage và hydrate vào state.

---

## 7. Yêu cầu kỹ thuật đã đáp ứng

- [x] `@react-native-async-storage/async-storage`
- [x] Sử dụng `async/await` + `try/catch`
- [x] File riêng `services/storageService.ts`
- [x] Lưu dữ liệu dạng JSON
- [x] Auto login từ AsyncStorage
- [x] Cart persistence
- [x] Orders persistence
- [x] Logout xóa toàn bộ storage
- [x] Loading indicator khi load data
- [x] Custom context (Auth + Cart) tương đương custom hook

---

## 8. Git commits gợi ý

```text
feat: add async storage service and contexts
feat: login persistence with asyncstorage
feat: cart persistence with context provider
feat: save orders on checkout
feat: orders list screen reading from storage
docs: update README with screenshots and answers
```
