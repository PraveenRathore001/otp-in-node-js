const Joi=require('joi');
// const schema = require("../model/userSchema")



const signupschema = Joi.object().keys({ 
    fullname:Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password:Joi.string().required(),
    // confirmpassword: Joi.string().required(),
    isverify: Joi.boolean() ,
    age:Joi.number().required() 
})

const userval=async(req,res,next)=>{
const{fullname,email,password}=req.body
const abc={fullname,email,password}
const value=await signupschema.validate(req.body.abc);
console.log(value,'value');
if (value.error) {
    // res.status(400).json({
    //   status: "Failed",
    //   message: value.error.details[0].message
    // });
    console.log(value.error);
}else{
console.log('valid data');
next()
}
}

module.exports={userval}