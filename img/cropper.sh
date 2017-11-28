left=$1_Left.JPG
right=$1_Right.JPG
sides=( $left $right )
rm cropped/*
convert $left -crop 240x1200+3923+1176  cropped/$left
convert $right -crop 240x1200+1260+1075  cropped/$right
for i in "${sides[@]}"
	#do convert $i -alpha set -virtual-pixel transparent -channel A -morphology Distance Euclidean:1,100\! +channel ${i%.JPG}.png
	 do
	   echo $i
	   convert cropped/$i -alpha set -virtual-pixel transparent  -channel A -blur 0x30 -level 50%,100% +channel cropped/${i%.JPG}.png
	   convert $i cropped/${i%.JPG}.png -geometry +50+50 -composite portalsRemoved/$i
   done
