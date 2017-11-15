import os
import random
import json as js
a= set()
size=25
rooms={}
b="""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"	 width="3000" height="3000">
"""
for (dirpath, dirnames, filenames) in os.walk("img"):
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
		marker["radius"]="0"
		marker["room"]="Lobby_100"
		marker["number"]="0"
		marker["type"]="walk"
		sphere["markers"].append(marker)
		json["spheres"].append(sphere)
	fileName=preStem+".json"
	if not os.path.isfile(fileName):
		f = open(fileName, 'w')
		f.write(js.dumps(json, indent=4))
