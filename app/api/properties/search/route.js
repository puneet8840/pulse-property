import connectDb from '../../../../config/database'
import propertymodel from '../../../../models/Property'

export const dynamic = "force-dynamic";

export const GET=async (request)=>{



try{

    await connectDb();
    const {searchParams}=new URL(request.url)
    const location=searchParams.get('location')
    const propertyType=searchParams.get('propertyType')
    const pattern=new RegExp(location,'i')
    const query={
        $or:[{name:pattern},{description:pattern},{'location.street':pattern},
            {'location.city':pattern},{'location.state':pattern},{'location.zipcode':pattern}
        ]


    }
    if(propertyType && propertyType!=='All'){
        const typePattern=new RegExp(propertyType,'i');
    query.type=typePattern;}
    const searchResult=await propertymodel.find(query);
    
    return new Response(JSON.stringify(searchResult),{status:200})


}//end try
catch(error){
    return new Response(JSON.stringify({message:error}),{status:500})
}



}