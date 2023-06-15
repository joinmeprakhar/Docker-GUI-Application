from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import json
import subprocess


get_log_inspect_bp = Blueprint('get_log_inspect', __name__)

@get_log_inspect_bp.route('/get_log_inspect', methods = ['GET','POST'])
def get_log_inspect():
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

    if(container_name != None and action_type=='get_log'):
       cmd = ['sudo', 'docker', 'logs', container_name  ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE)
       logs = result.stdout.decode('utf-8')
       if result.returncode != 0:
         return jsonify({'status': '400','container_status': 'Unable to Fetch logs. Check container exists or not ?'})
       return jsonify({'status': '200','container_status': logs})

    elif(container_name != None and action_type=='get_inspect'):
       cmd = ['sudo', 'docker', 'inspect', container_name  ]
       result = subprocess.run(cmd, stdout=subprocess.PIPE)
       inspect = result.stdout.decode('utf-8')
       result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
       if result.returncode != 0:
         return jsonify({'status': '400','container_status': 'Unable to inspect container info'})
       return jsonify({'status': '200','container_status': inspect})
    else:
       return jsonify({'status': '400','container_status': 'Container Name must be provided'})
