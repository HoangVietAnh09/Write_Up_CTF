# [Day 1] Web Exploitation A Christmas Crisis
What is the name of the cookie used for authentication?

```auth```

In what format is the value of this cookie encoded?

```Hexadecimal```

Having decoded the cookie, what format is the data stored in?

```JSON```

What is the value of Santa's cookie?

```7b22636f6d70616e79223a22546865204265737420466573746976616c20436f6d70616e79222c2022757365726e616d65223a2273616e7461227d```

What is the flag you're given when the line is fully active?

```THM{MjY0Yzg5NTJmY2Q1NzM1NjBmZWFhYmQy}```

# [Day 2] Web Exploitation The Elf Strikes Back!
What string of text needs adding to the URL to get access to the upload page?

```?id=ODIzODI5MTNiYmYw```

What type of file is accepted by the site?

```Image```

In which directory are the uploaded files stored?

```/uploads/```

What is the flag in /var/www/flag.txt?

Payload: ./payload.png.php

```THM{MGU3Y2UyMGUwNjExYTY4NTAxOWJhMzhh}```

# [Day 3] Web Exploitation Christmas Chaos

What is the flag?

```THM{885ffab980e049847516f9d8fe99ad1a}```

# [Day 4] Web Exploitation Santa's watching

Given the URL "http://shibes.xyz/api.php", what would the entire wfuzz command look like to query the "breed" parameter using the wordlist "big.txt" (assume that "big.txt" is in your current directory)

```wfuzz -c -z file,big.txt http://shibes.xyz/api.php?breed=FUZZ```

Use GoBuster (against the target you deployed -- not the shibes.xyz domain) to find the API directory. What file is there?

```site-log.php```

Fuzz the date parameter on the file you found in the API directory. What is the flag displayed in the correct post?

```THM{D4t3_AP1}```

# [Day 5] Web Exploitation Someone stole Santa's gift list!

Without using directory brute forcing, what's Santa's secret login panel?

```/santapanel```

How many entries are there in the gift database?

```a```



