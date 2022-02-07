
const db = require("../config/connection");
const collection =require("../config/collection")

module.exports = {

    ADMIN_LOGIN : (async(req,res)=>{

        if(process.env.ADMIN_EMAIL == req.body.email && process.env.ADMIN_PASSWORD == req.body.password){
            
            res.status(200).json({
                message:"Admin Login successs "
            })

        }else{
            res.status(401).json({
                message:"Email or Password is not correct"
            })
        }
    })



}
