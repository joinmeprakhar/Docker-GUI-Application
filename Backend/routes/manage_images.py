from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import json
import subprocess

manage_images_bp = Blueprint('manage_images', __name__)

@manage_images_bp.route('/manage_image', methods = ['POST','GET'])
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
