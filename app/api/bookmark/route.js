import connectDb from '../../../config/database'
import usermodel from '../../../models/User'
import propertymodel from '../../../models/Property'
import {getUserSession} from '../../../utils/getUserSession'
//to handle deploy error
export const dynamic='force-dynamic'


//adding GET for saved properties
export const GET=async (request)=>{
    try{

await connectDb();
const sessionUser=await getUserSession();
if(!sessionUser||!sessionUser.userId) return new Response("unauthorized user",{status:401})
    const user=await usermodel.findOne({_id:sessionUser.userId})
const bookmarks=await propertymodel.find({_id:{$in:user.bookmarks}})
return new Response(JSON.stringify(bookmarks),{status:200})


    }//end try
    catch(error){

        console.log(error)
        return new Response('internal server error',{status:500})
    }





}//end GET



//adding POST request handler
export const POST=async (request)=>{
//try start
try{
//connect database
    await connectDb();
    //get property id from post request
    const {propertyId} =await request.json();
    
    //get user id from session
    const sessionUser=await getUserSession();
    //check if session exists
   
    if(!sessionUser||!sessionUser.userId) return new Response("session unavailable",{status:401})
    //get user from database
    const user=await usermodel.findOne({_id:sessionUser.userId})
    //creating varibale to check property is bookmarked or not
    let isBookmarked=user.bookmarks.includes(propertyId);
    let message;
    if(!isBookmarked){ user.bookmarks.push(propertyId); 
        message="bookmark added successfully";
        isBookmarked=true}
    else{
        user.bookmarks.pull(propertyId)
        message="bookmark removed successfully"
        isBookmarked=false
    }
    
    user.save()
    return new Response(JSON.stringify({message,isBookmarked}),{status:200})
    
}//try end

catch(err){
    console.log(err)
    return new Response("internal server error",{status:500})
}//catch end




}//Post end




