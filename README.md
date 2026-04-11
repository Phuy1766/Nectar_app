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

---


## 3. Trả lời 3 câu:

### 3.1 AsyncStorage hoạt động như thế nào?

`AsyncStorage` là một key-value store **không đồng bộ**, **lưu cục bộ trên thiết bị** (unencrypted bằng mặc định). Trên Android nó dùng SQLite, trên iOS dùng file system. Tất cả các thao tác đều trả về `Promise`, vì vậy cần dùng `async/await` (hoặc `.then`) để đọc/ghi. Dữ liệu chỉ hỗ trợ kiểu `string`, nên với object/array phải `JSON.stringify` khi lưu và `JSON.parse` khi đọc. Dữ liệu sẽ tồn tại giữa các lần mở app, chỉ bị xóa khi user gỡ app hoặc gọi `removeItem`/`clear`.

### 3.2 Vì sao dùng AsyncStorage thay vì biến state?

Biến `useState` chỉ tồn tại trong **vòng đời của component**. Khi reload app hoặc kill app, state bị reset về giá trị ban đầu — user phải đăng nhập lại, giỏ hàng mất sạch. AsyncStorage ghi xuống bộ nhớ vật lý nên dữ liệu **bền vững (persistent)** giữa các phiên chạy app. Vì vậy AsyncStorage phù hợp với các dữ liệu cần lưu lâu dài như: token đăng nhập, giỏ hàng, lịch sử đơn hàng, cài đặt người dùng…

### 3.3 So sánh AsyncStorage với Context API

| Tiêu chí | AsyncStorage | Context API |
|---|---|---|
| Mục đích | Lưu trữ dữ liệu (storage) | Chia sẻ state giữa các component (state propagation) |
| Bền vững | ✅ Có — sống sau khi tắt app | ❌ Không — mất khi unmount/reload |
| Tốc độ | Chậm hơn (I/O bất đồng bộ) | Nhanh (in-memory) |
| Loại dữ liệu | Chỉ string (cần JSON.stringify) | Bất kỳ JS value |
| Trigger re-render | ❌ Không | ✅ Có |
| Vai trò | Tầng persistence | Tầng quản lý state runtime |

→ Project này **kết hợp cả hai**: `CartContext` giữ state để re-render UI, đồng thời mỗi khi state thay đổi sẽ gọi `saveCart()` xuống AsyncStorage. Khi app khởi động, context đọc lại từ storage và hydrate vào state.

## 4. Ảnh và video demo: /screenshots