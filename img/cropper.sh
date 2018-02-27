left=$1_Left.JPG
right=$1_Right.JPG
sides=( $left $right )
rm cropped/*
convert $left -crop 700x1200+1160+1075  cropped/$right
convert $right -crop 300x1200+3923+1176  cropped/$left

convert cropped/$right -alpha set -virtual-pixel transparent  -channel A -blur 0x30 -level 50%,100% +channel cropped/${right%.JPG}.png
convert cropped/${right%.JPG}.png -resize 96.88% cropped/${right%.JPG}.png
convert $right cropped/${right%.JPG}.png -geometry +1165+1110 -composite portalsRemoved/$right

convert cropped/$left -alpha set -virtual-pixel transparent  -channel A -blur 0x30 -level 50%,100% +channel cropped/${left%.JPG}.png
convert cropped/${left%.JPG}.png -resize 96.88% cropped/${left%.JPG}.png
convert $left cropped/${left%.JPG}.png -geometry +3928+1211 -composite portalsRemoved/$left
