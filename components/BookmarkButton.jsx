'use client'
import React from 'react'
import { FaBookmark } from 'react-icons/fa'
import {useState,useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSession} from 'next-auth/react'

const BookmarkButton = ({property}) => {
    const [isBookmarked,setIsBookmarked]=useState(null);
    const {data:session}=useSession();
    const userId=session?.user?.id;
    const [loading,setLoading]=useState(true)
    useEffect(()=>{

const fetchPropertyBookemarkedStatus=async ()=>{
    if(!userId){
        setLoading(false);
        return
    }
    try{
    const res=await fetch('http://localhost:3000/api/bookmark/check',{method:'POST',body:JSON.stringify({propertyId:property._id}),headers:{
        'Content-Type':'application/json'
    }})
    if(res.status===500) toast.error('Internal server error');
    if(res.status===401) toast.error('unauthorized ensure you are logged in')

    if(res.status===200){ 
        const data=await res.json();
        setIsBookmarked(data.isBookmarked)


    }

    
        }//end try

        catch(error){
            toast.error(error);
        }
        finally{
            setLoading(false)
        }



}
fetchPropertyBookemarkedStatus();

    },[property?._id,userId])


const handleClick=async ()=>{
    if(!userId) {toast.error('please log in') ;return}
        try{
    const res=await fetch('http://localhost:3000/api/bookmark',{method:'POST',body:JSON.stringify({propertyId:property._id}),headers:{
        'Content-Type':'application/json'
    }})
    if(res.status===500) toast.error('Internal server error');
    if(res.status===401) toast.error('unauthorized ensure you are logged in')

    if(res.status===200){ 
        const data=await res.json();
        toast.success(data.message)
        setIsBookmarked(data.isBookmarked)


    }

    
        }//end try

        catch(error){
            toast.error(error);
        }



}
if (loading ) return (<p className='text-center'>Loading....</p>)
  return isBookmarked?(
    <button
    onClick={handleClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            >
              <FaBookmark className="fas fa-bookmark mr-2"/> Remove Property
            </button>
  ):(
    <button
    onClick={handleClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
            >
              <FaBookmark className="fas fa-bookmark mr-2"/> Bookmark Property
            </button>
  )
}

export default BookmarkButton