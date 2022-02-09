const db = require("../config/connection");
const collection = require("../config/collection");
const bcrypt = require("bcrypt");
const { Auth } = require("two-step-auth");

const messages = {
    usersignup:"User details created",
    usersignupErr:"Email already used",
    otpVerify:"User created",
    otpVerifyErr:"OTP not correct",
    resendOTP:"Resend otp success",
    userLogin:"Password is correct",
    userLoginpassErr:"Password is not currect",
    userLoginEmailErr:"Email is not correct"
}

module.exports = {
  UserSignup: async (req, res) => {
    const details = req.body;
    details.password = await bcrypt.hash(details.password, 10);
    const checkEmail = await db
      .get()
      .collection(collection.USER_COLLECTION)
      .findOne({ email: details.email });

    if (checkEmail == null) {
      const emailId = details.email;

      const Res = await Auth(emailId, "Company Name");
      details.member = "user";
      details.otp = Res.OTP;
      db.get()
        .collection(collection.AUTHENTICATION_COLLECTION)
        .insertOne(details)
        .then((data) => {
          res.status(201).json({
            message: messages.usersignup,
          });
        });
    } else {
      res.status(401).json({
        message: messages.usersignupErr,
      });
    }
  },
  OTP_VERIFY: async (req, res) => {
    const data = req.body;
    const userInfo = await db
      .get()
      .collection(collection.AUTHENTICATION_COLLECTION)
      .find({ email: data.email, member: "user" })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    if (userInfo[0]) {
      userInfo = userInfo[0];
    } else {
      userInfo = 0;
    }

    if (userInfo.otp == data.otp) {
      const { otp, _id, ...userData } = userInfo;
      const insertData = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData);
      await db
        .get()
        .collection(collection.AUTHENTICATION_COLLECTION)
        .deleteMany({ email: userInfo.email });

      res.status(201).json({
        message: messages.otpVerify,
        data: insertData,
      });
    } else {
      res.status(401).json({
        message: messages.otpVerifyErr,
      });
    }
  },
  RESEND_OTP: async (req, res) => {
    const emailId = req.body.email;
    const Res = await Auth(emailId, "Company Name");
    await db
      .get()
      .collection(collection.AUTHENTICATION_COLLECTION)
      .updateOne({ email: emailId }, { $set: { otp: Res.OTP } });
    res.status(200).json({
      message: messages.resendOTP,
    });
  },
  USER_LOGIN: async (req, res) => {
    const user = await db
      .get()
      .collection(collection.USER_COLLECTION)
      .findOne({ email: req.body.email });
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (result) {
          res.status(200).json({
            message: messages.userLogin,
            userdetails: user,
          });
        } else {
          res.status(401).json({
            message: messages.userLoginpassErr,
          });
        }
      });
    } else {
      res.status(401).json({
        message: messages.userLoginEmailErr,
      });
    }
  },
  SET_MOBILE: async (req, res) => {
    const mobileNum = req.body.mobile;
    mobileNum = parseInt(mobileNum);


  },
};
