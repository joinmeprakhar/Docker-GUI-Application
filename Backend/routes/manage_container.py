from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import json
import subprocess


manage_container_bp = Blueprint('manage_container', __name__)

@manage_container_bp.route('/manage_container', methods = ['GET','POST'])
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
    else:
       return jsonify({'status': '400','container_status': 'Container Name must be provided'}) 
