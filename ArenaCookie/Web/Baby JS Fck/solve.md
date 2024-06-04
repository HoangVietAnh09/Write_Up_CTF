# Baby JS Fck

Bài này yêu cầu mình đăng nhập vào bằng uername, pasword và userrole để đăng nhập.
Check thử source code thì thấy 4 file js được decode bằng js fuck. Mình lên mạng tìm thử tool decode.
File đầu tiên khi decode ta sẽ lấy được ```uername = cookiehanhoan```

![alt text](image-1.png)

File thứ 2 ta thấy được 1 func reverse lại một xâu

![alt text](image-2.png)

File thứ 3 cung cấp cho chúng ta password sau khi đã được reverse. Điều chúng ta cần là tab console lên và sử dụng hàm reverseString để reverse ngược lại password và ta lấy được ``` pasword = sup3rSercur3p@ssW0rd ```

![alt text](image-3.png)

File thứ 4 cung cấp cho chúng ta userrole bằng cách các kí tự ở từng vị trí của userrole

![alt text](image.png)

Sau khi ghép các kí tự ta được ```userrole = @dmiN```

Đăng nhập vào và lấy flag thôi.

*Flag: CHH{J5fuCk_is_s0_mE5s_ad39dbe21de1d26f87c85ecc1d07115b}

*