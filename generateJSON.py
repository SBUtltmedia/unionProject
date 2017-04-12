import os
import random
import json as js 
a= set()
size=25
rooms={}
b="""<?xml version="1.0" encoding="UTF-8"?>  
<svg xmlns="http://www.w3.org/2000/svg"  width="3000" height="3000">
"""
for (dirpath, dirnames, filenames) in os.walk("temo"):
    for JPG in filenames:
    
    	items = JPG.split(".")[0].split("_")[:-1]
    	if len(items)==3:
    	
    		if not items[0] in rooms:
    			rooms[items[0]]={}
    		rooms[items[0]]["room"]=items[1]
    		if not "spheres" in rooms[items[0]]:
    			rooms[items[0]]["spheres"]=set()
    		rooms[items[0]]["spheres"].add(items[2])

for key,val in enumerate(rooms):
	json={}
	json["spheres"]=[]
	preStem= val+"_"+rooms[val]["room"]
	for k,i in enumerate(rooms[val]["spheres"]):
		stem=preStem+"_"+i
		sphere={}
		sphere["leftImg"]=stem+"_Left.JPG"
		sphere["rightImg"]=stem+"_Right.JPG"
		sphere["markers"]=[]
		marker={}
		marker["x"]="0"
		marker["y"]="0"
		marker["z"]="0"
		marker["room"]="Lobby_100"
		marker["number"]="0"
		sphere["markers"].append(marker)
		json["spheres"].append(sphere)

	f = open(preStem+".json", 'w')
	f.write(js.dumps(json,sort_keys=True, indent=4))
	
# 		
# 	

# for i,v in enumerate(a):
#     x = (i%size)*size +10 
#     y = int(i/size)*size +10
# 
#     b+="""
#     
#     <circle cx="%d" cy="%d" r="3" stroke="green" stroke-width="4" width=".6" fill="yellow" id="%s"/>
# 
#     
#     """% (x,y,v)
# b+="</svg>"
# print(b) 
#     
