const User = require("../model/user");
const auth = require("../middleware/auth");

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

exports.resetPassword = async function (req, res, next) {
  try {
    let { password } = req.body.user;
    let payload = {
      name: req.body.user.name,
      username: req.body.user.username,
      email: req.body.user.email,
    };
    let user = await User.findOne(payload);
    if (!user) {
      return res.status(400).send(`User not found!`);
    }
    password = await user.encryptPassword(password);
    user = await User.findByIdAndUpdate(user.id, { password }, { new: true });

    return res.status(200).json({ user: user.profileInfo(user) });
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
