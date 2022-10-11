const mongoose = require("mongoose")

// const Schema= mongoose.Schema


// const workSchema = {
//     workout:new mongoose.Schema({
//         title:{
//             type: String,
//             required: true
//         },
//         reps:{
//             type: Number,
//             required: true
//         },
//         load:{
//             type:Number,
//             requried:true
//         }
// },{timestamps: true}),
// }


const  workoutSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    reps:{
        type: Number,
        required: true
    },
    load:{
        type:Number,
        requried:true
    }
},{timestamps: true})

module.exports= mongoose.model("Workout", workoutSchema)
