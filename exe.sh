#!/bin/bash

source src.sh

RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
NC=$(tput sgr0)

if [[ -e $@ ]]; then
	  echo "${GREEN}Script started.${NC}" 
	else
          echo "${RED}File should be put.${NC} You can not execute this program without putting json file after .exe.sh." 
	  echo "Example: ${RED}./exe.sh translate.json${NC}" 

	  exit

fi


for var in "$@"
	do

	if [[ $var == *".json"* ]]; then
	  echo $var will be translated into other language version $var.
	else
          echo "File format should have ${RED}.json${NC}." 
	  echo "The file you put: ${RED}$var${NC}." 

	  exit
	fi

	num=0
	
	while [[ "$num" -le $LangNumber ]];

	do /usr/bin/expect <<- EOF

		spawn node index.js $num $var

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
