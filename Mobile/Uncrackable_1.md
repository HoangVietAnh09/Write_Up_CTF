# Tổng quan
Khi truy cập vào ứng dụng ta thấy rằng ứng dụng kiểm tra điện thoại đã được root chưa. Nếu đã được root thì sẽ hiện cảnh bảo và buộc chúng ta phải out ứng dụng

![image](https://github.com/user-attachments/assets/8d3e9fb1-affd-4cb3-a38b-82a5096179fd)
## Phân tích tĩnh
Đầu tiên ta phải phân tích tĩnh code của ứng dụng. Ở đây mình dùng jadx để đọc code

![image](https://github.com/user-attachments/assets/3e6512a4-5291-4065-b850-c74cc8758ad0)

Bắt đầu đọc từ hàm MainActivity. Sau khi đọc và phân tích code ta thấy rằng sau khi kiểm tra root ở hàm onCreate thì sẽ gọi đến hàm a để pop up thông báo check root lên

![image](https://github.com/user-attachments/assets/623bdc54-521e-4e73-aede-824da9bea67f)

Vậy thì việc chúng ta cần làm chỉ cần hook vào hàm a này và không cần làm gì hết. Mình cook một đoạn code js sau đó sủ dụng frida để hook vào hàm a

![image](https://github.com/user-attachments/assets/b88c42a6-4be7-436e-8c84-ca94ff5dffa5)

![image](https://github.com/user-attachments/assets/86ca92a4-4bfd-4dca-a10b-0b1031a0b3c5)

Hook thành công

Giải thích các tham số: 
* frida: Lệnh chính để chạy Frida
* -U: Viết tắt của USB device – chỉ định Frida kết nối đến thiết bị Android qua cáp USB
* -l: Load file script.js – đây là đoạn JavaScript chứa mã Frida để hook
* -f: Spawn ứng dụng owasp.mstg.uncrackable1 (Có thể tìm kiếm ứng dụng đang chạy bằng cách chạy lệnh ps -A trong terminal của điện thoại)

Mục đích của bài lab này là chúng ta tìm cách để tìm được flag chính xác sau đó nhập vào và kết quả trả về là Success. Phân tiếp tiếp code ta thấy hàm verìy sẽ kiểm tra chuỗi chuyền vào và trả về kết quả

![image](https://github.com/user-attachments/assets/75f06b43-8821-4df6-96b5-5448d4baf654)

Ta thấy rằng hàm this.m.a(string) sẽ thực hiện kiểm tra chuỗi chuyền vào






