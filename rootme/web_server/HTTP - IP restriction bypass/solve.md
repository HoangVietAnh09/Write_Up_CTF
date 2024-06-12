# HTTP - IP restriction bypass

Ta thử thay đổi địa chỉ của chúng ta thành địa chỉ default gateway 
Trong http header có một trường thay đổi địa chỉ của mình là ```X-Forwarded-For```
Mình sẽ dùng burpsuite để bắt request sau đó dùng chức năng repeater để thêm ```X-Forwarded-For:192.168.1.1``` vào header

*Flag: Ip_$po0Fing*