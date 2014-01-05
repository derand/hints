#!/bin/sh
#
# example ./getpage.sh www.derand.net 80 www.derand.net / | telnet
#

echo "open $1 $2"
sleep 2
echo "GET $4 HTTP/1.0"
echo "User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.4) Gecko/20070515 Firefox/2.0.0.4"
echo "Host: $3"
echo "Accept-Language: en-us"
#echo "Accept-Encoding: gzip, deflateecho"
echo
sleep 2
