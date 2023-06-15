import React from 'react';
import './content.css';

function About_Home() {
  return (
    <div >
      <h1 className='itemContent'> What are ontainers and why do you need them?</h1><hr />
      <p className='itemContent incrseContentSize'>Containers are a solution to the problem of how to get software to run reliably when moved from one computing environment to another. This could be from a developer’s laptop to a test environment, from a staging environment into production, and perhaps from a physical machine in a data center to a virtual machine in a private or public cloud.
        <br /><br />
        Problems arise when the supporting software environment is not identical, says Docker  creator Solomon Hykes. “You’re going to test using Python 2.7, and then it’s going to run on Python 3 in production and something weird will happen. Or you’ll rely on the behavior of a certain version of an SSL library and another one will be installed. You’ll run your tests on Debian and production is on Red Hat and all sorts of weird things happen.”
        <br /><br />
        And it’s not just different software that can cause problems, he added. “The network topology might be different, or the security policies and storage might be different but the software has to run on it.”</p>

      <h1 className='itemContent'>How do containers solve this problem?</h1><hr />
      <p className='itemContent incrseContentSize'> Put simply, a container consists of an entire runtime environment: an application, plus all its dependencies, libraries and other binaries, and configuration files needed to run it, bundled into one package. By containerizing the application platform and its dependencies, differences in OS distributions and underlying infrastructure are abstracted away.</p>
      <h1 className='itemContent'>What’s the difference between containers and virtualization?</h1><hr />
      <img style={{width: '70%'}} src={require('./image/docker_vm_virtual.png')} alt="docker" /> <br /> <br />
      <p className='itemContent incrseContentSize'> With virtualization technology, the package that can be passed around is a virtual machine, and it includes an entire operating system as well as the application. A physical server running three virtual machines would have a hypervisor and three separate operating systems running on top of it.
        <br /><br />
        By contrast a server running three containerized applications with Docker runs a single operating system, and each container shares the operating system kernel with the other containers. Shared parts of the operating system are read only, while each container has its own mount (i.e., a way to access the container) for writing. That means the containers are much more lightweight and use far fewer resources than virtual machines.</p>

      <h1 className='itemContent'>What other benefits do containers offer?</h1><hr />
      <img style={{width: '70%', height: '20%'}} src={require('./image/benefits_of_containers.jpg')} alt="docker" /> <br /> <br />
      <p className='itemContent incrseContentSize'>A container may be only tens of megabytes in size, whereas a virtual machine with its own entire operating system may be several gigabytes in size. Because of this, a single server can host far more containers than virtual machines.
        <br /><br />
        Another major benefit is that virtual machines may take several minutes to boot up their operating systems and begin running the applications they host, while containerized applications can be started almost instantly. That means containers can be instantiated in a “just in time” fashion when they are needed and can disappear when they are no longer required, freeing up resources on their hosts.

        A third benefit is that containerization allows for greater modularity. Rather than run an entire complex application inside a single container, the application can be split in to modules (such as the database, the application front end, and so on). This is the so-called microservices approach.  Applications built in this way are easier to manage because each module is relatively simple, and changes can be made to modules without having to rebuild the entire application. Because containers are so lightweight, individual modules (or microservices) can be instantiated only when they are needed and are available almost immediately.</p>

      <h1 className='itemContent'>What’s the difference between Docker and containers?</h1><hr />
     
      <p className='itemContent incrseContentSize'>Docker has become synonymous with container technology because it has been the most successful at popularizing it. But container technology is not new; it has been built into Linux in the form of LXC for over 10 years, and similar operating system level virtualization has also been offered by FreeBSD jails, AIX Workload Partitions and Solaris Containers.</p>
      <h1 className='itemContent'>How secure are containers?</h1><hr />
      <p className='itemContent incrseContentSize'>Many people believe that containers are less secure than virtual machines because if there’s a vulnerability in the container host kernel, it could provide a way into the containers that are sharing it. That’s also true with a hypervisor, but since a hypervisor provides far less functionality than a Linux kernel (which typically implements file systems, networking, application process controls and so on) it presents a much smaller attack surface.
        <br /><br />
        But in the last couple of years a great deal of effort has been devoted to developing software to enhance the security of containers.
        <br /><br />
        For example, Docker (and other container systems) now include a signing infrastructure allowing administrators to sign container images to prevent untrusted containers from being deployed.
        <br /><br />
        However, it is not necessarily the case that a trusted, signed container is secure to run, because vulnerabilities may be discovered in some of the software in the container after it has been signed. For that reason, Docker and others offer container security scanning solutions that can notify administrators if any container images have vulnerabilities that could be exploited.
        <br /><br />
        More specialized container security software has also been developed. For example, Twistlock offers software that profiles a container’s expected behavior and “whitelists” processes, networking activities (such as source and destination IP addresses and ports) and even certain storage practices so that any malicious or unexpected behavior can be flagged.
        <br /><br />
        Another specialist container security company called Polyverse takes a different approach. It takes advantage of the fact that containers can be started in a fraction of a second to relaunch containerized applications in a known good state every few seconds to minimize the time that a hacker has to exploit an application running in a container.</p>
        <hr />
    </div>
  )
}

export default About_Home;
