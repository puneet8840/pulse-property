'use client'
import React from 'react'

import PropertyCard from './PropertyCard'
import {useState,useEffect} from 'react'
import  ClipLoader  from 'react-spinners/ClipLoader'
import Pagination from './Pagination'




const Properties = () => {
    const [properties,setProperties]=useState([]);
    const [loading,setLoading]=useState(true);
    const [page,setPage]=useState(1);
    const [pageSize,setPageSize]=useState(1);
    const [totalCount,setTotalCount]=useState(0);
    



    useEffect(()=>{

const fetchProperties=async ()=>{
try{
const res=await fetch(`/api/properties?page=${page}&pageSize=${pageSize}`)
if(!res.ok) throw Error('soemthing went wrong')
if (res.status===200){
  const {properties,totalProperties}=await res.json()
setProperties(properties)
setTotalCount(totalProperties)}

}
catch(error){
    console.log(error)
}
finally{
    setLoading(false)
}

}
fetchProperties()

    },[page,pageSize])
    const handlePage=(newPage)=>{
      setPage(newPage)

    }

    if(loading) return <ClipLoader loading={loading} cssOverride={{display:'block',margin:'100px auto'}}/>
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length===0?<p>No properties available </p>:
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property)=>(<PropertyCard key={property._id} property={property}/>))}

            </div>}
            <Pagination page={page} pageSize={pageSize} totalCount={totalCount} handlePage={handlePage}/>
        
            </div>
            </section>
  )
}

export default Properties