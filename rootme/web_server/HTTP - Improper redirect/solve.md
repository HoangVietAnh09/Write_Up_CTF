# HTTP - Improper redirect

Như tên đề bài thì sau khi chúng ta truy cập vào chall này ngay lập tức sẽ bị redirect đến trang login
Vì vậy mình cần tìm cách để có thể đọc được nội dung của của trang lúc chưa bị redirect
Mình dùng burpsuite để proxy và gửi request đến trang lúc đầu và response trả về có chứa flag

![alt text](image.png)

*Flag: ExecutionAfterRedirectIsBad*
