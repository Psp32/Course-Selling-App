const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const objId = Schema.ObjectId
require("dotenv").config() // using .env file to store my db connection string and fetch from that file using dotenv lib.

mongoose.connect(process.env.mongoDB_url)

const userSchema = Schema({
    email: {type:String, unique:true},
    password: String,
    firstname: String,
    lastname: String
})

const courseSchema = Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: objId
})

const adminSchema = Schema({
    email: {type: String,unique:true},
    password: String,
    firstname: String,
    lastname: String
})

const purchaseSchema = Schema({
    courseId: objId,
    userId: objId
})

const userModel = mongoose.model('Users',userSchema)
const courseModel = mongoose.model('Course',courseSchema)
const adminModel = mongoose.model('Admin',adminSchema)
const purchaseModel = mongoose.model('Purchase',purchaseSchema)

module.exports = {
    userModel:userModel,
    courseModel:courseModel,
    adminModel:adminModel,
    purchaseModel:purchaseModel
}