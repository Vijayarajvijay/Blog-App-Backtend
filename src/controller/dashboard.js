import blogModel from "../models/blogs.js";
import { Status } from "../common/utils.js";

const getAllBlogs = async(req,res)=>{
     try {
        let blog = await blogModel.find({status:Status.APPROVED},{_id:1,title:1,imageUrl:1,createdAt:1,description:1})
        res.status(200).send({
            message:"blog Fetching Successfull",
            blog
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal server Error",
            error:error.message
        })
     }
}

export default{
    getAllBlogs
}