import {Schema,models,model} from 'mongoose'

const PropertySchema=new Schema({
owner:{type:Schema.Types.ObjectId,ref:"User",required:true},
name:{type:String,required:true},
type:{type:String,required:true},
description:{type:String},
location:{

street:{type:String,required:true},
city:{type:String,required:true},
state:{type:String,required:true},
zipcode:{type:String,required:true}


},
beds:{type:Number,required:true},
baths:{type:Number,required:true},
square_feet:{type:Number,required:true},
amenities:[{type:String}],
rates:{nightly:{type:Number},weekly:{type:Number},monthly:{type:String}},
seller_info:{name:{type:String},email:{type:String},phone:{type:String}},
images:[{type:String}],
is_featured:{type:Boolean,default:false}
},{timestamps:true});

const propertymodel=models.Property||model('Property',PropertySchema);
export default propertymodel;