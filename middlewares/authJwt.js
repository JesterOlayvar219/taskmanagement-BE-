const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  console.log("TOKEN:", token);

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

async function isAdmin(req, res, next) {
  try {
    const user = await User.findById(req.userId).exec();
    console.log("user:", user);

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    console.log("roles:", roles);

    if (roles.some((role) => role.name === "admin")) {
      next();
    } else {
      res.status(403).send({ message: "Require Admin Role!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function isModerator(req, res, next) {
  try {
    const user = await User.findById(req.userId).exec();
    console.log("user:", user);

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();

    console.log("roles:", roles);

    if (roles.some((role) => role.name === "moderator")) {
      next();
    } else {
      res.status(403).send({ message: "Require Moderator Role!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

module.exports = authJwt;
