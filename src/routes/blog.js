import express from 'express'
import blogcontroller from '../controller/blog.js'
import Auth  from '../common/auth.js'

const router = express.Router()

router.post('/create',blogcontroller.createBlog)
router.put('/edit/:id',Auth.validate,)
router.get('/user',Auth.validate,blogcontroller.getBlogsByUserId)
router.put('/status/:id/:status',Auth.validate,Auth.adminGaurd,blogcontroller.updateStatus)
router.get('/',Auth.validate,Auth.adminGaurd,blogcontroller.getAllblogs)
router.get('/:id',Auth.validate,blogcontroller.getBlogsById)


export default router