# Under Construction
Truy cập vào trang web ta thấy một trang đăng nhập. Mình thử tạo tài khoản và đăng nhập vào.

![image](https://github.com/user-attachments/assets/95790394-0087-4120-a921-8099e6fecc92)

![image](https://github.com/user-attachments/assets/e1c25ff6-3508-49f9-a26f-51f9de8e7141)

Đây là trang sau khi mình đăng nhập vào. Mình quan sát thử có phần tên được hiển thị nên mình nghĩ có thể là XSS nhưng sau một hồi thử thì không được.

Quay lại trang đăng nhập mình cũng thử một số payload SQLi nhưng không thành công thôi thì đi đọc source code vậy

![image](https://github.com/user-attachments/assets/6a9f7985-1d6d-4a88-b8f0-8cdef702f9c3)

Quan sát cấu trúc mấy thấy có thư mục helper đáng chú ý với 2 file DBHelper.js và JWTHelper.js.

Vào đọc thử thì mình thấy rằng trong file DBHelper.js có một hàm không sử dụng tham số hóa nên rất có khả năng tồn tại SQLi

![image](https://github.com/user-attachments/assets/98507ecd-03f6-4e48-8194-2ca1026aff0a)

Trace ngược lại code mình thấy rằng hàm này được gọi đến khi chúng ta đăng nhập vào thành công

![image](https://github.com/user-attachments/assets/8225e812-fb46-44e4-b2b5-cbbe4a91888c)

Đến đây thì chúng ta đặt ra câu hỏi là làm thế nào để kiểm soát được username truyền vào. Mình củng thử inject từ quá trình tạo tài khoản nhưng không thành công do ở đây có sử dụng một đoạn code filter

![image](https://github.com/user-attachments/assets/7d838274-a75f-4237-841e-2ecb84cb3876)

Vậy thì phải làm như nào ?

Nhớ lại ở phần trên thì bài này có sử dụng JWT để authen.

![image](https://github.com/user-attachments/assets/0e70c8c3-771f-4758-a821-20cca0640bcb)

Mình thấy rằng jwt được kí bằng thuật toán RS256, và được xác thực bằng HS256. Tìm kiếm thuật toán này thì mình tìm được một CVE có liên quan đến RS256 và HS256. RS256 sử dụng khóa bí mật để kí và khóa công khai để xác thực. Còn HS256 sử dụng một khóa chung cho quá trình kí và xác thực.

Đến đây thì mình chỉ cần đổi thuật toán từ RS256 sang HS256 thôi. Sau một hồi mày mò thì mình tìm được công cụ jwt_tool. Cách dùng như sau:

> python3 jwt_tool.py <jwt> -I -pc <tên trường chèn> -pv <giá trí chèn> -X k -pk pub.key

**Chú ý nhớ loại bỏ dấu "\n" để đúng format key**
Giải thích các tham số:
* -I: inject new claims and update existing claims with new values
* -pc: Payload claim to tamper with
* -pv: Value (or file containing values) to inject into tampered payload claim
* -X: eXploit known vulnerabilities:
  * a = alg:none
  * n = null signature
  * b = blank password accepted in signature
  * s = spoof JWKS (specify JWKS URL with -ju, or set in jwtconf.ini to automate this attack)
  * k = key confusion (specify public key with -pk)
  * i = inject inline JWKS
* -pk: Public Key for Asymmetric crypto

![image](https://github.com/user-attachments/assets/18ba3bd9-c41e-4ff6-8eaa-12bb3b114c30)

Thử với -pv là "vanh" ta confirm được đã thành công thay đổi tên.

![image](https://github.com/user-attachments/assets/6e973392-3a96-4485-81f5-b22310a6fe4d)

Tiếp đến ta cần confirm SQLi

Mình thử với -pv là "' or '1'='1"

![image](https://github.com/user-attachments/assets/633aabde-ddd8-4761-b259-d54493329d87)

![image](https://github.com/user-attachments/assets/c8088150-1c49-4d5e-8b9a-44d1910ea595)

Xác nhận có SQLi

Tiếp đến ta cần xác định số cột

![image](https://github.com/user-attachments/assets/8c88d632-15d6-43fd-95a7-011724d72ec4)

Từ đây ta xác định có 3 cột

Tiếp đến ta lấy các các bảng

![image](https://github.com/user-attachments/assets/ee03ab1e-e73c-4f11-be3c-0a0d573c5591)

![image](https://github.com/user-attachments/assets/f89f0d92-15a0-42b5-b771-f8ee000ad26b)

Tiếp đến ta xác định tên cột trong bảng này

![image](https://github.com/user-attachments/assets/281486b0-b78b-4f22-8747-44097cdfb6c7)

![image](https://github.com/user-attachments/assets/175e7588-ca66-4e9d-b330-8fd39ad3a7cb)

Xác định được tên cột rồi lấy flag thôi

*Flag: HTB{d0n7_3xp053_y0ur_publ1ck3y}*



















