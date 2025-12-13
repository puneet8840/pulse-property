'use client'
import {setDefaults,fromAddress} from 'react-geocode'
import 'mapbox-gl/dist/mapbox-gl.css'
import {useState,useEffect} from 'react'
import {toast} from 'react-toastify'
import Map,{Marker} from 'react-map-gl'
import Image from 'next/image'
import ClipLoader  from 'react-spinners/ClipLoader'
import pin from '../assets/images/pin.svg'



const PropertyLocation=({property})=>{
    const [lat,setLat]=useState(null)
    const [lng,setLng]=useState(null)
    const [geocodeError,setGeoCodeError]=useState(false);
    const [viewport,setViewport]=useState({
        latitude:0,
        longitude:0,
        zoom:12,
        width:'100%',
        height:'500px'

    })
    const [loading,setLoading]=useState(true);
    setDefaults({
  key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODE_KEY,
  language: "en", 
  region: "in", 
});
useEffect(()=>{
const fetchCoord=async ()=>{
    try{
const res=await fromAddress(`${property.location.street} ${property.location.state}
    ${property.location.city}${property.location.zipcode}`)
    if(res.results.length===0){
        setGeoCodeError(true)
        return
    }

    const {lat,lng}=res.results[0].geometry.location;
    setLat(lat);
    setLng(lng);
    }
    catch(err){
        setGeoCodeError(true)
        toast.error(err)}
    finally{
        setLoading(false)
    }

}
fetchCoord();

},[])

if(loading) return <ClipLoader loading={loading}/>
if(!loading && geocodeError) return <div className='text-xl'>No map data available</div>

    return !loading && (
        <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
            longitude:lng,
            latitude:lat,
            zoom:2,
        }}
        style={{width:'100%',height:'300px',}}
        mapStyle='mapbox://styles/mapbox/streets-v9'

        >
            <Marker longitude={lng} latitude={lat} anchor='bottom'>
                <Image src={pin} width={40} height={40} alt='marker'/>
            </Marker>
        </Map>
    )
}
export default PropertyLocation;