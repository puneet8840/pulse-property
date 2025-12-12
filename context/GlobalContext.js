'use client'
import React,{useState,useContext} from 'react'

const context=React.createContext(undefined);


export const ContextProvider=({children})=>{
const [count,setCount]=useState(0);


return (

<context.Provider value={{count,setCount}}>

    {children}
</context.Provider>
)





}

export const useUnreadCount=()=>useContext(context)