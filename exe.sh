#!/bin/bash

source ./src/src.sh

RED=$(tput setaf 1)
GREEN=$(tput setaf 2)
NC=$(tput sgr0)

recursive()
	{
		var=$1
	test1=$(echo -n $var)

	if [[ -d $var ]]; then
	echo It is a directory. : $var
	for var2 in "$var"/*
	do	
		recursive $var2
		echo dir
	done	
	continue

	elif [[ ! $var =~ ".json" ]]; then
		echo "it is not json format"
	continue

	elif [[ $var =~ ".json" ]]; then
	echo $var will be translated into other language version $var.
	
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

	fi
}

for var1 in "$@"
do
echo target is $@
echo will execute function for $var1
recursive $var1
	
done	
echo "Script done."
