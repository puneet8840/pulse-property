import {Schema,models,model} from 'mongoose'


const UserSchema=new Schema({
    email:{type:String,required:[true,"email is required"],unique:[true,"Email alreday exists"]},
    username:{type:String,required:[true,"username is required"]},
    image:{type:String},
    bookmarks:[{type:Schema.Types.ObjectId,ref:"Property"}]},
    {timestamps:true})
const usermodel=models.User||model('User',UserSchema);

export default  usermodel;


