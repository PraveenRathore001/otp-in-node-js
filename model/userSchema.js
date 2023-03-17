const mongoose=require('mongoose');


const Userschema =new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
//    confirmpassword:{
//         type:String,
//         required:true
        
//     },
    isverify:{
        type:Boolean,
        default:false
    },
    age:{
        type:Number,
        required:true
    }

})
module.exports = mongoose.model("user",Userschema)