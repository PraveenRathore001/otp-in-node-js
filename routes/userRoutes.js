const express=require('express')
const router=express()
const Controller=require('../controller/userController')
const val=require('../validation/validate')


router.post('/adduser',val.userval,Controller.signup)
router.post('/verify',Controller.verifyotp)





module.exports= router
