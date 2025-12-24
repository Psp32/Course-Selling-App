const express = require('express')
const path = require('path')
const app = express()
app.use(express.json())

const {userRouter} = require('./routes/user')
const {courseRouter} = require('./routes/course')

app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000,()=>{
    console.log("http://localhost:3000")
})