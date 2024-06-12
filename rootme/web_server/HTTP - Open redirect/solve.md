# HTTP - Open redirect

Mình thử inspect các button thì thấy khi mình bấm nút client sẽ sử dụng phương thức GET với tham số url có giá trị chính là url của trang web đó và tham số h với giá giá của url đó được encode md5
mình thử thay đổi 1 nút bấm thành ```?url=https://google.com&h=99999ebcfdb78df077ad2727fd00969f``` thì thấy trang web hiện ra flag sau đó redirect sang một trang khác. Mình dùng burpsuite để proxy và đọc flag

*Flag: e6f8a530811d5a479812d7b82fc1a5c5*
