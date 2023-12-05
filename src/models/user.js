
import mongoose from './index.js'


const userSchema = new mongoose.Schema({
    firstName:{type:String,required:[true,"First Name is required"]},
    lastName:{type:String,required:[true,"Last Name is required"]},
    email:{type:String,required:[true,"Email is required"]},
    password:{type:String,required:[true,"Password is required"]},
    status:{type:Boolean,default:true},
    role:{type:String,default:'user'},
    createdAT:{type:Date, default:Date.now()}

},
{
    collection:'users',
    versionKey:false
})

const userModel = mongoose.model('user',userSchema)

export default userModel