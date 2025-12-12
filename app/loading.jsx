'use client'
import React from 'react'
import GridLoader from 'react-spinners/GridLoader'
const csst={display:'block',margin:"100px auto"}

const Loading = ({loading}) => {
  return (


<GridLoader

loading={loading}
color="#4fa94d"
aria-label="pacman-loading"
cssOverride={csst} 
size={20} 


/>
  //  <ClipLoader 
   
  //  cssOverride={csst} 
  //  loading="Please wait!.." 
  //  color="#bf24ba" 
  //  size={150} 
  //  aira-label='Loading Spinner' />
  )
}

export default Loading