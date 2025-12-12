const apiDomain=process.env.NEXT_PUBLIC_API_DOMAIN||null;

//fetch all properties
const fetchproperties=async ({showFeatured=false}={})=>{
if(apiDomain==null){return []}

  try{
 const res= await fetch(`${apiDomain}/properties/${showFeatured?'featured':''}`);

 if(!res.ok){

  throw Error("Opps! internal server erroe")
 }
 else{
  return res.json();
 }
 
 }
 catch(err){
  console.log(err)
  return [];
 
}
}

//fetch single property


const fetchproperty=async (id)=>{
if(apiDomain==null){return null}

  try{
 const res= await fetch(`${apiDomain}/properties/${id}`);

 if(!res.ok){

  throw Error("Opps! internal server erroe")
 }
 else{
  return res.json();
 }
 
 }
 catch(err){
  console.log(err)
  return null;
 
}
}
export {fetchproperties,fetchproperty};