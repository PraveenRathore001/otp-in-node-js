const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/otp",{useNewUrlParser :true}).then(()=>{
    console.log('database connected succesfully')
}).catch((err)=>{
    console.log('error in connection');
})
