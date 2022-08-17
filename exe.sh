#!/bin/bash

#language num: 102
#korean 49

RED=$(tput setaf 1)
NC=$(tput sgr0)

for var in "$@"
	do
	
	echo $var

	if [[ $var == *".json"* ]]; then
	  echo $var will be translated into other language version $var.
	else
          echo "File format should have ${RED}.json${NC}." 
	  echo "The file you put: ${RED}$var${NC}." 

	  exit
	fi

	num=0
	
	while [[ "$num" -le 0 ]];

	do /usr/bin/expect <<- EOF

		spawn node index.js $num $var

		expect {file is written} {

		sleep 0.3 

		send "echo A language is finished.\r"

		}		

	EOF

	num=$((num + 1))

	done

	sleep 1

done
echo "Script done."
