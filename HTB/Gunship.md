# Gunship

Tổng quan về challenge này yêu cầu chúng ta nhập tên của 1 trong 3 nhân vật cho trước rồi hiện ra dòng chữ nếu khớp.

![image](https://github.com/user-attachments/assets/865bcb21-14ea-4533-a84e-0a7e841fd473)


Nhìn qua thì mình không thấy tiềm ẩn lỗ hổng ở đâu cả. Mình thử kiểm tra các dependency mình thấy rằng web đang sử dụng thư viện flat 5.0.0 và thư viện này đang dính một lỗ hổng bảo mật.

![image](https://github.com/user-attachments/assets/eca67503-08f2-477a-b72e-acdf9af8933c)


# Cây AST trong NodeJS

![image](https://github.com/user-attachments/assets/e3d53691-b133-4b85-87f7-a7e73b39b03c)

Trong nodeJS, AST được sử dụng trong JS thường xuyên như một template engine. 

Với template engine, cấu trúc được thể hiện trong hình dưới đây

![image](https://github.com/user-attachments/assets/f3a44af9-66f5-4711-94db-748a0c381e80)

Nếu lỗ hổng prototype pollution tồn tại trong ứng dụng JS. Bất kì AST nào có thể được chèn vào trong hàm bằng cchs chèn nó vào trong quá chuyển Parser or Compiler.

Bạn có thể chèn AST vượt qua filter của input mà không được verified bởi lexer hoặc parser.


# Source
* https://github.com/abhiabhi2306/prototype-pollution
* https://web.archive.org/web/20200805011445/https://blog.p6.is/AST-Injection/
* https://rayepeng.net/AST-Injection--Prototype-pollution-to-RCE?locale=en
