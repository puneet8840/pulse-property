import React from 'react'
import Hero from '../components/Hero'
import RecentProperties from '../components/RecentProperties'
import FeaturedProperties from '../components/FeaturedProperties'
import InfoBoxes from '../components/InfoBoxes'




const HomePage =  () => {

  // console.log(process.env.MONGODB_URL)

  return (<>
  

    <Hero/>
    <InfoBoxes/> 
    <FeaturedProperties/>
    <RecentProperties/>

    </>
  )
}

export default HomePage