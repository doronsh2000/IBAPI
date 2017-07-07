#!/bin/bash

/usr/bin/pgrep -f 'node reqHistData_5m_backup.js'
if [ $? -eq 0 ]; then
echo "process is running"
else 
  echo "not running"
  cd /IB_API/node-ib/examples && node reqHistData_5m_backup.js 
fi
