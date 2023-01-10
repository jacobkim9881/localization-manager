#!/bin/bash

source ./src/src.sh

RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
NC=$(tput sgr0)

for var in "$@"
	do
	if [[ $var =~ ".json" ]]; then
	echo $var will be translated into other language version $var.
	else
          echo "File format should have ${RED}.json${NC}." 
	  echo "The file you put: ${RED}$var${NC}." 

	  exit

	fi

	num=0
	
	while [[ "$num" -le $LangNumber ]];
	# $num is the number of countries to translate

	do /usr/bin/expect <<- EOF

		spawn node ./src/index.js $num $var

		expect {file is written} {

		sleep 0.3 

		send {echo ${GREEN}A language is finished.${NC}\r}

		}		

	EOF

	num=$((num + 1))

	done

	sleep 1

done

echo "Script done."
