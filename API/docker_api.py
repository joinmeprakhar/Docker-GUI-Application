from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import subprocess

# creating a Flask app
app = Flask(__name__)
CORS(app)

ipaddress = '192.168.1.151'
apptype = 'list'

@app.route('/create_container', methods = ['GET','POST'])
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

    if(container_port != None and vol_name == None):
       cmd = ['sudo', 'docker', 'run', '-dit','-p' , container_port+':'+container_port ,'--name', container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see container port is correct, or container already exists'})
       return jsonify({'status': '200','container_creation': 'successful'})
       
    elif(container_port == None and vol_name != None):
       cmd = ['sudo', 'docker', 'run', '-dit','-v' , vol_name+':/'+vol_attach_path ,'--name', container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see volume path is corret, or container already exists'})
       return jsonify({'status': '200','container_creation': 'successful'})

    elif(container_port != None and vol_name != None):
       cmd = ['sudo', 'docker', 'run', '-dit','-p' , container_port+':'+container_port ,'-v' , vol_name+':/'+vol_attach_path , '--name', container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see container port or volume is correct, or container already exists'})
       return jsonify({'status': '200','container_creation': 'successful'})

    else:
       cmd = ['sudo', 'docker', 'run', '-dit', '--name', container_name , container_image+':'+image_version ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_creation': 'Unable to launch container...Please see container or image is already exists or not'})
       return jsonify({'status': '200','container_creation': 'successful'})

@app.route('/manage_container', methods = ['GET','POST'])
def manage_container():
    data = request.get_data()
    data_str = data.decode('utf-8')
    json_data = json.loads(data_str)
    container_name = json_data['container_name']
    action_type = json_data['action_type']
    if ('container_name' in json_data):
      if json_data['container_name'].isspace() == False and len(json_data['container_name']) != 0:
         container_name = json_data['container_name']
      else:
         container_name = None
    else:
         container_name = None

    if(container_name != None and action_type=='man_start_container'):
       cmd = ['sudo', 'docker', 'start', container_name  ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_status': 'Unable to start container'})
       return jsonify({'status': '200','container_status': 'started'})
    
    elif(container_name != None and action_type=='man_stop_container'):
       cmd = ['sudo', 'docker', 'stop', container_name  ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_status': 'Unable to stop container'})
       return jsonify({'status': '200','container_status': 'stopped'})

    elif(container_name != None and action_type=='man_delete_container'):
       cmd = ['sudo', 'docker', 'rm','-f', container_name  ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_status': 'Unable to delete container'})
       return jsonify({'status': '200','container_status': 'deleted'})
    
    elif(container_name != None and action_type=='man_restart_container'):
       cmd = ['sudo', 'docker', 'restart', container_name  ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_status': 'Unable to restart container'})
       return jsonify({'status': '200','container_status': 'restarted'})

    elif(container_name != None and action_type=='get_container_logs'):
       cmd = ['sudo', 'docker', 'logs', container_name]
       result = subprocess.run(cmd, stdout=subprocess.PIPE)
       logs = result.stdout.decode('utf-8')
       if result.returncode != 0:
         return jsonify({'status': '400','container_status': 'Unable to fetch the logs of container, please check if you are giving valid container name'})
       return jsonify({'status': '200','container_status': logs})
    
    else:
       return jsonify({'status': '400','container_status': 'Container Name must be provided'}) 
      

@app.route('/manage_network', methods = ['GET','POST'])
def manage_network():
    data = request.get_data()
    data_str = data.decode('utf-8')
    json_data = json.loads(data_str)
    # execute docker inspect command for the specified container
    network_name = json_data['network_name']
    action_type = json_data['action_type']

    if ('network_name' in json_data):
      if json_data['network_name'].isspace() == False and len(json_data['network_name']) != 0:
         network_name = json_data['network_name']
      else:
         network_name = None
    else:
         network_name = None

    if(network_name != None and action_type=='create_network'):
       cmd = ['sudo', 'docker', 'network', 'create', network_name  ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','network_status': 'Unable to Create network, check if network already exists'})
       return jsonify({'status': '200','network_status': 'created'})
    
    elif(network_name != None and action_type=='delete_network'):
       cmd = ['sudo', 'docker', 'network', 'rm', network_name  ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','network_status': 'Unable to delete network, check if network does not exists'})
       return jsonify({'status': '200','network_status': 'delete'})
    
    else:
       return jsonify({'status': '400','network_status': 'Network Name must be provided'})     


@app.route('/manage_volume', methods = ['POST','GET'])
def manage_volume():
    data = request.get_data()
    data_str = data.decode('utf-8')
    json_data = json.loads(data_str)
    # execute docker inspect command for the specified container
    volume_name = json_data['volume_name']
    action_type = json_data['action_type']

    if ('volume_name' in json_data):
      if json_data['volume_name'].isspace() == False and len(json_data['volume_name']) != 0:
         volume_name = json_data['volume_name']
      else:
         volume_name = None
    else:
         volume_name = None

    if(volume_name != None and action_type=='create_volume'):
       cmd = ['sudo', 'docker', 'volume', 'create', volume_name  ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','volume_status': 'Unable to Create volume, check if volume already exists'})
       return jsonify({'status': '200','volume_status': 'created'})
    
    elif(volume_name != None and action_type=='delete_volume'):
       cmd = ['sudo', 'docker', 'volume', 'rm', volume_name  ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','volume_status': 'Unable to delete volume, check if volume does not exists'})
       return jsonify({'status': '200','volume_status': 'delete'})

    else:
       return jsonify({'status': '400','volume_status': 'Volume name must be provided'}) 


@app.route('/manage_image', methods = ['POST','GET'])
def manage_image():
    data = request.get_data()
    data_str = data.decode('utf-8')
    json_data = json.loads(data_str)
    # execute docker inspect command for the specified container
    image_name = json_data['image_name']
    image_version = json_data['image_version']
    action_type = json_data['action_type']

    if ('image_name' in json_data):
      if json_data['image_name'].isspace() == False and len(json_data['image_name']) != 0:
         image_name = json_data['image_name']
      else:
         image_name = None
    else:
         image_name = None

    if ('image_version' in json_data):
      if json_data['image_version'].isspace() == False and len(json_data['image_version']) != 0:
         image_version = json_data['image_version']
      else:
         image_version = None
    else:
         image_version = None

    if(image_name != None and image_version !=None and action_type=='pull_image'):
       cmd = ['sudo', 'docker', 'pull', image_name+':'+ image_version]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','image_status': 'Unable to Pull image, check if image is private or does not exists'})
       return jsonify({'status': '200','image_status': 'image pulled sucessfully'})
    
    elif(image_name != None and image_version !=None and action_type=='delete_image'):
       cmd = ['sudo', 'docker', 'rmi', '-f' , image_name+':'+ image_version]
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','image_status': 'Unable to delete image, check if image is dependent on another'})
       return jsonify({'status': '200','image_status': 'image deleted sucessfully'})

    else:
       return jsonify({'status': '400','image_status': 'Image Name and Image Version must be provided'}) 


@app.route('/', methods = ['GET'])
def home_page():
    if(request.method == 'GET'):
        data = "Welcom to Docker GUI"
        mydata = jsonify({'data': data})
        return mydata

@app.route('/inspect',methods = ['POST','GET'])
def docker_inspect():
    data = request.get_data()
    data_str = data.decode('utf-8')
    json_data = json.loads(data_str)
    # execute docker inspect command for the specified container
    user_query = json_data['container_name']
    cmd = ['docker', 'inspect', user_query]
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    if result.returncode != 0:
        # handle error case
        return jsonify({'error': 'Unable to retrieve container information.'})
    # parse the output as JSON
    inspect_data = json.loads(result.stdout)
    return jsonify(inspect_data)


@app.route('/list_volume_info',methods = ['GET'])
def list_volume_info():
    # Run the docker ps command and capture the output
    result = subprocess.run(['docker', 'volume', 'ls'] ,stdout=subprocess.PIPE)
    # Decode the output and split it into lines
    output = result.stdout.decode('utf-8').split('\n')

    # Remove the first line (which contains the column headers)
    output = output[1:]
    # Split each line into columns and create a list of dictionaries
    containers = []
    for line in output:
        cols = line.split()
        if cols:
            container = {
                'volume_name': cols[1],
                'driver': cols[0],
            }
            containers.append(container)
    # Return the list of containers as a JSON object
    return jsonify(containers)

@app.route('/list_network_info',methods = ['GET'])
def list_network_info():
    # Run the docker ps command and capture the output
    result = subprocess.run(['docker', 'network', 'ls'] ,stdout=subprocess.PIPE)

    # Decode the output and split it into lines
    output = result.stdout.decode('utf-8').split('\n')

    # Remove the first line (which contains the column headers)
    output = output[1:]
    # Split each line into columns and create a list of dictionaries
    containers = []
    for line in output:
        cols = line.split()
        if cols:
            container = {
                'network_id': cols[0],
                'network_name': cols[1],
                'driver': cols[2],
                'scope': cols[3],
            }
            containers.append(container)
    # Return the list of containers as a JSON object
    return jsonify(containers)


@app.route('/list_containers_info',methods = ['GET'])
def list_containers_info():
    # Run the Docker command and capture its output
    cmd = 'docker container ls --format "table {{.Names}}\t{{.ID}}\t{{.Ports}}" | tail -n +2 | while read line; do name=$(echo $line | awk \'{print $1}\'); id=$(echo $line | awk \'{print $2}\'); ip=$(docker container inspect --format \'{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}\' $id); echo -e "${name}\t${id}\t${ip}"; done'
    result = subprocess.run(cmd, stdout=subprocess.PIPE, shell=True)
    # Decode the output and split it into lines
    output = result.stdout.decode('utf-8').split('\n')

    # Remove the last (empty) line
    output = output[:-1]

    # Split each line into columns and create a list of dictionaries
    containers = []
    for line in output:
        cols = line.split('\t')
        container = {
            'container_name': cols[0],
            'container_id': cols[1],
            'container_ip': cols[2]
        }
        containers.append(container)
    # Return the list of containers as a JSON object
    return jsonify(containers)

@app.route('/list_image_info',methods = ['GET'])
def list_image_info():
    # Run the docker ps command and capture the output
    result = subprocess.run(['docker', 'images'] ,stdout=subprocess.PIPE)

    # Decode the output and split it into lines
    output = result.stdout.decode('utf-8').split('\n')

    # Remove the first line (which contains the column headers)
    output = output[1:]
    # Split each line into columns and create a list of dictionaries
    containers = []
    for line in output:
        cols = line.split()
        if cols:
            container = {
                'image_repository': cols[0],
                'image_tag': cols[1],
                'image_id': cols[2],
            }
            containers.append(container)
    # Return the list of containers as a JSON object
    return jsonify(containers)


@app.route('/list_container',methods = ['GET'])
def list_running_container():
    # Run the docker ps command and capture the output
    result = subprocess.run(['docker', 'ps' , '-a'] ,stdout=subprocess.PIPE)
    # Decode the output and split it into lines
    output = result.stdout.decode('utf-8').split('\n')

    # Remove the first line (which contains the column headers)
    output = output[1:]
    # Split each line into columns and create a list of dictionaries
    containers = []
    for line in output:
        cols = line.split()
        if cols:
            container = {
                'container_name': cols[-1],
                'container_id': cols[0],
                'container_image': cols[1]
            }
            containers.append(container)
    # Return the list of containers as a JSON object
    return jsonify(containers)


# driver function
if __name__ == '__main__':
    app.run(debug = True,host = ipaddress)
