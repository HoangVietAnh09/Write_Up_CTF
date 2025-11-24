# Emoji

Nhìn sơ qua bài thấy rằng ứng dụng có 2 route chính là route / cho phép truyền vào 2 emoji sau đó sẽ trả về emoji được kết hợp từ 2 emoji input và route /search

<img width="1000" height="444" alt="image" src="https://github.com/user-attachments/assets/312ec3b6-e5e7-4609-8db5-929e888d3bed" />

<img width="1069" height="416" alt="image" src="https://github.com/user-attachments/assets/8f6ed2ad-d0e0-43a3-a1d7-a62b8a223e0d" />

## Route /
Đọc mã nguồn của ứng dụng với route / ứng dụng nhận vào 2 input. Sau khi kết hợp 2 emoji ứng dụng sử dụng blacklist để ngăn chặn một số kí tự.

Sau đó combo và result sẽ được lưu vào trong db.

<img width="737" height="476" alt="image" src="https://github.com/user-attachments/assets/0f4cff22-1e2c-48ed-bfc8-54d6f7107191" />

Để tạo ra combo ứng dụng có sử dụng 1 model AI để sinh ra combo theo promt cho trước

<img width="1865" height="615" alt="image" src="https://github.com/user-attachments/assets/0c9eccdd-c35c-4a5c-852f-3159a262d14d" />

## Route /search
Với route /search ứng dụng thực hiện tìm kết quả nếu trong combo hoặc result có chứa input. Nếu tồn tại, thực hiện lấy combo và kết quả hiển thị ra màn hình. Ở đây thấy rằng ứng dụng tồn tại lỗ hổng SQL injection ở truy vấn thứ 2.

<img width="1217" height="290" alt="image" src="https://github.com/user-attachments/assets/a2d93eeb-fde3-4985-a90b-361d4651b0d8" />

## Hướng khai thác
Từ đây thấy rằng phải chèn kí tự nháy đơn ' vào tìm kiếm. Để mà câu truy vấn thứ 2 có thể thực hiện thì trong kết quá hoặc các input đầu vào của route / phải chứa dấu nháy đơn. Từ đây chỉ có 3 khả năng, 1 là trong input route / phải có dấu nháy đơn hoặc kết quả đầu ra phải chứa dấu nháy đơn hoặc cả 2 đều phải có. Tuy nhiên ứng dụng sử dụng mô hình AI nên kết quả mỗi lần sinh ra đều khác nhau vậy làm gì để control được output.

Xem trong log khi chạy docker và [tìm kiếm trên google](https://www.robustintelligence.com/blog-posts/prompt-injection-attack-on-gpt-4) thấy rằng ứng dụng các cụm <|im_start|>assistant, <|im_start|>, <|im_end|> để thực hiện modify output.

<img width="848" height="162" alt="image" src="https://github.com/user-attachments/assets/8b971d4a-8b10-49d7-b8d1-008e88a9759b" />

Nhìn vào đoạn log trên thấy rằng oupt của mô hình ai sẽ được bọc trong thẻ <|im_start|> và <|im_end|>. Lơi dụng các thẻ này ta có thể thao túng đầu ra của mô hình để nó trả về kết quả mong muốn ở mà input nhập vào

Vì ứng dụng kết hợp cả 2 input nên input thứ 2 phải chứa promt để điều hướng mô hình không sinh ra emoji do mô hình luôn mặc định sinh ra emoji. Từ đây hướng xây dựng payload sẽ là:

* input thứ 1 gồm promt chứa các thẻ để trigger mô hình AI và payload khai thác SQLi
* input thứ 2 gồm promt để tigger mô hình AI không sinh emoji

Thử một số promt thấy rằng output của model AI đã có thẻ control từ input của người dùng truỳen vào

<img width="1281" height="488" alt="image" src="https://github.com/user-attachments/assets/094806fb-dc24-46b3-9817-f09f6aedef19" />

<img width="1288" height="679" alt="image" src="https://github.com/user-attachments/assets/fa3ea00b-f77a-40e2-b889-ab9be7be1233" />

Thực hiện tìm kiếm theo từ khóa "Ignore" thấy rằng ứng dụng trả về kết quả đầu ra của bước trước

<img width="1308" height="696" alt="image" src="https://github.com/user-attachments/assets/9d6fe960-5d8a-4b7a-ba6a-048b66c3e964" />

Tuy nhiên phát sinh một vấn đề khác là ứng dụng đã thực hiện blacklist đầu vào nên không thể truyền trực tiếp các ksi tự nháy đơn, -- vào input.

Qua quá trình tìm hiểu và đi hỏi thì biết được rằng các kí tự nháy đơn có thể được thay thế bằng dấu ʼ và dấu -- có thể được thay thế bằng －－

<img width="1280" height="681" alt="image" src="https://github.com/user-attachments/assets/40c2b99f-1709-44dc-98ac-da10a0ea8d64" />

<img width="1306" height="760" alt="image" src="https://github.com/user-attachments/assets/dcd7b64b-5b5a-476d-aa37-2feebb6abc6c" />

Tiếp tục test với subquery

<img width="1743" height="719" alt="image" src="https://github.com/user-attachments/assets/12941756-0ba5-4a6a-bdfb-2dc29402b4cc" />

<img width="1744" height="631" alt="image" src="https://github.com/user-attachments/assets/0cc5c9ed-c76d-475e-9163-f9ed29b5d71c" />

Từ Dockerfile thấy rằng flag được lưu trong file random nên ở đây sẽ sử dụng hàm để đọc file trong duckdb

Thực hiện viết câu truy vấn để đọc toàn bổ các file trong thư mục hiện tại

<img width="1863" height="752" alt="image" src="https://github.com/user-attachments/assets/055e2b66-25cd-4a9d-bf35-c77aa0dbb226" />

Thực hiện tìm kiếm thấy rằng câu lệnh đã được thực thi trả về nội dung của tất cả các file trong thư mục hiện tại

<img width="1858" height="757" alt="image" src="https://github.com/user-attachments/assets/66562025-1467-4533-a519-96ff0026185e" />

Tiếp tục lùi thư mục lấy được flag

<img width="1878" height="763" alt="image" src="https://github.com/user-attachments/assets/61fc27b4-c851-4dcc-981e-c68f72216dfb" />

Giá trị của flag.

<img width="1868" height="753" alt="image" src="https://github.com/user-attachments/assets/f7a296c7-d0ab-4729-be6a-3a18273e8625" />

***Lưu ý: vì là mô hình AI nên không chắc chắn ra được output mong muốn, phải thử nhiều lần để có được payload chính xác. Mình nghĩ rằng bài này có thể promt chi tiết để model AI sinh chuỗi chính xác hơn.***

**Respect anh Thiện đã "mớm" cho e bài này**

> Source
> https://medium.com/hackernoon/%CA%BC-%C5%9B%E2%84%87%E2%84%92%E2%84%87%E2%84%82%CA%88-how-unicode-homoglyphs-will-break-your-custom-sql-injection-sanitizing-functions-1224377f7b51
> https://www.robustintelligence.com/blog-posts/prompt-injection-attack-on-gpt-4
> https://www.compart.com/en/unicode/U+FF0D





