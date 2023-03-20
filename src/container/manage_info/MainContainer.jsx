import ListContainer from './ListContainer';
import ListContainerInfo from './ListContainerInfo';
import ListImageInfo from './ListImageInfo';
import ListNetwork from './ListNetwork';
import ListVolume from './ListVolume';
function MainContainer(props) {
   return (
      <>
         <ListContainerInfo apiurl={props.apiurl} /><br />
         <ListContainer apiurl={props.apiurl} /><br />
         <ListVolume apiurl={props.apiurl} /> <br />
         <ListImageInfo apiurl={props.apiurl} /><br />
         <ListNetwork apiurl={props.apiurl} /><br />
      </>
   );
}

export default MainContainer;