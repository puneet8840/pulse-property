import {Schema,model,models} from 'mongoose'


const MessagesSchema=new Schema({

sender:{type:Schema.Types.ObjectId,
    ref:'User',
    required:true
},
recepient:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:true

},
property:{
    type:Schema.Types.ObjectId,
    ref:'Property',
     required:true
},
name:{
    type:String,
    required:[true,'name is required'],
},
email:{
    type:String,
    required:[true,'email is required']
},
phone:{type:String,required:true},
body:{type:String,required:true},
read:{type:Boolean,default:false},
},{

    timestamps:true,
})


const Message=models.Message||model('Message',MessagesSchema)
export default Message