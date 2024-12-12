# NSLookup (Level 2)

Mình thử ";" kế hợp với lệnh "id" để thử và thấy báo lỗi. Trong terminal linux có thể dùng dấu "`" hoặc "'" để thực thi lệnh.

Mình thử với payload là '; id' và thấy có thể thực hiện lệnh

Mình thấy flag nằm ở thư mục trược thư mục hiện tại nên mình dùng lệnh cat để đọc flag

Payload: *'; cat ../flag.txt'*

*Flag: CHH{C0mmandInj3ct1onWthString_02c1290002e3bb66cd93330311bf5aaf}*