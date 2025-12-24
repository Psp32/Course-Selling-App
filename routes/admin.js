const {Router} = require('express')
const adminRouter = Router()
const {adminModel,courseModel} = require('../db')
const jwt = require('jsonwebtoken')
const {adminMiddleware} = require('../middleware/admin')
require('dotenv').config()

// This route will cater - '/api/v1/admin/signup'
adminRouter.post('/signup',async (req,res)=>{
    const {email,password,firstName,lastName} = req.body

    // TODO: add zod, hash password, put try catch
    await adminModel.create({
        email,
        password,
        firstName,
        lastName
    })

    res.json({
        msg: "signup done"
    })
})

// This route will cater - '/api/v1/admin/signin'
adminRouter.post('/signin',async (req,res)=>{
    const {email,password} = req.body

    const admin = await adminModel.findOne({
        email,
        password // after hashing, check pw check first 
    })

    console.log(admin)
    if(admin){
        const token = jwt.sign({id:admin._id},process.env.JWT_SECRET_ADMIN)
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            msg: "User doesn't exists"
        })
    }
})

// Has to put a middleware (adminAuth) here to check if this is an admin or not, for all the requests after this line.

adminRouter.post('/course',adminMiddleware,async (req,res)=>{
    const {title, description, price, imageUrl} = req.body
    const adminId = res.userId

    const course = await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId: adminId
    })

    console.log(course)
    res.json({
        msg : "Course Created",
        courseId : course._id
    })
})

adminRouter.put('/course',adminMiddleware, async (req,res)=>{
    const {updatedTitle, updatedDescription, updatedPrice, updatedImageUrl, courseId} = req.body
    const adminId = res.userId

    // Syntax - updateOne( Takes filtering criteria, updated details )
    const course = await courseModel.updateOne({
        _id: courseId, // we will filter on the basis of these details
        creatorId: adminId // if we dont do filter with creatorId then Admin 1 can change details of course by Admin 2 which is a prblm.
    },{
        updatedTitle,
        updatedDescription,
        updatedPrice,
        updatedImageUrl,
    })

    res.json({
        msg : "Course Created",
        courseId : course._id,
        course
    })
})

adminRouter.get('/course',adminMiddleware,async (req,res)=>{
    const adminId = res.userId

    //updateOne( Takes filtering criteria, updated details )
    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        msg : "All Courses",
        courses
    })
})

module.exports = {adminRouter:adminRouter}