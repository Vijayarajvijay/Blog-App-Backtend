import mongoose from "./index.js";
import { Status } from "../common/utils.js";

const blogSchema = new mongoose.Schema({
  
    title:{type:String,required:[true,'Title is required']},
    imageUrl:{type:String,required:[true,'imageUrl is required' ]},
    description:{type:String,required:[true,'Discription is required']},
    status:{type:String,default:Status.PENDING},
    createdBY:{type:String,requried:[true,'Created by is required ']},
    approvedBy:{type:String},
    modifiedAt:{type:Date},
    rejectedBy:{type :String},
    reason:{type:String},
    createdAt:{type:Date,default:Date.now()}
},
{
    collection:'blog',
    versionKey:false
})

const blogModel = mongoose.model('blog',blogSchema)
export default blogModel