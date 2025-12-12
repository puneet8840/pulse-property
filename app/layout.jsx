import React from 'react'
import Navbar from '../components/Navbar'
import '../assets/styles/globals.css'
import Footer from '../components/Footer'
import {AuthProvider} from '../components/AuthProvider'
import {ToastContainer} from 'react-toastify'
import {ContextProvider} from '@/context/GlobalContext'
import 'photoswipe/dist/photoswipe.css'


export const metadata = {
title: "Property Pulse",
  icons: {
    icon: "images/properties/9202500.png",      // Normal favicon
    shortcut: "/logo.png",  // iOS/Android
    apple: "/logo.png",     // Apple devices
  },
};

const HomeLayout = ({children}) => {
  return ( <ContextProvider>

    <AuthProvider><html>
      
    <body className='bg-grey-200'>
      <Navbar/>
        <main > {children}</main>
        <Footer />
        <ToastContainer

/>
        </body>
        </html></AuthProvider>
  </ContextProvider>
    


    
  )
}

export default HomeLayout