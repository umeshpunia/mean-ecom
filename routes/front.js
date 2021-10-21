const express = require('express')

const jwt=require('jsonwebtoken')

const router = express.Router();


router.get('/',(req,res)=>{

    const {authorization}=req.headers

    jwt.verify(authorization,process.env.JWT_SECRET,(err,data)=>{
        if(err) return res.status(401).json({"status":401,"msg":err.message});
        res.status(200).json({"status":200,"msg":data});

    })


})


router.post("/login",jwtCreate,(req,res)=>{

})


function jwtCreate(req,res,next){


    const token=jwt.sign({email:"sunita@gmail.com",exp:2000},process.env.JWT_SECRET)

    res.send(token)
    next()

}


module.exports=router