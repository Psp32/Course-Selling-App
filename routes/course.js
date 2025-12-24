const express = require('express')
const courseRouter = express.Router()

courseRouter.post('/purchase',(req,res)=>{
    // Here, we expect the user to pay money
})

courseRouter.get('/preview',(req,res)=>{

})

module.exports = {courseRouter:courseRouter}