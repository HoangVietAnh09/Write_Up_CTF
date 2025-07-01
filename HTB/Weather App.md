# Weather App

Đầu tiên thử truy cập vào trang web mình quan sát thấy không có gì đặc biệt lắm. Đọc source code mình thấy có một số điểm đáng ngờ. 
* Chức năng đăng kí bị SQLi do không sử dụng tham số hóa truy vấn

![image](https://github.com/user-attachments/assets/98bdf5d9-5eec-41f7-9b46-97ef3c6cbd49)

* Input gọi API có thể do mình kiểm soát

![image](https://github.com/user-attachments/assets/e6b2bfd9-473d-4a82-9fe7-9ae4595e7100)

![image](https://github.com/user-attachments/assets/aa3beed5-1b22-4a4e-8cea-6c24eda08ceb)

Vấn đề đầu tiên mình thử tìm đến entry point dẫn đến sink này nằm ở path /register

![image](https://github.com/user-attachments/assets/787bf4d6-b12b-4555-b98c-bb946337fb64)

Để có thể đăng kí thì mình cần phải có địa chỉ localhost. Tuy nhiên sau nhiều lần thử bypass với nhiều các header như X-Forwarded-For,... thì mình vẫn ko thể đăng kí được. Thôi đành sang điểm đáng nghi ngờ thứ 2

Tại dây mình thấy request có gọi đến một url ở ngoài nên mình thử xem có được không 

![image](https://github.com/user-attachments/assets/fcf3a876-38ba-4163-bfde-49f31b7fc93a)
![image](https://github.com/user-attachments/assets/36c576f6-1e39-4961-869e-207d95fb98e6)

Từ đây mình thử một số payload SSRF nhưng tất cả đều không có gì. Sau đấy mình có đi tham khảo một số nguồn thì được biết rằng ứng dụng được viết bằng NodeJS v8.12.0 có tồn tại lỗ hổng HTTP request smuggling 
Qua một hồi tìm hiểu và thử thì mình có viết một đoạn [payload](https://github.com/HoangVietAnh09/Write_Up_CTF/blob/main/HTB/Weather_app.py)

Về cơ bản thì mình sẽ lỡi dụng chức năng đăng kí để chèn mã SQL làm thay đổi mật khẩu của admin thông qua lỗ hổng HTTP request smuggling

*Flag: HTB{w3lc0m3_t0_th3_p1p3_dr34m}*


