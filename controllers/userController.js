
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

// login user
const loginUser=async(req, res)=>{
    res.json({msg:'login user'})
}
// signup user
const signupUser=async(req, res)=>{
    const {email, password} = req.body
    const userExist = await User.findOne({email})
    if (userExist){
        res.status(400).json({msg:'user exist with same email'})
        return console.log("true",userExist)
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await User.create({email, password:hash})
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({error:error.msg})
    }
}

module.exports={signupUser, loginUser}