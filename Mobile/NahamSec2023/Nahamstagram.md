# Nahamstagram

Sau khi tải app về và dùng thử mình thấy app có một số chức năng chính

* Tạo tài khoản và đăng nhập
* Tạo bài viết
* Lưu bài viết

![image](https://github.com/user-attachments/assets/9d15009d-f344-4b96-a8bf-29b75f5ee25e)

Quan sát chức năng tạo bài viết thầy rằng sau khi tạo bài viết ta có thể thấy tất các bài viết của người khác đã đăng. 

![image](https://github.com/user-attachments/assets/63c291c9-05cf-4351-a64b-74a6fdb0794d)

Test thử chức năng save draft ta thấy rằng sau khi save draft thì chỉ có thể xem các bài của mình đang chỉnh sửa. Vì vậy rất có thể khi chúng ta tìm cách đọc được các bài viết đang sửa của người khác thì sẽ lấy được flag.

![image](https://github.com/user-attachments/assets/667193ec-ae42-4938-b691-2fae6993584c)

Mình sử dụng jadx để đọc source code. Sau khi đọc source code một hồi ta thấy rằng có một hàm getDrafts trong class Firebase

![image](https://github.com/user-attachments/assets/ae83b274-ba56-402f-9244-fe726237b3d0)

Từ đoạn code trên ta thấy rằng để lấy được thông tin trong db cần phải có uid. Sao một hồi tìm kiếm mình có class Shared có instance firebase. Mình thử gọi instance này là lấy các giá trị của firebase

![image](https://github.com/user-attachments/assets/227828bd-d0e1-4876-a58f-d580a1b2632f)

Từ đây mình lấy được uid của các người dùng

Quay trở lại hàm getDBValues ta lấy được flag 

![image](https://github.com/user-attachments/assets/41cf6553-e261-46e0-8697-8f1c03084f67)




