'use client'
import {useState,useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import PropertyCard from '../../../components/PropertyCard'
import  ClipLoader  from 'react-spinners/ClipLoader'
import PropertySearchHeader from '../../../components/PropertySearchHeader'



const SearchResults = () => {
    const searchParams=useSearchParams();
    const location=searchParams.get('location')
    const propertyType=searchParams.get('propertyType')
    const [loading,setLoading]=useState(true)
    const [properties,setProperties]=useState([])

    useEffect(()=>{
        const fetchProperties=async ()=>{
try{
const res=await fetch(`/api/properties/search?location=${location}&propertyType=${propertyType}`)

if(res.status===200){
    const data=await res.json();
    setProperties(data)

}
else{
    setProperties([])
}
}//end try
catch(error){
    console.log(error)
}
finally{
    setLoading(false)
    
}

        }
        fetchProperties();




    },[location,propertyType])
    


  return (

<>
<PropertySearchHeader/>

{loading?<ClipLoader cssOverride={{display:'block',margin:"100px auto"}} loading={loading}/>:(
    <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            {properties.length===0?<p>No properties available </p>:
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property)=>(<PropertyCard key={property._id} property={property}/>))}
    
                </div>}
            
                </div>
                </section>
  )}
</>

  )
}

export default SearchResults