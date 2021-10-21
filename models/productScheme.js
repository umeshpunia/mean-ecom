const mongoose = require('mongoose')

const {Schema}=mongoose;


const proSchema=new Schema({
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
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("product",proSchema)