const jwt = require('jsonwebtoken')
require('dotenv').config()

function userMiddleware(req,res,next){
    const token = req.headers.token
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER)

    console.log(decoded)
    if(decoded){
        res.userId = decoded.id
        next()
    }else{
        res.status(403).json({
            msg: "U are not authorized"
        })
    }
}

module.exports = {userMiddleware}