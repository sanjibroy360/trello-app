const { sign, verify } = require("jsonwebtoken");

exports.generateToken = function (user) {
  const payload = {
    userId: user.id,
    email: user.email,
    password: user.password,
  };
  const token = sign(payload, process.env.SECRET);
  return token;
};

exports.verifyToken = async function (req, res, next) {
  try {
    let authorization = req.headers.authorization.split(" ");
    let token =
      (req.headers.authorization &&
        authorization[0] === "Token" &&
        authorization[1]) ||
      null;

    if (!token) {
      req.user = null;
      return res.status(401).json({ message: `Unauthorized user!` });
    }

    let { userId } = await verify(token, process.env.SECRET);
    if (!userId) {
      return res.status(401).json({ message: `Unauthorized user!` });
    }
    req.user = { userId, token };
    next();
  } catch (error) {
    next(error);
  }
};
