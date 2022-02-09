const express = require("express");

const dotenv = require("dotenv");

const morgan = require("morgan");

const bodyParser = require("body-parser");

const userRouter = require("./routes/user");

const adminRouter = require("./routes/admin");

const shopRouter = require("./routes/shop");

const dlvryBoyRouter = require("./routes/dlvryBoy");

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
dotenv.config();

var db = require("./config/connection");

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("api running");
});

db.connect((err) => {
  if (err) {
    console.log("connection err", err);
  } else {
    console.log("database connected");
  }
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/shop", shopRouter);
app.use("/dlvryBoy", dlvryBoyRouter);

app.use((req, res, next) => {
  const error = new Error("not found");
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(5000, console.log("server started"));

module.exports = app;
