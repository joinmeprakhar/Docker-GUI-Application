## Our Services

```
* Quick Review
* Create Container
* Manage Container
* Create Network
* Create Volume
* Remove/Pull Images
* Log/Inspect 
```

## Architecture (frontend and backend)
![alt docker](https://drive.google.com/uc?export=view&id=1VU6NxchaZN4TTadBQpr-eVqm3CYgGXVu)


### Start and run Docker GUI Application
```
yum install nodejs -y
yum install git -y
npm install
npm start
```


### Quick Review
In Quick Review service you can see all basic information of all the process running over the docker container. Here you can see following things in form of table. 

1.	List of all Running container
2.	List of all Existing container
3.	Docker Volumes list
4.	Docker Images information
5.	Docker Network list


### Create Container
Creating a Docker container is a straightforward process that involves specifying the image to use, any required environment variables, and any desired network and volume settings. The following command can be used to launch a Docker container:
```
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```
In this command, OPTIONS represents any desired options for configuring the container, such as network settings, volume mounts, or port mappings. IMAGE represents the Docker image to use for the container, and COMMAND and ARG... represent any optional commands or arguments to pass to the container.

Some common options that can be passed to the docker run command include:

```
-p to map a container port to a host port
-e to set environment variables
-v to mount a volume
--network to specify the network to use for the container
```
This service is help us to launch the docker container over the Docker. You just need to put container name, container image and container image version you want to use over the Docker. You can also put container port, volume name and volume attachment path but these are optional. 

### Manage Container
This service manages following stuffs like starting, creating, deleting, stopping, restarting and also shows the container logs if terms of debugging anything in the container. You just have to put the container name and then select the action which you want to perform.

### Create Network
In Docker, a network is a virtual network that provides a communication mechanism between containers. Containers can be connected to one or more networks, allowing them to communicate with other containers and/or the host system.
Using Docker networks offers several benefits:

`Isolation:` Docker networks provide a level of isolation between containers, allowing them to communicate securely without exposing their services to the host system or other containers.

`Flexibility:` Docker networks can be customized to meet the specific needs of an application, such as configuring IP addresses, subnet masks, and other network settings.

`Scalability:` Docker networks can be used to create complex network topologies that can scale to meet the needs of large, distributed applications.

`Security:` Docker networks can be used to secure communications between containers by enforcing network policies, such as restricting access to specific ports or IP addresses.

This service provides facilities like creating and deleting the network of the Docker container. Some default network is already there in Docker like bridge and host. If you launch any container by default Docker, put it into the bridge network hence container has connectivity between them. It is very helpful in world of microservices. 

### Create Volume
In Docker, a volume is a persistent data storage mechanism that allows data to be stored outside of a container's filesystem. A Docker volume is a directory on the host system or within another container that is mounted into a container.
Using volumes in Docker offers several benefits:

`Data persistence:` Containers are ephemeral by design, meaning that any data stored inside a container is lost when the container is stopped or deleted. Volumes allow data to be persisted beyond the lifecycle of a container, ensuring that important data is not lost.

`Sharing data between containers:` Volumes can be shared between containers, allowing data to be easily transferred from one container to another.

`Access to external data:` Volumes can be used to access data from outside the Docker environment, such as files on the host system or network-attached storage.

`Improved performance:` Volumes can be used to store data that is frequently accessed by multiple containers, improving performance by reducing the need to transfer data over the network.

Creating a volume in Docker is a straightforward process. Volumes can be created using the docker volume create command or created automatically when a container is started with a specified volume mount point.

This service provides the facilities to create/delete volume. Make sure volume is not attached to any container before deleting it. 

### Remove/Pull Docker Images
Docker is a popular containerization platform used to develop, package, and deploy applications. Docker images are pre-built packages that contain everything needed to run an application, including the application code, system tools, libraries, and dependencies. While Docker images are essential for building and deploying applications, they can also take up a significant amount of disk space on your system.

Removing or pulling Docker images is the process of deleting or downloading Docker images from a Docker registry or local machine. Here are some of the benefits of removing or pulling Docker images:

`Freeing up disk space:` By removing unused Docker images, you can free up disk space on your system, which can help improve performance.

`Reducing security risks:` Old and unused Docker images can become a security risk if they contain vulnerabilities or outdated dependencies. By removing these images, you can reduce the risk of security breaches.

`Saving bandwidth:` Pulling Docker images from a remote registry can consume a significant amount of bandwidth, especially for large images. By pulling only the necessary images, you can save bandwidth and reduce download times.

Sources for removing or pulling Docker images include:

`Docker CLI:` The Docker command-line interface (CLI) provides a simple and straightforward way to remove or pull Docker images. You can use the "docker rmi" command to remove images and "docker pull" command to pull images.

`Docker Hub:` Docker Hub is a central registry for Docker images. You can use Docker Hub to search for and download Docker images. You can also use Docker Hub to delete images that you have pushed to the registry.

`Docker API:` The Docker API provides a programmatic way to interact with Docker. You can use the API to automate the process of removing or pulling Docker images in your applications and scripts.

Removing or pulling Docker images can help free up disk space, reduce security risks, and save bandwidth. There are various sources for removing or pulling Docker images, including the Docker CLI, Docker Hub, and the Docker API.

### Log/Inspect Docker 

To view the description of a Docker container, you can use the docker inspect command. This command provides detailed information about a container, including its configuration, network settings, and more.

To inspect a running Docker container, open a terminal or command prompt and run the following command:
```
docker inspect <container-id>
```
Replace <container-id> with the ID or name of the container you want to inspect. If you don't know the ID or name of the container, you can use the docker ps command to list all running containers and their IDs.
Once you run the docker inspect command, you'll see a large JSON object containing all the details about the container. You can use this information to troubleshoot issues, debug your application, or simply understand how your container is configured.

If you want to inspect a stopped container, you can use the docker inspect command with the --format option to specify a format for the output. For example:
```
docker inspect --format='{{json .State}}' <container-id>
```  
This command will output the container's state information in JSON format, which you can then inspect using a tool like jq.
The docker logs command allows you to view the logs of a Docker container. When you run a container, Docker automatically streams the container's output to a log file, which you can then view using the docker logs command.

To view the logs of a running Docker container, open a terminal or command prompt and run the following command:
```
docker logs <container-id>
```
Replace <container-id> with the ID or name of the container you want to view the logs for. By default, this command will show you the logs since the container was started.
