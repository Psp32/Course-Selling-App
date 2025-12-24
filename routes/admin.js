const {Router} = require('express')
const adminRouter = Router()

// This route will cater - '/api/v1/admin/signup'
adminRouter.post('/signup',(req,res)=>{
    res.json({
        msg: "signup endpoint"
    })
})

// This route will cater - '/api/v1/admin/signin'
adminRouter.post('/signin',(req,res)=>{

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