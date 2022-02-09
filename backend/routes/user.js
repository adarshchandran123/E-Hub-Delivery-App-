const express = require("express");
const userControll = require("../controller/UserController");

const router = express.Router();

router.post("/userSignup", userControll.UserSignup);

router.post("/otp_verify", userControll.OTP_VERIFY);

router.post("/resendOTP", userControll.RESEND_OTP);

router.post("/userLogin", userControll.USER_LOGIN);

router.post("/setmobile", userControll.SET_MOBILE);

module.exports = router;
