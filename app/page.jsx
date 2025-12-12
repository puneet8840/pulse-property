import React from 'react'
import Hero from '../components/Hero'
import RecentProperties from '../components/RecentProperties'
import FeaturedProperties from '../components/FeaturedProperties'




const HomePage = async () => {

  // console.log(process.env.MONGODB_URL)
const InfoBoxes=await import('../components/InfoBoxes')
console.log(InfoBoxes)

  return (<>
  

    <Hero/>
    <InfoBoxes.default/> 
    <FeaturedProperties/>
    <RecentProperties/>

    </>
  )
}

export default HomePage