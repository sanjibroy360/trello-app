const { sign, verify } = require("jsonwebtoken");

exports.generateToken = function (user) {
  const payload = {
    userId: user.id,
    email: user.email,
    password: user.password,
  };
  const token = sign(payload, "sanjib");
  return token;
};

exports.verifyToken = async function (req, res, next) {
  try {
    // if(!req.headers.authorization.split(" ")[1]) {
    //   console.log
    // }
    let authorization = req.headers.authorization.split(" ");
    let token =
      (req.headers.authorization &&
        authorization[0] === "Token" &&
        authorization[1]) ||
      null;

    if (!token || token == "undefined") {
      req.user = null;
      console.log("returned");
      next();
      return;
      // return res.status(401).json({ message: `Unauthorized user!` });
    }

    let { userId } = await verify(token, "sanjib");
    if (!userId) {
      next();
      return res.status(401).json({ message: `Unauthorized user!` });
    }
    req.user = { userId, token };
    console.log({ Req: req.user });
    next();
  } catch (error) {
    next(error);
  }
};
