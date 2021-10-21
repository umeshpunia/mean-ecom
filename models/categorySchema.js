const mongoose = require('mongoose')

const {Schema}=mongoose;


const catSchema=new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    pic:{
        type:String,
    },
    addedOn:{
        type:Date,
        default:Date.now
    },
    desc:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    addedBy:{
        type:String
    }
})

module.exports=mongoose.model("category",catSchema)