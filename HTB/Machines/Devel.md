# Devel

Như các bài khác thì việc đầu tiên mình làm là sử dụng nmap để scan các dịch vụ đang chạy trên server.

Sau khi scan ta xác định được trên server đang chạy 2 dịch vụ là web ở cổng 80 và ftp ở cổng 21. Tiếp tục sử dụng nmap để kiểm tra version của các dịch vụ.

![image](https://github.com/user-attachments/assets/99067eb9-8157-4c1e-b7ef-6c13176581e1)

Vì có sử dụng ftp nên mình thử login vào dịch vụ ftp với username là anonymous.

![image](https://github.com/user-attachments/assets/b5111093-c7ca-4afb-9cb6-f1e9555f2d97)

Đăng nhập thành công nhưng có vẻ ở đây không có gì đặc biệt.

Từ quá trình scan mình thấy rằng web server là IIS. Mình tạo một reverce shell bằn msfvenom

![image](https://github.com/user-attachments/assets/10ed9552-ee98-43a7-9703-639471e258f6)

Sau khi tạo được reverse shell mình thử up shell lên server qua dịch vụ ftp bằng lệnh put

![image](https://github.com/user-attachments/assets/e4111200-639d-4d67-91b7-125759934448)

Tiếp đến sử dụng module multi/handler để tạo kết nối với reverce shell vừa up lên server.

![image](https://github.com/user-attachments/assets/5489ae85-e904-4210-aee1-9a120a15f47e)

Thực hiện set các giá trị của LHOSTS và payload phù hợp

![image](https://github.com/user-attachments/assets/209959e5-d741-4e3d-8dfd-487f9f76d163)

Sau khi run mình đã tạo kết nối thành công

Từ đây mình đọc được flag của user







