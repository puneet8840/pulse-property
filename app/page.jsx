import React from 'react'
import Hero from '../components/Hero'
import RecentProperties from '../components/RecentProperties'
import FeaturedProperties from '../components/FeaturedProperties'
import InfoBoxes from '../components/InfoBoxes'




const HomePage =  () => {

 

  return (<>
  

    <Hero/>
    <InfoBoxes/> 
    <FeaturedProperties/>
    <RecentProperties/>

    </>
  )
}

export default HomePage