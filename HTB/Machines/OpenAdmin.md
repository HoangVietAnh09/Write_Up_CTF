# OpenAdmin
Như mọi bài khác bước đầu tiên mình làm là sử dụng nmap để scan các port đang mở

![image](https://github.com/user-attachments/assets/5e3f48e3-e4f4-42b4-bb78-78f4b41e849a)

Mình thử vào trang web và dạo một vòng xem có gì đặc biệt không thì mình thấy rằng không có gì đặc biệt lắm

Sau đó mình sử dụng dirsearch để tìm kiếm các thư mục. Sau khi hoàn tất quá trình scan thì mình thấy có một số đường dẫn đáng chú ý ở dưới đây

![image](https://github.com/user-attachments/assets/1ac1314f-be34-44e7-9e0c-ae39894441ee)

Mình thử truy cập vào path /music và vẫn không thấy gì. Sau đó mình thử vào path /oan thì thu được một số thông tin là web đang sử dụng OpenNetAdmin v18.1.1. Mình thử tìm kiếm các thông tin về version này và biết được rằng ứng dụng này có tồn tại lỗ hổng bảo mật cho phép mình RCE với mã là CVE-2019-25065.
Đây là [POC](https://www.exploit-db.com/exploits/47691) mà mình tìm được. 

![image](https://github.com/user-attachments/assets/a6e0c777-6487-4bd6-998f-be8136ae2154)

Sau khi chạy POC mình đã có thể thực thi mã thành công. Sau một hồi tìm kiếm mình tìm thấy thông tin đăng nhập DB trong file local/config/database_settings.inc.php

![image](https://github.com/user-attachments/assets/5eb4b3fa-5864-4de7-afcc-55f8b5e50df8)

Tiếp đến mình thấy có 2 thư mục của user trong server là jimmy và joanna

![image](https://github.com/user-attachments/assets/6a03e86d-12cb-4251-b08c-0c26f35a1e4f)

Bởi vì server còn sử dụng ssh nên mình cũng thử login với username là jimmy và joanna và password vừa tìm được ở trên thì mình đã có thể đăng nhập được với user jimmy.
Nhưng user này không chứa flag 

![image](https://github.com/user-attachments/assets/b5820010-8539-49fb-a73f-bb295ab85052)

Đến đây thì mình ngồi nghịch với user này nhưng sau một hồi tìm kiếm không thấy có gì. Bí quá nên mình đi tham khảo thì biết được rằng trong đường dẫn /var/www có tồn tại một thư mục cấu hình webserver chỉ cho phép truy cập nội bộ.

![image](https://github.com/user-attachments/assets/4061ab1c-c31f-4103-ae28-35526abbbe41)

Đọc các file này mình tìm được một creadential có dạng mã hash trong file index.php

![image](https://github.com/user-attachments/assets/1b5ec68f-cb3a-4d7d-9fe4-8eb22d933eb2)

Mình sử dụng [Crackstation](https://crackstation.net/) để crack hash và thu được bản rõ

![image](https://github.com/user-attachments/assets/ff57bfa7-dc76-4cfd-84c6-44dd57a7b016)

Đọc tiếp các file còn lại thì thấy trong hàm main.php có một đoạn đọc private key của cái web nội bộ kia

![image](https://github.com/user-attachments/assets/323e7869-01cf-49f2-b363-3ef663d78ec8)

Nhưng mình không biết web internal này hoạt động ở port nào. Như lúc đầu ta biết rằng web đang sử dụng apache nền mình vào thư mục /etc/apache2. Từ đây mình biết được rằng web nội bộ kia đang chạy ở port 52864

![image](https://github.com/user-attachments/assets/738d72fb-6393-4404-abd5-19fa5d7be9a1)

Mình thấy rằng ứng dụng có được cài đặt curl nên mình sử dụng curl để gọi đến website từ user jimmy

![image](https://github.com/user-attachments/assets/c9447c32-bb23-4933-820a-30886e7e93e1)

Sau đó mình coppy đoạn key này rồi sử dụng ssh2john để chuyển sang dạng hash của private key.

![image](https://github.com/user-attachments/assets/10569c8b-0e93-4d33-a91b-0773b113d02a)

Sau đó mình sử dụng john đê crack với wordlist rockyou.txr và lấy được passphrase

Việc tiếp theo cần làm là ssh vào user joanna và đọc flag thôi.

Như các bài khác thì mình sử dụng `sudo -l` để liệt kê các lệnh có thể chạy với quyền root mà không cần mật khẩu

![image](https://github.com/user-attachments/assets/eb283f28-478b-4c3f-add8-1f01fe14142b)

Từ đây mình thấy rằng nano có thể chạy với quyền root mà ko cần pass. Mình tìm được payload ở đây [GTFOBins](https://gtfobins.github.io/gtfobins/nano/)

![image](https://github.com/user-attachments/assets/60626660-c0cd-4164-98e0-7e6bf650217e)

Leo thang lên root thành công

















