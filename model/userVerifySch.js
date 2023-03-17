const mongoose=require('mongoose');



const USverifyschema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    OTP:{
        type:Number,
        required:true
    }

})
module.exports=mongoose.model('userotp',USverifyschema)

