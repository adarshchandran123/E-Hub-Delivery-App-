const db = require("../config/connection");
const collection = require("../config/collection");

const messages = {
    signup:"DlvryBoy details created",
    signupErr:"Email Already used",
    emailVerfy:"DlvryBoy created",
    emailVerfyErr:"OTP not correct",
    resendOTP:"Resend otp success",
}

module.exports = {
  DlvryBoySignUp: async (req, res) => {
    const dlvryBoyDetails = req.body;
    dlvryBoyDetails.password = await bcrypt.hash(dlvryBoyDetails.password, 10);
    const checkEmail = await db
      .get()
      .collection(collection.DELIVERYBOY_COLLECTION)
      .findOne({ email: dlvryBoyDetails.email });

    if (checkEmail == null) {
      const emailId = dlvryBoyDetails.email;
      const Res = await Auth(emailId, "company name");
      dlvryBoyDetails.member = "dlvryBoy";
      dlvryBoyDetails.otp = Res.OTP;
      db.get()
        .collection(collection.AUTHENTICATION_COLLECTION)
        .insertOne(dlvryBoyDetails)
        .then(() => {
          res.status(201).json({
            message: messages.signup,
          });
        });
    } else {
      res.status(401).json({
        message: messages.signupErr,
      });
    }
  },
  DlvryBoyEmailVerify: async (req, res) => {
    const data = req.body;
    const dlvryBoyInfo = await db
      .get()
      .collection(collection.AUTHENTICATION_COLLECTION)
      .find({ email: data.email, member: "dlvryBoy" })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    if (dlvryBoyInfo[0]) {
      dlvryBoyInfo = dlvryBoyInfo[0];
    } else {
      dlvryBoyInfo = 0;
    }
    if (dlvryBoyInfo.otp == data.otp) {
      const { otp, _id, ...dlvryBoyData } = dlvryBoyInfo;
      const insertData = await db
        .get()
        .collection(collection.DELIVERYBOY_COLLECTION)
        .insertOne(dlvryBoyData);
      res.status(201).json({
        message: messages.emailVerfy,
        insertData,
      });
    } else {
      res.status(401).json({
        message: messages.emailVerfyErr,
      });
    }
  },
  DlvryBoy_RESEND_OTP: async (req, res) => {
    const emailId = req.body.email;
    const Res = await Auth(emailId, "Company Name");
    const updateOTP = await db
      .get()
      .collection(collection.AUTHENTICATION_COLLECTION)
      .updateOne(
        { email: emailId, member: "dlvryBoy" },
        { $set: { otp: Res.OTP } }
      );
    res.status(200).json({
      message: messages.resendOTP,
    });
  },
};
