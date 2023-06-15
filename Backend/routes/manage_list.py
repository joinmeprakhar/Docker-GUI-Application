from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import json
import subprocess
import docker


manage_list_bp = Blueprint('manage_list', __name__)


@manage_list_bp.route('/list_volume_info',methods = ['GET'])
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

@manage_list_bp.route('/list_network_info',methods = ['GET'])
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

#############
@manage_list_bp.route('/list_containers_info',methods = ['GET'])
def list_containers_info():
    client = docker.from_env()
    containers = client.containers.list()
    container_info = []

    for container in containers:
        ports = container.ports
        host_ports = []

        if ports:
            for port in ports:
                print(ports)
                try:
                  host_ports = ports[port][0]['HostPort']
                except:
                  host_ports = ''
        container_info.append({
            'container_id': container.id,
            'container_ip': container.attrs['NetworkSettings']['IPAddress'],
            'container_name': container.name,
            'container_port': host_ports
        })

    return jsonify(container_info)

#############

@manage_list_bp.route('/list_image_info',methods = ['GET'])
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


@manage_list_bp.route('/list_container',methods = ['GET'])
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
