# Mass Assignment Profile

Bài này cho chúng ta tài khoảng đăng nhập với quyền người dùng. Rất có thể chúng ta cần leo thang đặc quyền chiều dọc lên admin để lấy được flag

Mình dùng burpsuite chặn request update và thầy rằng request body không giới hạn tham số chuyền vào nên mình thử thêm tham số "role" với giá trị là "admin" và lấy được flag

![alt text](image.png)

*Flag: CHH{M4ss_4ss1gnm3nt_D4ng3r_115b7ff7e1e3519877c5179c0bdd8bc3}*