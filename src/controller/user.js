import userModel from "../models/user.js";
import Auth from "../common/auth.js";

const create = async(req,res)=>{
    try {
       let user = await  userModel.findOne({email:req.body.email})
    if(!user){
        req.body.password = await Auth.hashPassword(req.body.password)
        await userModel.create(req.body)
        res.status(201).send({
            message:"user created Successfully"
        })
    }
    else{
        res.status(400).send({
            message:`user with ${req.body.email} already exist`
        })
    }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const login = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email})
   if(user)
   {
    let hashcompare = await Auth.hashPassword(req.body.password,user.password)
    if (hashcompare)
    {
        let Token = await Auth.createTokens({
            id : user._id,
            firstName: user.firstName,
            lastName : user.lastName,
            email : user.email,
            role : user.role
        })
        let userData = await userModel.findOne({email:req.body.email},{firstName:1,lastName:1,role:1})
    res.status(200).send({
        message:"Login sucessfully",
        Token,
        userData
    })
    }
    else {
        res.status(400).send({
           message : "Invalid Password"
        })
    }
    
   }
   else{
    res.status(400).send({
        message : `Account with ${req.body.email} is not exist!`
    })
   }
    } catch (error) {
        res.status(500).send({
            message : "Internal Error",
            Error:error.message
        })
    }
   
}

export default {
    create,
    login
}