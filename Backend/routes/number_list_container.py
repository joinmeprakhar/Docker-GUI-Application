from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import json
import subprocess
import docker

number_list_container_bp = Blueprint('number_list_container', __name__)


def get_num_info():
    client = docker.from_env()
    containers = client.containers.list()
    images = client.images.list()
    networks = client.networks.list()
    volumes = client.volumes.list()

    stats = {
        "running_containers": len(containers),
        "stopped_containers": len(client.containers.list(filters={"status": "exited"})),
        "total_images": len(images),
        "total_networks": len(networks),
        "total_volumes": len(volumes)
    }

    return stats

@number_list_container_bp.route('/get_num_info', methods=['GET'])
def docker_stats():
    stats = get_num_info()
    return jsonify(stats)
