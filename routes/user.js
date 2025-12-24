const express = require('express')
const userRouter = express.Router() // Router instance created

// This route will cater - '/api/v1/user/signup'
userRouter.post('/signup',(req,res)=>{
    res.json({
        msg: "signup endpoint"
    })
})

// This route will cater - '/api/v1/user/signin'
userRouter.post('/signin',(req,res)=>{

})

// This route will cater - '/api/v1/user/purchase'
userRouter.get('/purchase',(req,res)=>{

})

// Here, we are not exporting any function now, now we are exporting router instance/object.
module.exports = {userRouter: userRouter}