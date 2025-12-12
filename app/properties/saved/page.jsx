'use client'
import React from 'react'
import {useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import PropertyCard from '../../../components/PropertyCard'
import  ClipLoader  from 'react-spinners/ClipLoader'



const SavedProperties = () => {

    const [loading,setLoading]=useState(true);
    const [properties,setProperties]=useState([]);
useEffect(()=>{
const fetchSavedProperties=async ()=>{
try{
    const res=await fetch('/api/bookmark');
    if(res.status===200){
        const data=await res.json()
        setProperties(data)
    }
    else{
        toast.error(res.statusText)
        return
    }
}//end try
catch(error){

    toast.error(error)
}
finally{
    setLoading(false);
}
}
fetchSavedProperties();

},[])


  return loading? (<ClipLoader loading={loading}/>):(

    <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <h1 className='text-center bg-amber-100'>Saved properties</h1>
            {properties.length===0?<p className='text-center inline-block bg-red-500 mt-10 ml-[43%]'>No properties available </p>:
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property)=>(<PropertyCard key={property._id} property={property}/>))}
    
                </div>}
            
                </div>
                </section>
  )
    

}

export default SavedProperties