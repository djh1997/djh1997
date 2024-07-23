#!/usr/bin/env bash
#set variables
word=$(head -c 11 sha.txt)
sha=$(head -c 11 sha.txt  | sha256sum)
OF='output/'$word'.svg'
echo  '<?xml version="1.0" encoding="utf-8"?><svg height="19" width="162" xmlns="http://www.w3.org/2000/svg"><text x="0" y="15" font-family="monospace">' > $OF
for i in  {0..10}; do
 if (($i != 10)); then
  echo '<tspan fill="#'${sha:$(($i*6)):6}'">'${word:$i:1}'</tspan>' >> $OF
 else
  echo '<tspan fill="#'${sha:$(($i*6)):4}'00">'${word:$i:1}'</tspan>' >> $OF
 fi
done
echo '</text></svg>' >> $OF
