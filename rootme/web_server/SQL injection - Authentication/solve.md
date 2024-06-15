# SQL injection - Authentication

Minh thử với payload ```' or 1=1-- -``` tương đương với query là ```Select * from users where username='' or 1=1-- -```
phần comment đã bypass đi password và username kiểm tra điều kiên luôn đúng.
Sau khi login thử inspect để lấy flag.
*Flag: TYsgv75zgtq*
