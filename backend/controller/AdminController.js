const db = require("../config/connection");
const collection = require("../config/collection");

const messages = {
    login:"Admin Login successs ",
    loginErr:"Email or Password is not correct"
}

module.exports = {
  ADMIN_LOGIN: async (req, res) => {
    if (
      process.env.ADMIN_EMAIL == req.body.email &&
      process.env.ADMIN_PASSWORD == req.body.password
    ) {
      res.status(200).json({
        message: messages.login,
      });
    } else {
      res.status(401).json({
        message: messages.loginErr,
      });
    }
  },
};
