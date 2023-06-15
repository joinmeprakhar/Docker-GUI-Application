from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import json
import subprocess


create_container_bp = Blueprint('create_container', __name__)

@create_container_bp.route('/create_container', methods = ['GET','POST'])
def create_container():
    data = request.get_data()
    data_str = data.decode('utf-8')
    json_data = json.loads(data_str)
    # execute docker inspect command for the specified container
    container_name = json_data['container_name']
    container_image = json_data['container_image']
    image_version = json_data['image_version']

    if ('container_port' in json_data):
      if json_data['container_port'].isspace() == False and len(json_data['container_port']) != 0:
         container_port = json_data['container_port']
      else:
         container_port = None
    else:
         container_port = None

    if ('network_name' in json_data):
      if json_data['network_name'].isspace() == False and len(json_data['network_name']) != 0:
         network_name = json_data['network_name']
      else:
         network_name = None
    else:
         network_name = None
     
    if ('vol_name' in json_data):
      if json_data['vol_name'].isspace() == False and len(json_data['vol_name']) != 0:
         vol_name = json_data['vol_name']
      else:
         vol_name = None
    else:
         vol_name = None

    if ('vol_attach_path' in json_data):
      if json_data['vol_attach_path'].isspace() == False and len(json_data['vol_attach_path']) != 0:
         vol_attach_path = json_data['vol_attach_path']
      else:
         vol_attach_path = None
    else:
         vol_attach_path = None

    if ('container_expose_port' in json_data):
      if json_data['container_expose_port'].isspace() == False and len(json_data['container_expose_port']) != 0:
         container_expose_port = json_data['container_expose_port']
      else:
         container_expose_port = None
    else:
         container_expose_port = None

    if(container_port != None and vol_name == None and network_name != None):
       cmd = ['sudo', 'docker', 'run', '-dit','-p' , container_expose_port +':'+container_port , '--network' , network_name  ,'--name', container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see container port or network name is correct, or container already exists'})
       return jsonify({'status': '200','container_creation': 'successful'})
       
    elif(container_port == None and vol_name != None and network_name != None):
       cmd = ['sudo', 'docker', 'run', '-dit','-v' , vol_name+':/'+vol_attach_path  , '--network' , network_name , '--name' , container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see volume path or network name is corret, or container already exists'})
       return jsonify({'status': '200','container_creation': 'successful'})

    elif(container_port != None and vol_name != None and network_name != None):
       cmd = ['sudo', 'docker', 'run', '-dit','-p' , container_expose_port +':'+container_port ,'-v' , vol_name+':/'+vol_attach_path , '--network' , network_name , '--name', container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see container port, network name or volume is correct, or container already exists'})
       return jsonify({'status': '200','container_creation': 'successful'})


#########################

    elif(container_port == None and vol_name == None  and network_name != None):
       cmd = ['sudo', 'docker', 'run', '-dit','--network' , network_name, '--name', container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see network name is correct, or container already exists'})
       return jsonify({'status': '200','container_creation': 'successful'})

    elif(container_port != None and vol_name == None and network_name == None):
       cmd = ['sudo', 'docker', 'run', '-dit','-p' , container_expose_port +':'+container_port ,'--name', container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see container port is correct, or container already exists'})
       return jsonify({'status': '200','container_creation': 'successful'})

    elif(container_port == None and vol_name != None and network_name == None):
       cmd = ['sudo', 'docker', 'run', '-dit','-v' , vol_name+':/'+vol_attach_path ,'--name', container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see volume path is corret, or container already exists'})
       return jsonify({'status': '200','container_creation': 'successful'})

    elif(container_port != None and vol_name != None and network_name == None):
       cmd = ['sudo', 'docker', 'run', '-dit','-p' , container_expose_port +':'+container_port ,'-v' , vol_name+':/'+vol_attach_path , '--name', container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see container port or volume is correct, or container already exists'})
       return jsonify({'status': '200','container_creation': 'successful'})

########################

    else:
       cmd = ['sudo', 'docker', 'run', '-dit', '--name', container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see container name or container image is already exists or not'})
       return jsonify({'status': '200','container_creation': 'successful'})
