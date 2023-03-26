const jwt=require('jsonwebtoken')
const {UnauthenticatedError}=require('../errors')


const authMiddleware=async(req,res,next)=>{
    const authHeader= req.headers.authorization
    if(!authHeader||!authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No Token provided')
    }
    const token= authHeader.split(' ')[1]
    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET) 
        const{id,username}=decode
        req.user={id,username}
        next()
        } catch (error) {
         throw new UnauthenticatedError('No authorized to access this route')
     }
}

module.exports=authMiddleware