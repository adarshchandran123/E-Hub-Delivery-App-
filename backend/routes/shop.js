const express = require('express');
const shopController = require('../controller/ShopController');

const router = express.Router();

router.post('/shopSignup',shopController.ShopSignup);

router.post('/shop_Email_verify',shopController.SHOP_EMAIL_OTP_VERIFY);

router.post('/ShopResendOTP',shopController.SHOP_RESEND_OTP);

module.exports = router;
