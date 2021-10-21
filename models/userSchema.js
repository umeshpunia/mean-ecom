const mongoose = require('mongoose')

const {Schema}=mongoose;


const userSchema=new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    registeredOn:{
        type:Date,
        default:Date.now
    },
    name:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    registeredBy:{
        type:String
    },
    profile:{
        type:String
    }
})

module.exports=mongoose.model("user",userSchema) 