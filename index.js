const express = require('express')
const app = express()

// If we have all the routes here, this file will become too big and would be a problem in future for debugging.
// We can use routing in express like user route for "/user/..." routes and course route for "/course/..." routes.

// This is ugly way of routing.
const { userRouteCreate } = require('./user')
const {courseRouteCreate} = require('./course.js')

app.get('/',(req,res)=>{
    res.sendFile(index.html)
})

userRouteCreate(app)
courseRouteCreate(app)

app.listen(3000,()=>{
    console.log("http://localhost:3000")
})