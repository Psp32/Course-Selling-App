const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.sendFile(index.html)
})

app.post('/user/signup',(req,res)=>{

})

app.post('/user/signin',(req,res)=>{

})

app.post('/course/purchase',(req,res)=>{
    
})

app.get('/courses',(req,res)=>{

})

app.get('/user/my-course',(req,res)=>{

})

app.listen(3000,()=>{
    console.log("http://localhost:3000")
})