const db = require('../config/connection');
const collection = require('../config/collection');
const bcrypt = require('bcrypt');
const {Auth} = require('two-step-auth');



module.exports = {

    ShopSignup : (async(req,res)=>{
        var shopDetails = req.body
        shopDetails.password = await bcrypt.hash(shopDetails.password,10)
        const checkEmail = await db.get().collection(collection.SHOP_COLLECTION).findOne({email:shopDetails.email})

        if(checkEmail == null){
            var emailId = shopDetails.email
            var Res = await Auth(emailId,"company name");
            shopDetails.member = "shop"
            shopDetails.otp = Res.OTP
            db.get().collection(collection.AUTHENTICATION_COLLECTION).insertOne(shopDetails).then(()=>{
                
                res.status(201).json({
                    message:"shop details created"
                })
            })
        }else{
            res.status(401).json({
                message:"Email Already used"
            })
        }

    }),
    SHOP_EMAIL_OTP_VERIFY : (async(req,res)=>{
        var data = req.body
        var shopInfo =await db.get().collection(collection.AUTHENTICATION_COLLECTION).find({email:data.email,member:'shop'}).sort({_id:-1}).limit(1).toArray()  
        if(shopInfo[0]){
            shopInfo = shopInfo[0]
        }else{
            shopInfo = 0
        }
        if(shopInfo.otp == data.otp){
            var {otp,_id,...shopData} = shopInfo
            var insertData = await db.get().collection(collection.SHOP_COLLECTION).insertOne(shopData)
            res.status(201).json({
                message:"shop created",
                insertData
            })
        }else{
            res.status(401).json({
                message:"OTP not correct"
            })
        }

    }),
    SHOP_RESEND_OTP : (async(req,res)=>{
        var emailId =req.body.email
        var Res = await Auth(emailId, "Company Name");
        var updateOTP = await db.get().collection(collection.AUTHENTICATION_COLLECTION).updateOne({email:emailId,member:"shop"},{$set:{otp:Res.OTP}})
        res.status(200).json({
            message:'resend otp success'
        })
    })


}
