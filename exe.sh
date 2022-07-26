#!/bin/bash

num=0
#language num: 102
#korean 49
while [[ "$num" -le 0 ]]; do

/usr/bin/expect <<- EOF

spawn node index.js $num 

expect {file is written} {

sleep 1

send "echo A laguage is finished.\r"

}

expect eof

EOF

num=$((num + 1))

done
echo "Script done."
