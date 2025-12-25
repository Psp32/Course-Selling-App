const express = require('express')
const userRouter = express.Router() // Router instance created
const {userModel, purchaseModel, courseModel} = require('../db')
const {userMiddleware} = require('../middleware/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const zod = require('zod')
require('dotenv').config()

userRouter.use(express.json())

// This route will cater - '/api/v1/user/signup'
userRouter.post('/signup',async (req,res)=>{
    const {email,password,firstName,lastName} = req.body
    const userSchema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(3).max(50).regex(/[$&^%#@]/),
        firstName: zod.string().min(3).max(50),
        lastName: zod.string().max(50)
    })

    // No need to use safeParseAsync here bcz here we are doing all synchronous tasks using zod like .email(),.string(),.min(3)...etc..
    // We use safeParseAsync when we do asynchronous tasks like - if we are checking user exists in db,....etc.... 
    if(!(userSchema.safeParse({email,password,firstName,lastName}).success)){
        return res.status(403).json({
            msg: "Credentials format fails"
        })
    }

    const hashedPassword = await bcrypt.hash(password,15)

    // TODO: add zod, hash password, put try catch
    try{
        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })

        res.json({
            msg: "signup done"
        })
    }catch(e){
        res.status(500).json({
            msg: "Server error (Not able to connect to DB)"
        })
    }
})

// This route will cater - '/api/v1/user/signin'
userRouter.post('/signin',async (req,res)=>{
    const {email,password} = req.body

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(403).json({
            msg: "User does not exist"
        })
    }
    if(!(await bcrypt.compare(password,user.password))){
        return res.status(403).json({
            msg: "Incorrect Password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_USER)
    res.json({
        token: token
    })
})

// This route will cater - '/api/v1/user/purchase'
userRouter.get('/purchase',userMiddleware, async (req,res)=>{
    const userId = req.userId

    const purchased = await purchaseModel.find({
        userId:userId
    })

    const courses = []
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