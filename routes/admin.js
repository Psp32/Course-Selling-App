const {Router} = require('express')
const adminRouter = Router()
const {adminModel} = require('../db')
const jwt = require('jsonwebtoken')
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

adminRouter.post('/course',(req,res)=>{
    res.json({
        msg:"Post courses"
    })
})

adminRouter.put('/course',(req,res)=>{
    res.json({
        msg:"Edit courses"
    })
})

adminRouter.get('/course',(req,res)=>{
    res.json({
        msg:"Get all courses"
    })
})

module.exports = {adminRouter:adminRouter}