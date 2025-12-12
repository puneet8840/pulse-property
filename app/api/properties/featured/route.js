// import { couldStartTrivia } from 'typescript'
import connectDb from '../../../../config/database'
import propertymodel from '../../../../models/Property'


export const GET=async (request)=>{
try{


    await connectDb()
    
    const properties= await propertymodel.find({is_featured:true})

return new Response(JSON.stringify(properties),{status:200});


}
catch(err){
console.log(err)
return new Response("something went wrong",{status:500})

}
}
