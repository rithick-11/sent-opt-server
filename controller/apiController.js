const sentOtp = require("../functions/sendOtp.js");
const User = require("../models/userModel.js");

const singUp = async (req, res) => {
  const isUserExixt = await User.findOne({ email: req.body.email });
  if (isUserExixt) {
    res.status(404).json({ message: `${req.body.email} already exist` });
    console.log(isUserExixt);
  }
  const otpStatus = await sentOtp(req.body.email);
  if (otpStatus.status === 202) {
    const newUser = new User(req.body);
    newUser.otp = otpStatus.otp;
    newUser.otpExpires = Date.now() + 5 * 60 * 1000;
    console.log(newUser);
    newUser.save();
    res.status(202).json({ message: otpStatus.message });
  }
};

const verifyOtp = async (req, res) => {
  const userData = await User.findOne({ email: req.body.email });
  console.log(userData);
  if (userData.otpExpires < Date.now()) {
    res.status(404).json({ message: "otp exprired" });
    return;
  }

  if (userData.otp === req.body.otp) {
    userData.verifyed = true;
    userData.save();
    res.status(202).json({ message: "otp verifyed successfully" });
    return;
  } else {
    res.status(404).json({ message: "otp is worng" });
    return;
  }
};

module.exports = { singUp, verifyOtp };
