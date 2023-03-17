const Crypto= require('crypto')
const otpGenerator = require('otp-generator')
const nodemailer=require('nodemailer')
const Jwt=require('jsonwebtoken')
// require('dotenv').config()
const schema = require("../model/userSchema")
const otpschema=require('../model/userVerifySch')

const signup = async (req, res) => {
    const {email,password,confirmpassword} = req.body
    try {
        // console.log(req.body.email,"dfgjgn");
        // const data = new User(req.body)

        const match = new schema(req.body)
        console.log(match,'naaaaaaaaaaaaaaaaaaaaaaaaaaaaam');
        const userExists = await schema.findOne({ email: email });
        if(userExists){
            res.json({
                message:"email already exists"
            })
        }else{
        console.log("kjjjjg",match);
        // console.log(password);
        if (match.password==req.body.confirmpassword) {

        const hash =await Crypto.createHmac("sha256",match.password).digest("hex");
        match.password=hash

       const otp= otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false,digits:true });


        const mailsender = function () {
            let mailTransporter = nodemailer.createTransport({
                service: 'outlook',
                auth: {
                    user: 'rishabhshri20@outlook.com',
                    pass: 'Rishabh@123'
                }
            });
        
            let mailDetails = {
                from: 'rishabhshri20@outlook.com',
                to: match.email,
                subject: 'email verify',
                text:`to verify your account the otp is ${otp}`
            };
        
            mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
        
            })
        }
         mailsender();


         console.log(otp,"ndkjnd");
         
         let otpmatch  = new otpschema()
         otpmatch.email=email
         otpmatch.OTP= otp
         console.log(otpmatch,"kjk");
         console.log( otpmatch,"gsgds");
           const daraa =  await otpmatch.save()
           console.log(daraa);



        const token = Jwt.sign(
            { userID: match._id },
            'hello12234',
            { expiresIn: "15d" }
            );
            console.log(token)
            
            const data = await match.save()
            if(data){
            res.json({
                message: "data saved successfully",
                Token:token,
                data: data
            })}
            console.log(hash)
            console.log(match);

        } else {
            res.send("incorrect password plz try again later")
        }
        // const hashed = await Crypto.createHmac("sha256", match.confirmpassword).digest("hex");
        // match.password = hash
        // match.confirmpassword=hashed
        
    }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
}

const verifyotp=async(req,res)=>{
 
 const{email,otp}=new otpschema(req.body)
 const verifiedmail=schema.findOne({email,email})
 if(verifiedmail){
  const matchedata=  await otpschema.findOne({email:email,otp:otp})
  if(matchedata){
        console.log("verified");
  
  }else{
        console.log('not verified');
    }
    
 }else{
    console.log('email doesnt match plz signup first');
 }
}








module.exports = {signup,verifyotp}