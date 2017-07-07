#!/bin/bash
NUM=$(echo "$1%0.000050" | bc 2>&1)
if [[ $NUM =~ error || $? -ne 0 ]]
then
    echo bad
    exit
fi
echo "$NUM"

