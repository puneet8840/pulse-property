// import { couldStartTrivia } from 'typescript'
import connectDb from '../../../config/database'
import { getUserSession } from '../../../utils/getUserSession'
import propertymodel from '../../../models/Property'
import cloudinary from '../../../config/cloudinary'
export const dynamic = "force-dynamic";
export const GET=async (request)=>{
try{
const page=request.nextUrl.searchParams.get('page')||1
const pageSize=request.nextUrl.searchParams.get('pageSize')||1
const skip=(page-1)*pageSize
    await connectDb()
    const totalProperties=await propertymodel.countDocuments({})
    const properties= await propertymodel.find({}).skip(skip).limit(pageSize)

return new Response(JSON.stringify({totalProperties,properties}),{status:200});


}
catch(err){
console.log(err)
return new Response("something went wrong",{status:500})

}
}





export const POST=async (request)=>{
    try{
        await connectDb();
        const sessionUser=await getUserSession();

        if(!sessionUser|| !sessionUser.userId)
        {

            return new Response('Unauthorized user',{status:500})
        }
const userId=sessionUser.userId;
   const data= await request.formData()
   const amenities= data.getAll('amenities')
   const images=data.getAll('images').filter((image)=>image.name!=='')
 
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
    // images,

}
console.log('puneet');
const imageUploadPromises=[];
for(let image of images){
    const imageBuffer= await image.arrayBuffer();
    const imageArray=Array.from(new Uint8Array(imageBuffer));
    const imageData=Buffer.from(imageArray);

    const imageBase64=imageData.toString('base64');
    //upload to cloud
    
   const result= await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`,{folder:'property-pulse'})
    imageUploadPromises.push(result.secure_url);
    
    
}
// const uploadedImages= await Promise.all(imageUploadPromises)
property.images=imageUploadPromises;


console.log(property)
 const newProperty=new propertymodel(property)
await newProperty.save();
   
return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
}
catch(err){

    return new Response(JSON.stringify({message:err}),{status:500})

}



}

        
        
        
        
        
