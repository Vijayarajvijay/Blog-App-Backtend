import express from 'express'
import dashcontroller from '../controller/dashboard.js'
import Auth from '../common/auth.js'

const router = express.Router()

router.get('/',Auth.validate,dashcontroller.getAllBlogs)

export default router