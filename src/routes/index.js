import express from 'express'
import UserRoutes from './users.js'
import BlogRoutes from './blog.js'
import dashrRoutes from './dsashboard.js'
const router = express.Router()


router.use('/user',UserRoutes)
router.use('/blog',BlogRoutes)
router.use('/dashboard',dashrRoutes)


export default router  
