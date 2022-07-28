### How to iterate arguments in shell script
Let's say you put arguments while executing `./exe.sh 1 2 3 4'. `1 2 3 4` will be arguments for sript. To iterate them in script, use `$@`,

```

for var in "$@"
do
    echo "$var"
done

```
