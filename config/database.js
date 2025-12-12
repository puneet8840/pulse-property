import mongoose from 'mongoose'

let connected=false;
const connectDb=async ()=>{
    mongoose.set('strictQuery',true);

if(connected){
    console.log(`MongoDb is already connected`);
}
else {

try{
    await mongoose.connect(process.env.MONGODB_URL);
    connected=true;
    console.log(`MongoDb connected succesfully`);}
catch (error){

console.log(error)
}


}


}

export default connectDb;