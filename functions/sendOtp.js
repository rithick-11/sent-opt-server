const nodemailer = require("nodemailer");

const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_ACC || "rithickroshan7878@gmail.com",
    pass: process.env.APP_POSSWORD || "mser efas elpg nsms",
  },
});

const sentOtp = async (email) => {
  const otp = generateOtp();

  const mailOptions = {
    from: process.env.EMAIL_ACC || "rithickroshan7878@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
    html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>This OTP will expire in 5 minutes.</p>`,
  };

  try {
    const res = await transporter.sendMail(mailOptions);
    return { otp, message: "otp sented successfully", status: 202 };
  } catch (err) {
    console.log(err);
    return { message: "something went worng on sending otp", status: 404 };
  }
};

module.exports = sentOtp
