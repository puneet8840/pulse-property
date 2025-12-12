import connectDb from '../../../../config/database'
import usermodel from '../../../../models/User'
import {getUserSession} from '../../../../utils/getUserSession'
//to handle deploy error
export const dynamic='force-dynamic'
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
    console.log(sessionUser.userId)
    if(!sessionUser||!sessionUser.userId) return new Response("session unavailable",{status:401})
    //get user from database
    const user=await usermodel.findOne({_id:sessionUser.userId})
    //creating varibale to check property is bookmarked or not
    let isBookmarked=user.bookmarks.includes(propertyId);
    
    return new Response(JSON.stringify({isBookmarked}),{status:200})
    
}//try end

catch(err){
    console.log(err)
    return new Response("internal server error",{status:500})
}//catch end




}//Post end




