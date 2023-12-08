#!/usr/bin/env bash

#set variables

word=$(head -c 11 /home/pi/sha/sha.txt)
sha=$(sha256sum /home/pi/sha/sha.txt)


OF=/var/www/html/'$word'.html

echo  '<!DOCTYPE html>
<html>
<body>
<svg height="100%" width="100%">
  <text x="0" y="15" font-family="monospace">
  <tspan fill="#'${sha:0:6}'">'${word:0:1}'</tspan>
  <tspan fill="#'${sha:6:6}'">'${word:1:1}'</tspan>
  <tspan fill="#'${sha:12:6}'">'${word:2:1}'</tspan>
  <tspan fill="#'${sha:18:6}'">'${word:3:1}'</tspan>
  <tspan fill="#'${sha:24:6}'">'${word:4:1}'</tspan>
  <tspan fill="#'${sha:30:6}'">'${word:5:1}'</tspan>
  <tspan fill="#'${sha:36:6}'">'${word:6:1}'</tspan>
  <tspan fill="#'${sha:42:6}'">'${word:7:1}'</tspan>
  <tspan fill="#'${sha:48:6}'">'${word:8:1}'</tspan>
  <tspan fill="#'${sha:54:6}'">'${word:9:1}'</tspan>
  <tspan fill="#'${sha:60:4}'00">'${word:10:1}'</tspan>
  </text>
  </svg>
  </body>
  </html>' > $OF
