const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        requried: true,
        unique:true
    },
    password:{
        type: String,
        requried: true
    }
})

module.exports=mongoose.model('User', userSchema)