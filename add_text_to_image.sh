#!/bin/bash

# 'convert' utilite from Imagemagic

#convert ./clean_data/055.PNG -fill '#000C' -pointsize 17 -annotate +280+108 '055' 055_anno.png
for i in `ls clean_data`
do
	id=${i%.*}
	fn="clean_data/${i}"
	fn_out="$id.png"
	echo $id
	convert $fn -fill '#000C' -pointsize 17 -annotate +280+108 $id $fn_out
done
