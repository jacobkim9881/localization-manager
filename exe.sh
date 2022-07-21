#!/bin/bash

num=0

while [[ "$num" -le 102 ]]; do

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
