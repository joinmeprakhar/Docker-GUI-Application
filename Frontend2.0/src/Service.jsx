import React from 'react'
import DockerCard from './card/DockerCard';
const Service = (props) => {
  return (
    <>
      <DockerCard  apiurl={props.apiurl}/>    
    </>
  )
}

export default Service
