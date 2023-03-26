const jwt=require('jsonwebtoken')
const {BadRequest}=require('../errors/bad-request')

const login=async(req,res)=>{


    const{username,password}=req.body
    if(!username||!password){
        throw new BadRequest('please provote email and password')
    }
    const id=new Date().getDate()
    const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
   // res.send(200).json({msg:'user created',token})
    res.status(200).json({msg:'user created',token})
}

const dashboard=async(req,res)=>{

    const luckyNumber=Math.floor(Math.random()*1000)
    res.status(200).json({msg:`hello ${req.user.username}`, secret: ` your lucky number is ${luckyNumber}`})

}

module.exports={
    login, dashboard,
}