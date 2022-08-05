#!/bin/bash

#language num: 102
#korean 49
for var in "$@"
	do
	
	num=0
	
	while [[ "$num" -le 0 ]];

	do /usr/bin/expect <<- EOF

		spawn node index.js $num $var

		expect {file is written} {

		sleep 0.3 

		send "echo A laguage is finished.\r"

		}		

	EOF

	num=$((num + 1))

	done

	sleep 1

done
echo "Script done."
