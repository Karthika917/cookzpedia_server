const jwt = require('jsonwebtoken')
const users = require('../Models/userModel')

const adminjwtMiddleware = async(req,res,next)=>{
    try{
    const token=req.headers.authorization?.split(" ")[1]
    const verifiedRes=jwt.verify(token,process.env.SECRET_KEY)
    const existingUser = await users.findById(verifiedRes._id)
    if(existingUser.role== "Admin"){
       req.payload=verifiedRes._id
       next()
    }
    else{
        res.status(406).json("Unauthorized Access!")
    }
   
}
    
catch(err){
    console.log(err)
    res.status(500).json("JWT ERROR" + err)
}

}

module.exports= adminjwtMiddleware