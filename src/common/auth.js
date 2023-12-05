import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken'

const hashPassword = async(password)=>{
   let salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
   let hash = await bcrypt.hash(password,salt)
   return hash
}

const hashcompare = async (password,hash)=>{
    return await bcrypt.compare(password,hash)
}

const createTokens = async(payload)=>{
    const Token = await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
    return Token
}

const decodeToken = async(Token)=>{
    const payload = await jwt.decode(Token)
    return payload

}

const validate = async(req,res,next)=>{
    let Token = req.headers.authorization?.split(" ")[1]
    if(Token)
    {
        let payload = await decodeToken (Token)
    
        let currentTime = (+new Date())/1000
        if(currentTime<payload.exp){
            next()
        }
        else{
            res.status(401).send({
                message : 'Token Expired'
            })
        }
    }
    else{
        res.status(401).send({message:"No Token Found"})
    }
}

const adminGaurd = async(req,res,next)=>{
    let Token = req.headers.authorization?.split(" ")[1]
    if(Token){
      let payload = await decodeToken(Token)
      if(payload.role==="admin"){
        next()
      }
      else{
        res.status(401).send({message:"Admin only acces"})
      }
    }
    else{
        res.status(401).send({message:"Token not found"})
    }
}

export default {
    hashPassword,
    hashcompare,
    createTokens,
    validate,
    adminGaurd
   
}