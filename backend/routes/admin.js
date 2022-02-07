const express = require('express');
const adminController = require("../controller/AdminController")

const router = express.Router();

router.post("/adminLogin",adminController.ADMIN_LOGIN);


module.exports = router;
