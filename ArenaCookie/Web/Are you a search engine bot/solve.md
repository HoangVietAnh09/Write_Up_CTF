# Are you a search engine bot

Khi truy cập vào chall ta thấy 1 dòng text hiện ra

![alt text](image.png)

Mình đoán ngay bài này có liên quan đến User_Agent trong request header
Kết hợp với tên đề bài thì mình có thể đoán được User_Agent khả năng cao sẽ là **GoogleBot**
Dùng burpsuite để proxy request và thay đổi như trên và mình lấy được flag

*Flag: CHH{Ar3_Y0u_Unders7and_UserAg3nt_c9a03e54d2740a3a819c1319856f6e18}*
