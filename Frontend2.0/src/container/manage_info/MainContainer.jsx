import ListContainer from './ListContainer';
import ListContainerInfo from './ListContainerInfo';
import ListImageInfo from './ListImageInfo';
import ListNetwork from './ListNetwork';
import ListVolume from './ListVolume';
import { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import './MainContainer.css'
import { Link } from 'react-router-dom';

function MainContainer(props) {

  const [getnodockerInfo, setnodockerInfo] = useState({
    runningContainers: 0,
    stoppedContainers: 0,
    totalVolumes: 0,
    totalNetworks: 0,
    totalImages: 0,
  });

  const [ipaddress, setIP] = useState("");

  const getNodeIP = async () => {
    await fetch(`${props.apiurl}/get_node_ip`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setIP(data.node_ip_address);
      })
      .catch(error => console.error(error));
  }

  const getNumberInfo = async () => {
    await fetch(`${props.apiurl}/get_num_info`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setnodockerInfo({
          runningContainers: data.running_containers,
          stoppedContainers: data.stopped_containers,
          totalVolumes: data.total_volumes,
          totalNetworks: data.total_networks,
          totalImages: data.total_images,
        });
      })
      .catch(error => console.error(error));
  }

  const totalContainers = getnodockerInfo.stoppedContainers + getnodockerInfo.runningContainers;
  useEffect(() => {
    getNumberInfo();
    getNodeIP();
  }, [])

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Node IP: {ipaddress}</h1>
        <hr className="border-gray-300 my-4" />
        <div className="grid grid-cols-3 gap-4">
          <a href="/running">
            <div className="p-6 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300">
              <div className="text-center">
                <div className="animate-running-dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                      <div className="absolute inset-0 bg-transparent rounded-full border-4 border-green-500 animate-spin" style={{ animationDuration: '1s' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{getnodockerInfo.runningContainers}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-sm pt-3">Running</span>
              </div>
            </div>
          </a>
          <a href="/stopped">
            <div className="p-6 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300">
              <div className="text-center">
                <div className="animate-running-dots">
                  <div className="dot1"></div>
                  <div className="dot1"></div>
                  <div className="dot1"></div>
                </div>
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                      <div className="absolute inset-0 bg-transparent rounded-full border-4 border-red-500 animate-spin" style={{ animationDuration: '1s' }}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{getnodockerInfo.stoppedContainers}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-sm pt-3">Stopped</span>
              </div>
            </div>
          </a>

          <div className="p-6 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300">
            <div className="text-center">
              <div className="animate-running-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 bg-transparent rounded-full border-4 border-blue-900 animate-spin" style={{ animationDuration: '1s' }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">{getnodockerInfo.stoppedContainers + getnodockerInfo.runningContainers}</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-sm pt-3">All</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
            <div>
              <h3 className="font-bold text-xl">{getnodockerInfo.totalVolumes}</h3>
              <p>Volumes</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
            <div>
              <h3 className="font-bold text-xl">{getnodockerInfo.totalImages}</h3>
              <p>Images</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
            <div>
              <h3 className="font-bold text-xl">{getnodockerInfo.totalNetworks}</h3>
              <p>Networks</p>
            </div>
          </div>

        </div>
        <div className="mt-8">
        <div className="mb-4">
            <ListNetwork apiurl={props.apiurl} />
          </div>
          <div className="mb-4">
            <ListVolume apiurl={props.apiurl} />
          </div>
          
          <div className="mb-4">
            <ListImageInfo apiurl={props.apiurl} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;