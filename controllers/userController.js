const User = require("../model/user");
const auth = require("../middleware/auth");

var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");


exports.userSignup = async function (req, res, next) {
  try {
    let user = await User.create(req.body.user);
    let token = null;
    if (user) {
      token = auth.generateToken(user);
    }
    return res.status(201).json({ user: user.profileInfo(user, token) });
  } catch (error) {
    next(error);
  }
};

exports.userLogin = async function (req, res, next) {
  try {
    let { email, password } = req.body.user;

    if (!email || !password) {
      return res.status(400).send(`Email and Password required!`);
    }
    console.log(req.body.user);
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send(`Invalid email or password!`);
    }

    let isVerified = await user.verifyPassword(password);

    if (isVerified) {
      let token = await auth.generateToken(user);
      return res.status(200).send({ user: user.profileInfo(user, token) });
    } else {
      return res.status(400).send("Incorrect email or  password!");
    }
  } catch (error) {
    next(error);
  }
};

exports.getCurrentUser = async function (req, res, next) {
  try {
    let user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(401).send(`Invalid token.`);
    }
    let { token } = req.user;
    return res.status(200).json({ user: user.profileInfo(user, token) });
  } catch (error) {
    next(error);
  }
};

exports.verifyUserAndSendOTP = async function (req, res, next) {
  try {
    let { username, email } = req.body.user;
    var user = await User.findOne({ username, email });
    if (!user) {
      return res.status(400).send(`Invalid email`);
    }

    var transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.PASSWORD,
        },
      })
    );

    var verificationCode = Math.random().toString(36).slice(-8);

    let mailOptions = {
      from: process.env.GMAIL_ID,
      to: user.email,
      subject: "Trello E-mail Verfication message",
      test: "First mail via nodemailer",
      html: `<h2>Your OTP is</h2> <h3>${verificationCode}</h3>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.log("ERROR:  ", err);
      console.log("Message sent: %", info.response);
    });

    user = await User.findByIdAndUpdate(
      user.id,
      { verificationCode },
      { new: true }
    );
    console.log(user);
    res.status(200).json({ user: { username, email } });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async function (req, res, next) {
  try {
    let { username, email, password, verificationCode } = req.body.user;

    let user = await User.findOne({ username, email });
    if (!user) {
      return res.status(400).send(`User not found!`);
    }
    if (user.verificationCode != verificationCode) {
      return res.status(401).send(`Wrong verification code.`);
    }
    password = await user.encryptPassword(password);
    user = await User.findByIdAndUpdate(user.id, { password }, { new: true });

    return res.status(200).send(`Password has been changed sucessfuly`);
  } catch (error) {
    next(error);
  }
};

exports.editUserProfile = async function (req, res, next) {
  try {
    let { userId } = req.user;
    let user = await User.findByIdAndUpdate(userId, req.body.user, {
      new: true,
    });
    return res.status(200).json({ user: user.profileInfo(user) });
  } catch (error) {
    next(error);
  }
};

exports.searchUserByUsername = async function (req, res, next) {
  try {
    let user = await User.findOne({ username: req.params.username });
    console.log(user);
    if (!user) {
      return res.status(404).send(`User not found!`);
    }
    return res.status(200).json({ user: user.profileInfo(user) });
  } catch (error) {
    next(error);
  }
};
