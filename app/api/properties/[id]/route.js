import connectDb from '../../../../config/database'
import propertymodel from '../../../../models/Property'
import porpertymodel from '../../../../models/Property'
import {getUserSession} from '../../../../utils/getUserSession'
export const dynamic = "force-dynamic";

export const GET=async (request,{params})=>{
try{

    await connectDb()
    const { id } = await params
   
    const properties= await porpertymodel.findById(id)
    if(!properties) return new Response("property not found",{status:404})

return new Response(JSON.stringify(properties),{status:200});


}
catch(err){
console.log(err)
return new Response("something went wrong",{status:500})

}



}




export const DELETE=async (request,{params})=>{
try{

    await connectDb()
    const { id } =await params
    const userSession=await getUserSession();
    if(!userSession||!userSession.userId) return new Response("Not a session",{status:500})
    
    const properties= await porpertymodel.findById(id)
    
    if(!properties){ return new Response("property not found",{status:404})}
    if(properties.owner.toString()!==userSession.userId.toString()){ 
        
        return new Response("Unauthorized user",{status:401})}
    await properties.deleteOne();

    
    
return new Response("requested property deleted",{status:200});

    }
catch(err){
console.log(err)
return new Response("something went wrong",{status:500})

}
}








//PUT request
export const PUT=async (request,{params})=>{
   
    try{
        const {id}=await params;
        await connectDb();
        const sessionUser=await getUserSession();

        if(!sessionUser|| !sessionUser.userId)
        {

            return new Response('Unauthorized user',{status:401})
        }
        const existingProperty=await propertymodel.findById(id);
        if(!existingProperty){return new Response("property not found"),{status:404}}
        const userId=sessionUser.userId;
        const data= await request.formData()
        const amenities= data.getAll('amenities')
        
        const property={name:data.get("name"),
            type:data.get('type'),
            description:data.get('description'),
            location:{street:data.get('location.street'),
                city:data.get('location.city'),
        state:data.get('location.state'),
        zipcode:data.get('location.zipcode')
    },
    beds:data.get('beds'),
    baths:data.get('baths'),
    square_feet:data.get('square_feet'),
    amenities,
    rates:{weekly:data.get('rates.weekly'),monthly:data.get('rates.monthly'),nightly:data.get("rates.nightly")},
    seller_info:{name:data.get('seller_info.name'),
        email:data.get('seller_info.email'),
        phone:data.get('seller_info.phone')
    },
    owner:userId,
    
    
}


if(existingProperty.owner.toString()!==userId.toString()){return new Response('unauthorized access',{status:401})}
await propertymodel.findByIdAndUpdate(id, property);

   
return new Response("property updated",{status:200});
}
catch(err){

    return new Response(JSON.stringify({message:err}),{status:500})

}



}