import React from 'react'

function About_Docker() {
    return (
        <div>
            <h1 >What is Docker</h1> <hr />
            <p >Docker is a software platform that allows you to build, test, and deploy applications quickly. Docker packages software into standardized units called containers that have everything the software needs to run including libraries, system tools, code, and runtime. Using Docker, you can quickly deploy and scale applications into any environment and know your code will run.<br /><br />
                Running Docker on AWS provides developers and admins a highly reliable, low-cost way to build, ship, and run distributed applications at any scale.
                Recent announcements: Docker collaborates with AWS to help developers speed delivery of modern apps to the cloud. This collaboration helps developers use Docker Compose and Docker Desktop to leverage the same local workflow they use today to seamlessly deploy apps on Amazon ECS and AWS Fargate. Read the blog for more information.</p>
            <h1>How Docker works ?</h1> <hr />
            <img src={require('./image/docker_arch.jpg')} alt="docker" /> <br /> <br />
            <p>Docker works by providing a standard way to run your code. Docker is an operating system for containers. Similar to how a virtual machine virtualizes (removes the need to directly manage) server hardware, containers virtualize the operating system of a server. Docker is installed on each server and provides simple commands you can use to build, start, or stop containers.
                AWS services such as AWS Fargate, Amazon ECS, Amazon EKS, and AWS Batch make it easy to run and manage Docker containers at scale.</p>

            <h1>Why use Docker?</h1><hr />
            <p >
                Docker is so popular today that “Docker” and “containers” are used interchangeably. But the first container-related technologies were available for years—even decades (link resides outside IBM)—before Docker was released to the public in 2013.
                <br /><br />
                Most notably, in 2008, LinuXContainers (LXC) was implemented in the Linux kernel, fully enabling virtualization for a single instance of Linux. While LXC is still used today, newer technologies using the Linux kernel are available. Ubuntu, a modern, open-source Linux operating system, also provides this capability.
                <br /><br />
                Docker lets developers access these native containerization capabilities using simple commands, and automate them through a work-saving application programming interface (API). Compared to LXC, Docker offers:
                <br /> <br />
                <ul >
                    <li> <b>Improved and seamless container portability:</b> While LXC containers often reference machine-specific configurations, Docker containers run without modification across any desktop, data center and cloud environment.
                        Even lighter weight and more granular updates: With LXC, multiple processes can be combined within a single container. This makes it possible to build an application that can continue running while one of its parts is taken down for an update or repair.</li>
                    <li>
                        <b> Automated container creation:</b> Docker can automatically build a container based on application source code.
                    </li>
                    <li>

                       <b> Container versioning: </b>Docker can track versions of a container image, roll back to previous versions, and trace who built a version and how. It can even upload only the deltas between an existing version and a new one.
                    </li>
                    <li>

                       <b> Container reuse:</b> Existing containers can be used as base images—essentially like templates for building new containers.

                    </li>
                    <li>
                       <b> Shared container libraries:</b> Developers can access an open-source registry containing thousands of user-contributed containers.
                        Today Docker containerization also works with Microsoft Windows and Apple MacOS. Developers can run Docker containers on any operating system, and most leading cloud providers, including Amazon Web Services (AWS), Microsoft Azure, and IBM Cloud offer specific services to help developers build, deploy and run applications containerized with Docker.
                    </li>
                </ul>
            </p>

            <h1 >Docker tools and terms</h1> <hr />
            <p >
                Some of the tools, terms and technologies developers encounter when using Docker include:
            </p>
            <h2 >DockerFile</h2>
            <p >
                Every Docker container starts with a simple text file containing instructions for how to build the Docker container image. DockerFile automates the process of Docker image creation. It’s essentially a list of command-line interface (CLI) instructions that Docker Engine will run in order to assemble the image. The list of Docker commands is huge, but standardized: Docker operations work the same regardless of contents, infrastructure, or other environment variables.
            </p>
            <h2 >Docker images</h2>
            <p >
                Docker images contain executable application source code as well as all the tools, libraries, and dependencies that the application code needs to run as a container. When you run the Docker image, it becomes one instance (or multiple instances) of the container.

                It’s possible to build a Docker image from scratch, but most developers pull them down from common repositories. Multiple Docker images can be created from a single base image, and they’ll share the commonalities of their stack.
                <br /><br />
                Docker images are made up of layers, and each layer corresponds to a version of the image. Whenever a developer makes changes to the image, a new top layer is created, and this top layer replaces the previous top layer as the current version of the image. Previous layers are saved for rollbacks or to be re-used in other projects.
                <br /><br />
                Each time a container is created from a Docker image, yet another new layer called the container layer is created. Changes made to the container—such as the addition or deletion of files—are saved to the container layer only and exist only while the container is running. This iterative image-creation process enables increased overall efficiency since multiple live container instances can run from just a single base image, and when they do so, they leverage a common stack.
            </p>
            <h2>Docker containers</h2>
            <p >
                Docker containers are the live, running instances of Docker images. While Docker images are read-only files, containers are life, ephemeral, executable content. Users can interact with them, and administrators can adjust their settings and conditions using Docker commands.</p>

            <h2 >Docker Hub</h2>
            <p >
                Docker Hub (link resides outside ibm.com) is the public repository of Docker images that calls itself the “world’s largest library and community for container images.” It holds over 100,000 container images sourced form commercial software vendors, open-source projects, and individual developers. It includes images that have been produced by Docker, Inc., certified images belonging to the Docker Trusted Registry, and many thousands of other images.
                <br /><br />
                All Docker Hub users can share their images at will. They can also download predefined base images from the Docker filesystem to use as a starting point for any containerization project.
                <br /><br />
                Other image repositories exist, as well, notably GitHub. GitHub is a repository hosting service, well known for application development tools and as a platform that fosters collaboration and communication. Users of Docker Hub can create a repository (repo) which can hold many images. The repository can be public or private, and can be linked to GitHub or BitBucket accounts.
            </p>
            <h2> Docker Desktop</h2>
            <p >
                Docker Desktop (link resides outside ibm.com) is an application for Mac or Windows that includes Docker Engine, Docker CLI client, Docker Compose, Kubernetes, and others. It also includes access to Docker Hub.
            </p>
            <h2 >Docker daemon</h2>
            <p >
                Docker daemon is a service that creates and manages Docker images, using the commands from the client. Essentially Docker daemon serves as the control center of your Docker implementation. The server on which Docker daemon runs is called the Docker host.
            </p>
            <h2 >Docker registry</h2>
            <p >
                A Docker registry is a scalable open-source storage and distribution system for Docker images. The registry enables you to track image versions in repositories, using tagging for identification. This is accomplished using git, a version control tool.
            </p> <hr />
        </div>
    )
}

export default About_Docker
