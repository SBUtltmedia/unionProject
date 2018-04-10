import glob
import os
import json
for i in glob.glob('./outside/*.json'):
    json_data=open(i).read()
    room = json.loads(json_data)
    for j in room['spheres']:
        j.pop('leftImg', None)
        j['rightImg'] = j['rightImg'].replace('Right','Mono')
    json_data=json.dumps(room, sort_keys=True, indent=4)
    outF = open(i, "w")
    outF.writelines(json_data)
    outF.close()
