# jninjaspeak

Tải app và mở lên thôi

![image](https://github.com/user-attachments/assets/cad5cfea-787a-4c5d-b39c-860a7bc23a60)

Thử nhập linh tinh vào thấy input được decode

Thử dùng jadx để đọc code ta thấy rằng đoạn input ta nhập vào sẽ được translate ở hàm translatePress(View v)

![image](https://github.com/user-attachments/assets/126ad8ab-1fbf-42ce-8bad-6a8432d20b9d)

Ta thấy rằng code có sử dụng một thư viện native bởi vì ta quan sát được đoạn khai báo này

![image](https://github.com/user-attachments/assets/d385a46a-5b16-4273-81cf-72d4f5a3651e)

Thử sử dụng apktool để unpack file apk sau đó bỏ file lib được export vào IDA hoặc Ghidra

Tìm đến file có tên là Java_com_nahamcon2023_jninjaspeak_MainActivity_translate ta lấy được flag

![image](https://github.com/user-attachments/assets/be6ffb3c-9404-4344-9dc2-bbe698874609)

Nhìn vào tên hàm trên ta thấy rằng **Java_com_nahamcon2023_jninjaspeak** là package của ứng dụng, **MainActivity** là class MainActivity, **translate** là tên hàm được khai báo trong code java

