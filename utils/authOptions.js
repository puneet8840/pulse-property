import GoogleProvider from "next-auth/providers/google";
import connectDb from '../config/database'
import usermodel from '../models/User'

export const authOptions = {
  
  providers: [GoogleProvider({

     clientId: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
  }),
  
 
    
  ]
,
callbacks:{
async signIn({profile}){
  //connect to mongodb
 
  await connectDb();
  //fetching user
  const userExists=await usermodel.findOne({email:profile.email});
  //check user exists or not
  if(!userExists){
    const username=profile.name.slice(0,20);
  await usermodel.create({email:profile.email,username,image:profile.picture})
}
return true; //allowing signin with "true!"

},
async session({session}){
  //find user
  const user=await usermodel.findOne({email:session.user.email});
  session.user.id=user._id;
  return session


}


}
}
