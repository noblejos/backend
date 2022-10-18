const validator = require('validator')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const { json } = require('express')

const createToken=(_id)=>{
return jwt.sign({_id}, process.env.SECRET, {expiresIn:'3d'})
}


// login user
const loginUser = async(req, res)=>{
    const {email, password} = req.body
    // validation
    if(!email || !password){
        return res.status(400).json({msg: 'All feilds must be filled'})
    }
    const user = await User.findOne({email})
    if(!user) return res.status(400).json("incorect email")

    const match  = await bcrypt.compare(password, user.password)
    if(!match) return res.status(400).json("incorect password")

    const token = createToken(user._id)
    res.status(200).json({email, token})    
}


// signup user
const signupUser=async(req, res)=>{
    const {email, password} = req.body
    // validation
    if(!email || !password){
        return res.status(400).json({msg: 'All feilds must be filled'})
    }
    if(!validator.isEmail(email)){
      return  res.status(400).json({msg:'Email is not valid'})
    }
    if(!validator.isStrongPassword(password)){
        return  res.status(400).json({msg:'Password not strong enough'})
    }

    const userExist = await User.findOne({email})
    if (userExist){
        res.status(400).json({msg:'user exist with same email'})
        return;
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await User.create({email, password:hash})

       const token= createToken(user._id)
    //    console.log({token})
        res.status(200).json({user,token})
    } catch (error) {
        res.status(400).json({error:error.msg})
    }
}

module.exports={signupUser, loginUser}