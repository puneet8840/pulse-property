import React from 'react'
import {fetchproperties} from '../utils/request'
import FeaturePropertyCrad from './FeaturePropertyCard'

const FeaturedProperties = async () => {

   const properties= await fetchproperties({showFeatured:true})
   
  return properties.length>0 && (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        <div className="flex flex-col  w-full h-120 gap-6 overflow-y-scroll ">
        {properties.map((property)=>(<FeaturePropertyCrad key={property._id} property={property}/>))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties