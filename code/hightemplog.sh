#!/usr/bin/env bash

#set constants
OF=/var/www/html/mon.html
MT=/var/www/html/magtag.json
LOG=/var/www/html/temp.csv
while [ true ]; do


sizesd=$(df -h / --output=size | egrep -o  '.[0-9]+')
  usedsd=$(df -h / --output=used | egrep -o  '.[0-9]+')
  pcentsd=$(df / --output=pcent | egrep -o  '[0-9]+')
  size=$(df --block-size=1GB 14tb/ --output=size | egrep -o  '.[0-9]+')
  used=$(df --block-size=1GB 14tb/ --output=used | egrep -o  '[0-9]+')
  seed=$(du -s --block-size=1GB 14tb/seed | head -c 4)
  pcent=$((($used*100)/$size))
  seedusedpcent=$((($seed*100)/$used))
  seedsizepcent=$((($seed*100)/$size))
  
for i in {0..360}; do
  #get values
  temp=$(cat /sys/class/thermal/thermal_zone0/temp)
  minrpm=1000
  maxrpm=5000
  uptime=$(uptime)
  tempc=$(vcgencmd measure_temp)

  load=$(uptime | tail -c 17 | head -c 4) #17 11 5
  loadnum=$((${load:0:1}*100+${load:2:1}*10+${load:3:1}))

  fanrpm=$((($temp)-23000))
  
  if (($loadnum >= 150)); then 
  	#fanrpm=$((($fanrpm+(($loadnum)-100))))
  	fanrpm=$(($fanrpm+$loadnum))
  fi


  if (($fanrpm >= $maxrpm)); then
    fanrpm=$maxrpm
  elif (($fanrpm <= $minrpm)); then
    fanrpm=$minrpm
  else
  	fanrpm=$fanrpm
  fi

  fanpwm=$((($fanrpm)/5))
  gpio pwm 1 $fanpwm
  #gpio pwm 1 1024
  

  echo '{"temp":'$temp',"ups":999,"load":'$load',"fan":'$fanrpm',"seed":'$seedsizepcent',"torrent":"'$torrent'","used":'$pcent',"uptime":"'$uptime'","sdpcent":'$pcentsd'}' > $MT
echo $temp',' >>$LOG

  sleep 10

done
done