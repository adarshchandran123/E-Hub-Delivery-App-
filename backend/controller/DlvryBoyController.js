const db = require('../config/connection');
const collection = require('../config/collection');



module.exports = {


    DlvryBoySignUp : (async(req,res)=>{
        var dlvryBoyDetails = req.body
        dlvryBoyDetails.password = await bcrypt.hash(dlvryBoyDetails.password,10)
        const checkEmail = await db.get().collection(collection.DELIVERYBOY_COLLECTION).findOne({email:dlvryBoyDetails.email})

        if(checkEmail == null){
            var emailId = dlvryBoyDetails.email
            var Res = await Auth(emailId,"company name");
            dlvryBoyDetails.member = "dlvryBoy"
            dlvryBoyDetails.otp = Res.OTP
            db.get().collection(collection.AUTHENTICATION_COLLECTION).insertOne(dlvryBoyDetails).then(()=>{
                
                res.status(201).json({
                    message:"dlvryBoy details created"
                })
            })
        }else{
            res.status(401).json({
                message:"Email Already used"
            })
        }

    }),
    DlvryBoyEmailVerify : (async(req,res)=>{
        var data = req.body
        var dlvryBoyInfo =await db.get().collection(collection.AUTHENTICATION_COLLECTION).find({email:data.email,member:'dlvryBoy'}).sort({_id:-1}).limit(1).toArray()  
        if(dlvryBoyInfo[0]){
            dlvryBoyInfo = dlvryBoyInfo[0]
        }else{
            dlvryBoyInfo = 0
        }
        if(dlvryBoyInfo.otp == data.otp){
            var {otp,_id,...dlvryBoyData} = dlvryBoyInfo
            var insertData = await db.get().collection(collection.DELIVERYBOY_COLLECTION).insertOne(dlvryBoyData)
            res.status(201).json({
                message:"dlvryBoy created",
                insertData
            })
        }else{
            res.status(401).json({
                message:"OTP not correct"
            })
        }

    }),
    DlvryBoy_RESEND_OTP : (async(req,res)=>{
        var emailId =req.body.email
        var Res = await Auth(emailId, "Company Name");
        var updateOTP = await db.get().collection(collection.AUTHENTICATION_COLLECTION).updateOne({email:emailId,member:"dlvryBoy"},{$set:{otp:Res.OTP}})
        res.status(200).json({
            message:'resend otp success'
        })
    }),



    
}

