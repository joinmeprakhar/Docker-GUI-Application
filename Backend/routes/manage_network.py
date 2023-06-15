from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import json
import subprocess

manage_network_bp = Blueprint('manage_network', __name__)

@manage_network_bp.route('/manage_network', methods = ['GET','POST'])
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
