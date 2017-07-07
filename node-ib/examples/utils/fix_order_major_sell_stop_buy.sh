#!/bin/bash
NUM_TO_ADD=$(echo "$1%0.000050" | bc 2>&1)

#echo "$NUM_TO_ADD"
NEW_CALCULATED_ORDER=$(echo "$1 + 0.000050 -$NUM_TO_ADD "| bc | awk '{printf "%f", $0}'  2>&1) 
if [[ $NUM =~ error || $? -ne 0 ]]
then
    echo bad
    exit
fi
echo "$NEW_CALCULATED_ORDER"
#return "$NEW_CALCULATED_ORDER"
