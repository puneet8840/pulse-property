'use client'
import React from 'react'
import {useState} from 'react'
import {toast} from 'react-toastify'
import {useUnreadCount} from '../context/GlobalContext'

const MessageBox = ({message}) => {
  const [isRead,setIsRead]=useState(message.read);
  const [isDeleted,setIsDeleted]=useState(false);
  const {setCount}=useUnreadCount()

  const handleRead=async ()=>{
try{
const res=await fetch(`/api/messages/${message._id}`,{method:"PUT"})
const data=await res.json();
if(res.status===401 || res.status===404) toast.error(data.message)
if(res.status===200) {
  const {read}=data;
  setIsRead(read)
  setCount((prev)=> read? prev-1:prev+1)
  if(read) toast.success('marked as read')
    else toast.success('marked as new')
}


}
catch(error){
  console.log(error)
  toast.error('something went wrong')
}

}

const handleDelete=async ()=>{
try{

  const res=await fetch(`/api/messages/${message._id}`,{method:"DELETE"})
  const data=await res.json();
 if(res.status===401 || res.status===404) toast.error(data.message)
if(res.status===200) {toast.success('message delete successfully')
  setIsDeleted(true)
setCount((prev)=>prev-1)
}
}
catch(error){
  console.log(error)
  toast.error('unable to delete the message try after sometime')
}



}
 if(isDeleted) return null

  return (
    <div
              className="relative  p-4 rounded-md shadow-md border border-gray-200" style={{backgroundColor:"#6693F5"}}
            >
              {!isRead && (<div className='absolute right-2 top-2 bg-amber-500 rounded-md px-2 py-2'>New</div>)}
              <h2 className="text-xl mb-4">
                <span className="font-bold">Property Inquiry:</span>
                {message.property.name}
              </h2>
              <p className="text-gray-700 bg-green-500 text-white inline-block px-2 py-2 rounded-md">
                Message:{`   `}{message.body}
              </p>

              <ul className="mt-4">
                <li><strong>Name:</strong> {message.sender.username}</li>

                <li>
                  <strong>Reply Email:</strong>
                  <a href="mailto:recipient@example.com" className="text-white"
                    >{message.email}</a
                  >
                </li>
                <li>
                  <strong>Reply Phone:</strong>
                  <a href="tel:123-456-7890" className="text-white"
                    >{message.phone}</a
                  >
                </li>
                <li><strong>Received:</strong>{(new Date(message.createdAt)).toLocaleString()}</li>
              </ul>
              <button
              type='button'
              onClick={handleRead}
                className={`mt-4 mr-3 ${isRead? "bg-red-400":"bg-blue-500 text-white"}  py-1 px-3 rounded-md cursor-pointer transform hover:scale-110 
  transition-transform duration-200 ease-out `}
              >
                Mark As {isRead?'New':'Read'}
              </button>
              <button onClick={handleDelete} className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer transform hover:scale-110 
  transition-transform duration-200 ease-out">
                Delete
              </button>
            </div>
  )
}

export default MessageBox