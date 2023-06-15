from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import json
import subprocess

manage_volume_bp = Blueprint('manage_volume', __name__)

@manage_volume_bp.route('/manage_volume', methods = ['POST','GET'])
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
