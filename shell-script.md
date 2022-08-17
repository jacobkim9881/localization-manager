### How to iterate arguments in shell script
Let's say you put arguments while executing `./exe.sh 1 2 3 4'. `1 2 3 4` will be arguments for sript. To iterate them in script, use `$@`,

```

for var in "$@"
do
    echo "$var"
done

```

### "too many arguments" while executing if condition in shell script
You ran script but got an error `line x: [: too many arguments`,

```

if [ "$var" == *".json"*]]; then
  echo $var exists.
fi


```

this should work but not worked for my script, so I found a solution like,


```

if [[ $var == *".json"* ]]; then
  echo $var exists.
fi

```

### How to color output in shell script
You can use tput to color output in shell script.

```

RED=$(tput setaf 1)
NC=$(tput sgr0)

echo "color ${RED}this${NC}." 

```
