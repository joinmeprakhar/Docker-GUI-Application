from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import subprocess

# Routes
from routes.create_container import create_container_bp
from routes.manage_container import manage_container_bp
from routes.manage_network import manage_network_bp
from routes.get_log_inspect import get_log_inspect_bp
from routes.manage_images import manage_images_bp
from routes.manage_volume import manage_volume_bp
from routes.manage_list import manage_list_bp
from routes.number_list_container import number_list_container_bp

# creating a Flask app
app = Flask(__name__)
CORS(app)


# Put your Node IP here where flask API is running
ipaddress = '192.168.179.48'

# Registering files
app.register_blueprint(create_container_bp)
app.register_blueprint(manage_container_bp)
app.register_blueprint(manage_network_bp)
app.register_blueprint(get_log_inspect_bp)
app.register_blueprint(manage_images_bp)
app.register_blueprint(manage_volume_bp)
app.register_blueprint(manage_list_bp)
app.register_blueprint(number_list_container_bp)

@app.route('/get_node_ip')
def get_node_ip():
    return jsonify({'node_ip_address': ipaddress})

@app.route('/', methods = ['GET'])
def home_page():
    if(request.method == 'GET'):
        data = "Welcom to Docker GUI"
        mydata = jsonify({'data': data})
        return mydata

# driver function
if __name__ == '__main__':
    app.run(debug = True,host = '0.0.0.0')
