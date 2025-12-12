import propertymodel from '../../../../../models/Property'
import connectDb from '../../../../../config/database'

export const dynamic = "force-dynamic";

export const GET=async (request,{params})=>{
try{
const {userId}=await params;
    await connectDb()
    const properties= await propertymodel.find({owner:userId})

return new Response(JSON.stringify(properties),{status:200});


}
catch(err){
console.log(err)
return new Response("something went wrong",{status:500})

}
}