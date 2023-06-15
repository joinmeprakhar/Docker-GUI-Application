import ListContainer from './ListContainer';
import ListContainerInfo from './ListContainerInfo';
import ListImageInfo from './ListImageInfo';
import ListNetwork from './ListNetwork';
import ListVolume from './ListVolume';
import './MainContainer.css';
import { useEffect, useState } from 'react';

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
   useEffect(() => {
      getNumberInfo();
      getNodeIP();
   }, [])

   return (
      <>

         <body >
            <div  class="d-flex" id="wrapper">

               <div id="page-content-wrapper">

                  <div style={{backgroundColor: '#87CEEB'}} class="container-fluid px-4"> <br />
                  <h1><b>Node IP: {ipaddress} </b></h1><hr />
                     <div  class="row g-3 my-2">
                        <div  class="col-md-3">
                           <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                              <div>
                                 <h3 class="fs-2">{getnodockerInfo.runningContainers}</h3>
                                 <p class="fs-5">Running</p>
                              </div>
                              <i class="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3" style={{ color: '#3498db', background: 'white' }}></i>
                              {/* <i class="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3"></i> */}
                           </div>
                        </div>

                        <div class="col-md-3">
                           <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                              <div>
                                 <h3 class="fs-2">{getnodockerInfo.stoppedContainers}</h3>
                                 <p class="fs-5">Stopped</p>
                              </div>
                              {/* <i class="fas fa-hand-holding-usd fs-1 primary-text border rounded-full secondary-bg p-3"></i> */}
                              <i class="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3" style={{ color: '#3498db', background: 'white' }}></i>
                           </div>
                        </div>

                        <div class="col-md-3">
                           <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                              <div>
                                 <h3 class="fs-2">{getnodockerInfo.totalVolumes}</h3>
                                 <p class="fs-5">Volumes</p>
                              </div>
                              <i class="fas fa-shopping-basket fs-1 primary-text border rounded-full secondary-bg p-3" style={{ color: '#3498db', background: 'white' }}></i>
                           </div>
                        </div>

                        <div class="col-md-3">
                           <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                              <div>
                                 <h3 class="fs-2">{getnodockerInfo.totalImages}</h3>
                                 <p class="fs-5">Images</p>
                              </div>
                              <i class="fas fa-receipt fs-1 primary-text border rounded-full secondary-bg p-3" style={{ color: '#3498db', background: 'white' }}></i>
                           </div>
                        </div>

                        <div class="col-md-3">
                           <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                              <div>
                                 <h3 class="fs-2">{getnodockerInfo.totalNetworks}</h3>
                                 <p class="fs-5">Networks</p>
                              </div>
                              <i class="fas fa-credit-card fs-1 primary-text border rounded-full secondary-bg p-3" style={{ color: '#3498db', background: 'white' }}></i>
                           </div>
                        </div>

                        <div class="col-md-3">
                           <div class="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                              <div>
                                 <h3 class="fs-2">{getnodockerInfo.stoppedContainers + getnodockerInfo.runningContainers}</h3>
                                 <p class="fs-5">Start+Stopped</p>
                              </div>
                              <i class="fas fa-blender fs-1 primary-text border rounded-full secondary-bg p-3" style={{ color: '#3498db', background: 'white' }}></i>
                           </div>
                        </div>

                     </div>

                     <div class="row my-5">
                        <div class="col">
                           <ListContainerInfo apiurl={props.apiurl} />
                        </div>
                     </div>

                     <div class="row my-5">

                        <div class="col">
                           <ListContainer apiurl={props.apiurl} />
                        </div>
                     </div>
                     <div class="row my-5">

                        <div class="col">
                           <ListVolume apiurl={props.apiurl} />
                        </div>
                     </div>
                     <div class="row my-5">

                        <div class="col">
                           <ListImageInfo apiurl={props.apiurl} />
                        </div>
                     </div>
                     <div class="row my-5">

                        <div class="col">
                           <ListNetwork apiurl={props.apiurl} />
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </body>
      </>
   );
}

export default MainContainer;