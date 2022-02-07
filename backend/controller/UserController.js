const db=require('../config/connection');
const collection=require("../config/collection");
const bcrypt = require('bcrypt');
const {Auth} = require('two-step-auth');
const TWILIO_OTP = require('../config/TwilioOTP');



module.exports={

    UserSignup : (async(req,res)=>{
       
            var details = req.body
            details.password = await bcrypt.hash(details.password,10)
            const checkEmail = await db.get().collection(collection.USER_COLLECTION).findOne({email:details.email})
        
            if(checkEmail == null){
                var emailId = details.email
    
                    var Res = await Auth(emailId, "Company Name");
                    details.member = "user"
                    details.otp = Res.OTP
                    db.get().collection(collection.AUTHENTICATION_COLLECTION).insertOne(details).then((data)=>{
                        res.status(201).json({
                            message:"user details created",
                
                        })
                    })
                
            }else{
                res.status(401).json({
                    message:"Email already used"
                })
            }
    }),
    OTP_VERIFY : (async(req,res)=>{
        var data = req.body
        var userInfo =await db.get().collection(collection.AUTHENTICATION_COLLECTION).find({email:data.email,member:'user'}).sort({_id:-1}).limit(1).toArray()  
        
        if(userInfo[0]){
            userInfo = userInfo[0]
        }else{
            userInfo = 0
        }
        
        if(userInfo.otp == data.otp){
            var {otp,_id,...userData} = userInfo
            var insertData = await db.get().collection(collection.USER_COLLECTION).insertOne(userData)
            var deleteData = await db.get().collection(collection.AUTHENTICATION_COLLECTION).deleteMany({email:userInfo.email})
            
            res.status(201).json({
                message:"user created",
                data:insertData
            })
        }else{
            res.status(401).json({
                message:"OTP not correct"
            })
            
        }

    }),
    RESEND_OTP : (async(req,res)=>{
        var emailId =req.body.email
        var Res = await Auth(emailId, "Company Name");
        var updateOTP = await db.get().collection(collection.AUTHENTICATION_COLLECTION).updateOne({email:emailId},{$set:{otp:Res.OTP}})
        res.status(200).json({
            message:'resend otp success'
        })
    }),
    USER_LOGIN : (async(req,res)=>{

        let user = await db.get().collection(collection.USER_COLLECTION).findOne({email:req.body.email})
        console.log('user',user);
        if(user){
            bcrypt.compare(req.body.password,user.password).then((result)=>{
                if(result){
                    res.status(200).json({
                        message:"password is correct",
                        userdetails:user
                    })
                }else{
                    res.status(401).json({
                        message:"password is not currect"
                    })
                }
            })
        }else{
            res.status(401).json({
                message:"email is not correct"
            })
        }
    }),
    SET_MOBILE : (async(req,res)=>{
        let mobileNum = req.body.mobile
        mobileNum = parseInt(mobileNum)


    

    })




}


