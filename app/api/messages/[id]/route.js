import connectDb from '../../../../config/database'
import { getUserSession } from '../../../../utils/getUserSession'
import Message from '../../../../models/Messages'



export const dynamic='force-dynamic'



export const DELETE=async (request,{params})=>{
try{

    await connectDb();
    const {id}=await params;
    const sessionUser=await getUserSession();
    if(!sessionUser || !sessionUser.user) return new Response(JSON.stringify({message:"please log in!"},{status:401}))

    const message=await Message.findById(id)
    if (!message) return new Response(JSON.stringify({message:"message does not exist"}),{status:404})
    if(message.recepient.toString()!==sessionUser.userId.toString()) return new Response(JSON.stringify({message:"unathourized"}),{status:401})

    await message.deleteOne();
   
    return new Response(JSON.stringify('message deleted'),{status:200})
}
catch(error){

    console.log(error)
    return new Response('internal server error',{status:500})
}

    
}

export const PUT=async (request,{params})=>{
try{

    await connectDb();
    const {id}=await params;
    const sessionUser=await getUserSession();
    if(!sessionUser || !sessionUser.user) return new Response(JSON.stringify({message:"please log in!"},{status:401}))

    const message=await Message.findById(id)
    if (!message) return new Response(JSON.stringify({message:"message does not exist"}),{status:404})
    if(message.recepient.toString()!==sessionUser.userId.toString()) return new Response(JSON.stringify({message:"unathourized"}),{status:401})

    message.read=!message.read
    await message.save()
    return new Response(JSON.stringify(message),{status:200})
}
catch(error){

    console.log(error)
    return new Response('internal server error',{status:500})
}

    
}