const db = require("../config/connection");
const collection = require("../config/collection");
const bcrypt = require("bcrypt");
const { Auth } = require("two-step-auth");

const messages = {
    shopSignup:"Shop details created",
    shopSignupErr:"Email Already used",
    shopEmailOTP:"Shop created",
    shopEmailOTPErr:"OTP not correct",
    shopResendOTP:"Resend otp success",

}



module.exports = {
  ShopSignup: async (req, res) => {
    const shopDetails = req.body;
    shopDetails.password = await bcrypt.hash(shopDetails.password, 10);
    const checkEmail = await db
      .get()
      .collection(collection.SHOP_COLLECTION)
      .findOne({ email: shopDetails.email });

    if (checkEmail == null) {
      const emailId = shopDetails.email;
      const Res = await Auth(emailId, "company name");
      shopDetails.member = "shop";
      shopDetails.otp = Res.OTP;
      db.get()
        .collection(collection.AUTHENTICATION_COLLECTION)
        .insertOne(shopDetails)
        .then(() => {
          res.status(201).json({
            message: messages.shopSignup,
          });
        });
    } else {
      res.status(401).json({
        message: messages.shopSignupErr,
      });
    }
  },
  SHOP_EMAIL_OTP_VERIFY: async (req, res) => {
    const data = req.body;
    const shopInfo = await db
      .get()
      .collection(collection.AUTHENTICATION_COLLECTION)
      .find({ email: data.email, member: "shop" })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    if (shopInfo[0]) {
      shopInfo = shopInfo[0];
    } else {
      shopInfo = 0;
    }
    if (shopInfo.otp == data.otp) {
      const { otp, _id, ...shopData } = shopInfo;
      const insertData = await db
        .get()
        .collection(collection.SHOP_COLLECTION)
        .insertOne(shopData);
      res.status(201).json({
        message: messages.shopEmailOTP,
        insertData,
      });
    } else {
      res.status(401).json({
        message: messages.shopEmailOTPErr,
      });
    }
  },
  SHOP_RESEND_OTP: async (req, res) => {
    const emailId = req.body.email;
    const Res = await Auth(emailId, "Company Name");
    const updateOTP = await db
      .get()
      .collection(collection.AUTHENTICATION_COLLECTION)
      .updateOne(
        { email: emailId, member: "shop" },
        { $set: { otp: Res.OTP } }
      );
    res.status(200).json({
      message: messages.shopResendOTP,
    });
  },
};
