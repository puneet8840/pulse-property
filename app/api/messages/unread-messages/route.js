import connectDb from '../../../../config/database'
import { getUserSession } from '../../../../utils/getUserSession'
import Message from '../../../../models/Messages'



export const dynamic='force-dynamic'





export const GET=async (request,)=>{
try{

    await connectDb();
    
    const sessionUser=await getUserSession();
    if(!sessionUser || !sessionUser.user) return new Response(JSON.stringify({message:"please log in!"},{status:401}))

    const count=await Message.countDocuments({recepient:sessionUser.userId,read:false})
   
    return new Response(JSON.stringify(count),{status:200})
}
catch(error){

    console.log(error)
    return new Response('internal server error',{status:500})
}

    
}