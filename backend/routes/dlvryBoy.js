
const express = require('express');
const dlvryBoyController = require('../controller/DlvryBoyController');

const router = express.Router();


router.post('/dlvryBoySignup',dlvryBoyController.DlvryBoySignUp);

router.post('/dlvryBoyEmailVerify',dlvryBoyController.DlvryBoyEmailVerify);

router.post('/dlvryBoyResendOTP',dlvryBoyController.DlvryBoy_RESEND_OTP);


module.exports = router;
