const express = require('express')
const userRouter = express.Router() // Router instance created
const {userModel, purchaseModel, courseModel} = require('../db')
const {userMiddleware} = require('../middleware/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

userRouter.use(express.json())

// This route will cater - '/api/v1/user/signup'
userRouter.post('/signup',async (req,res)=>{
    const {email,password,firstName,lastName} = req.body

    // TODO: add zod, hash password, put try catch
    const user = await userModel.create({
        email,
        password,
        firstName,
        lastName
    })

    res.json({
        msg: "signup done"
    })
})

// This route will cater - '/api/v1/user/signin'
userRouter.post('/signin',async (req,res)=>{
    const {email,password} = req.body

    const user = await userModel.findOne({
        email,
        password // after hashing, check pw check first 
    })

    console.log(user)
    if(user){
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_USER)
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            msg: "User doesn't exists"
        })
    }
})

// This route will cater - '/api/v1/user/purchase'
userRouter.get('/purchase',userMiddleware, async (req,res)=>{
    const userId = req.userId

    const purchased = await purchaseModel.find({
        userId:userId
    })

    courses = []
    for(var i=0;i<purchased.length;i++){
        const course = await courseModel.find({
            _id: purchased[i].courseId
        })

        courses.push(course)
    }

    // This above code is same as -
    // const coursesData = await courseModel. find({
    //     _id: { $in: purchasedCourseIds }
    // })

    res.json({
        courses
    })
})

// Here, we are not exporting any function now, now we are exporting router instance/object.
module.exports = {userRouter: userRouter}