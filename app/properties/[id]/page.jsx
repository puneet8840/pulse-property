'use client'
import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import {fetchproperty} from '../../../utils/request'
import PropertyHeader from "../../../components/PropertyHeader";
import PropertyDetails from "../../../components/PropertyDetails";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyImages from "../../../components/PropertyImages";
// import GridLoader from 'react-spinners/GridLoader'
import ClipLoader  from "react-spinners/ClipLoader";
import BookmarkButton from "../../../components/BookmarkButton";
import ShareButton from "../../../components/ShareButton";
import ContactForm from "../../../components/ContactForm";


const PropertyPage=()=>{
  const csst={display:'block',margin:"100px auto"}
    const [property,setProperty]=useState(null);
    const {id}=useParams();
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchpropertydata=async ()=>{
           try{ 
            const property=await fetchproperty(id)
            setProperty(property);}
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false);
        }
      
        }
          if(property===null){fetchpropertydata()}


    },[id,property])
if(!property && !loading){

    return (<h1>no property found</h1>)
}

return (
<>
{loading && (<ClipLoader color="#4fa94d" cssOverride={csst} loading={loading}/>)}
{!loading &&property && (<PropertyHeader image={property.images[0]}/>)}
 <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2"/> Back to Properties
        </Link>
      </div>
    </section>

    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1  w-full gap-6 propertyinfo">
          {!loading &&property &&(<PropertyDetails property={property}/>)}

          {/* <!-- Sidebar --> */}
          <aside className="space-y-4">   
            <BookmarkButton property={property}/>    
            <ShareButton property={property}/>
            
            {/* <!-- Contact Form --> */}
           <ContactForm property={property}/>

            
          </aside>
        </div>
      </div>
    </section>
    <section>

       {!loading && property &&<PropertyImages images={property.images}/>}

    </section>



</>

)
}


export default PropertyPage;