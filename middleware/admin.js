const jwt = require('jsonwebtoken')
require('dotenv').config()

function adminMiddleware(req,res,next){
    const token = req.headers.token
    
    const decoded = jwt.verify(token, process.config.JWT_SECRET_ADMIN)

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

module.exports = {adminMiddleware}