# GoWarmup

Đọc qua source code thấy một số route chính như sau:
* /api/v1/register: dùng để đăng kí một user mới
* /api/v1/login: dùng để đăng nhập
* /api/v2/data: dùng để xem data với role của admin

## /api/v1/register

<img width="948" height="597" alt="image" src="https://github.com/user-attachments/assets/82fd000e-5872-4644-bb5b-f928bee9e40d" />

Ở đoạn code trên thấy rằng ứng dụng nhận vào username và passowrd để đăng kí một user mới. Kiểm tra nếu username hoặc passowrd rỗng thì thông báo lỗi. Nếu username và password không rỗng thì ứng dụng sẽ lấy collection **user** của csdl. Sau đó thực hiện kiểm tra xem username đã tồn tại chưa. Nếu chưa tồn tại thì lưu username và password được băm vào csdl.

## /api/v1/login

<img width="891" height="451" alt="image" src="https://github.com/user-attachments/assets/7cad40ac-0cd0-4642-8b6b-27ba42476a64" />

Ở đoạn code xử lý logic login thấy rằng ứng dụng thực hiện truy vấn theo username.

## /api/v2/data

<img width="961" height="515" alt="image" src="https://github.com/user-attachments/assets/197b8f74-95c0-438e-9ce7-196d839a94f1" />

Quan sát đoạn code trên thấy rằng ứng dụng thực hiện filter. Ở đây tồn tại lỗ hổng NoSQL injection.


Test thử các api thấy rằng sau khi đăng kí một tại khoản thì người dùng sẽ được phân role rỗng và tức nhiên không có quyền truy cập /api/v2/data

<img width="1250" height="576" alt="image" src="https://github.com/user-attachments/assets/a0b6ee00-6a4a-47ef-948e-f4218da8bf84" />

<img width="1686" height="548" alt="image" src="https://github.com/user-attachments/assets/772daf88-87f2-4732-a5fe-cac517d558d2" />

<img width="1030" height="445" alt="image" src="https://github.com/user-attachments/assets/507368e8-f2c6-47b1-ad26-3b413d6362ac" />

## Khai thác 

Từ đây ta có thể hình dung được hướng khai thác sẽ là:
* Leo thang đặc quyền lên admin
* Khai thác lỗ hổng NoSQLi

Kiểm tra thử jwt thì thấy rằng key được sinh ra ngẫu nhiên nên việc brute force là không thể

<img width="490" height="108" alt="image" src="https://github.com/user-attachments/assets/3bc525ea-b3a3-44da-a633-1f9dde5f9084" />

Thử thay đổi thuật toán thành none cũng không khả thi do jwt kí bằng HS256

<img width="572" height="226" alt="image" src="https://github.com/user-attachments/assets/083011e3-e664-4999-88c3-75de51f699c0" />

Sau một hồi đọc code thì phát hiện ra rằng, hàm register không hề kiểm tra số lượng tham số truyền vào. Hàm register chỉ kiểm tra username và password sau đó lưu vào csdl.
Từ đây mình có thể thực hiện chèn các trường trong model user vào cơ sở dữ liệu một cách tùy ý.

<img width="910" height="610" alt="image" src="https://github.com/user-attachments/assets/e724ebac-a292-4c57-8b40-2e1c5c8bf7f8" />

<img width="516" height="207" alt="image" src="https://github.com/user-attachments/assets/683d713c-4e19-4b91-a691-9ba8e3357539" />

Mình thử chèn thêm trường role với giá trị là admin khi thực hiện tạo mới user và tạo thành công user.

<img width="1012" height="470" alt="image" src="https://github.com/user-attachments/assets/72073022-ae9c-42bd-b475-d9fc3bbe423f" />

Thực hiện login thấy rằng role đã được cập nhật thành admin

<img width="1750" height="594" alt="image" src="https://github.com/user-attachments/assets/5fa7591d-8572-4472-8afa-49756511775b" />

Thực hiện truy vấn đến data và đã thành công

<img width="1012" height="432" alt="image" src="https://github.com/user-attachments/assets/83c269da-0567-4160-ae63-051f8bf38643" />

Bây h điều cần là thực hiện NoSQL Injection để lấy flag

Từ đoạn code xử lý logic data thấy rằng giá trị truyền vào qua biến filter sẽ được ghép vào câu truy vấn dạng json

<img width="967" height="509" alt="image" src="https://github.com/user-attachments/assets/967f9f55-cdbd-4383-a264-c04e5c998178" />

Sau đó sẽ đếm số bản ghi thu được từ câu truy vấn và hiển thị ra response

<img width="952" height="459" alt="image" src="https://github.com/user-attachments/assets/6f9ef026-2fc4-4492-bbb4-ff07700d2934" />

Đến đây mình đoán là sẽ phải dùng boolean base để khai. Nhưng một vấn để khác nảy sinh là input được đặt vào trong giấu "" làm sao để có thể escape được ? Bởi vì thường khi sủ dụng boolean base NoSQL sẽ thường sử dụng các toán từ $regex, $gt, $ne, ...

Các toán từ này yêu cầu form dạng ```"username":{"$ne":"abc"}```. Sau một hồi thử thì mình thấy rằng khi truyền vào 2 key thì giá trị server sẽ xử lý theo key thứ 2.

Từ đây hình hay payload sẽ là ```", "address":{"$regex":"^H"}, "role":"guest```

<img width="1504" height="611" alt="image" src="https://github.com/user-attachments/assets/b0ca663c-7101-4a20-9f49-3dc056db10df" />

<img width="1542" height="594" alt="image" src="https://github.com/user-attachments/assets/1af60b49-b21c-480f-9f92-0bf65c271f22" />

Việc tiếp theo là đi viết code bruteforce thôi






