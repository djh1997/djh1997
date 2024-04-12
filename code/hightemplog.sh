#!/usr/bin/env bash

#set constants
LOG=temp.log
while [ true ]; do
  
  #get values
  temp=$(cat /sys/class/thermal/thermal_zone0/temp)
  if(($temp >= 50000)); then 
  date=$(date)
  echo $temp','$date >>$LOG; 
  fi
  sleep 10

done
