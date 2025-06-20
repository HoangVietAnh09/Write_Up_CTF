# Fotune_Teller
Sau khi cài đặt thành công ta kiểm thử một số chức năng của ứng dụng

![image](https://github.com/user-attachments/assets/bf04f742-bdeb-48d0-84c5-1c4b3a865278)

Sau một hồi thử thì mình đoán rằng có thể khi mình nhập đúng input thì có thể lấy được flag

Mình sử dụng jadx để diassem và đọc source code

![image](https://github.com/user-attachments/assets/91c8359f-0059-44f7-9f42-e1a01e17f29a)

Điều đầu tiên cần làm là đọc hàm MainActivity

Ở đây ta thấy rằng đoạn code sử lí sự kiện sẽ nằm trong hàm guess()

![image](https://github.com/user-attachments/assets/84fbe02e-71bc-4674-896b-16a613197d94)

Đọc tiếp ta thấy rằng ứng dụng sẽ thực hiện so sánh input mình nhập vào với correctString

![image](https://github.com/user-attachments/assets/3cc516b9-42fc-4ae3-ba58-38d1f201d570)

Được rồi bây giở câu hỏi đặt ra là làm sao để biết được correctString ?

Sau một hồi đọc code mình tìm được hàm có tên là setCorrectString(String str). Hàm này có chức năng là set correctString. Đến đây thì việc của mình là sử dụng frida để hook vào hàm này và lấy giá trị str truyền vào thôi.

Mình sử dụng đoạn script bên dưới để hook và in ra kết quả của biến str được truyền vào hàm

![image](https://github.com/user-attachments/assets/418dc6a3-9878-4d1a-8d79-69b2414516df)

Sau đó việc cần làm tiếp theo là submit lại correctString thôi

![image](https://github.com/user-attachments/assets/ab1a155c-be9b-4c9a-888c-35cd8cd00c9a)






