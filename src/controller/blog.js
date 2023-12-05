import { Status } from "../common/utils.js"
import blogModel from "../models/blogs.js"

const createBlog = async(req,res)=>{
    try {
        const {title,imageUrl,description} = req.body
        if(title && imageUrl && description ) {
            await blogModel.create({
                title,
                imageUrl,
                description,
                createdBy:req.header.userId
            })
            res.status(201).send({
                message:"Blog created , send for approval"
            })
        }
        else{
            res.status(400).send({
                message:"Title, imageUrl, description are required"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal server Error",
            error:error.message
        })
    }
}

const getAllblogs = async(req,res)=>{
    try {
        let blog = await blogModel.find({},{title:1,imageUrl:1,status:1,createdAt:1})

        res.status(200).send({
            message:"blogs fetched successfully",
            blog
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal server Error",
            error:error.message
        })
    }
}

const getBlogsById= async(req,res)=>{
    try {
        const blogId = req.params.id
        if(blogId){
        let blog = await blogModel.findById(req.params.id)
        res.status(200).send({
            message:"blog fetched successfully",
            blog
    
        })
    }
    else
    {
        res.status(400).send({
            message:"Blog is not found "
        })
    }
    } catch (error) {
        res.status(500).send({
            message:"Internal server Error",
            error:error.message
        })
    }
}

const editBlog = async(req,res)=>{
    try {
        const blogId = req.params.id
        if(blogId)
        {
            const{title,imageUrl,description} = req.body
            let blog = await blogModel.findById(blogId)
            blog.title = title
            blog.imageUrl = imageUrl
            blog.description  = description
            blog.status = Status.PENDING
            blog.modifiedAt = Date.now()

            await blog.save()

            res.status(200).send({
                message:"Blog edited successfully",
                
            })
        }
        else
        {
            res.status.send({
                message:"blog id not found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal server Error",
            error:error.message
        })
    }
}

 const getBlogsByUserId = async(req,res)=>{
    try {
       let blog = await blogModel.find({createdBY:req.headers.userId},{title:1,imageUrl:1,status:1,createdAt:1}) 
       res.status(200).send({
        message:"blog fetch successfully",
        blog
       })
    } catch (error) {
        res.status(500).send({
            message:"Internal server Error",
            error:error.message
        })
    }
 }

 const updateStatus = async(req,res)=>{
    try {
        const blogId = req.params.id
        const status = req.params.status
        if(blogId && status){
           const {reason} = req.body
            let blog = await blogModel.findById(blogId)
            if(status===Status.APPROVED)
            {
                blog.status = Status.APPROVED
                blog.approvedBy = req.headers.userId
                blog.reason = ""
            }
            else if(status===Status.REJECT)
            {
                blog.status=Status.REJECT
                blog.rejectedBy = req.headers.userId
                blog.reason = reason
            }
            else{
                blog.status = Status.PENDING
            }
            blog.modifiedAt = Date.now()
            await blog.save()

            res.status(200).send({
                message:"blog status updated successfully"
            })
        }
        else{
            res.status(400).send({
                message:"Blog id Not Found"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal server Error",
            error:error.message
        })
    }
 }


export default{
    createBlog,
    getAllblogs,
    getBlogsById,
    editBlog,
    getBlogsByUserId,
    updateStatus,
}

