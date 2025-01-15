const db = require("../models");
const ROLE = db.ROLES;
const User = db.user;

async function checkDuplicateUsernameOrEmail(req, res, next) {
  try {
    // Username
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send({ message: "Failed! Email is already in use!" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
    return;
  }
}

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLE.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.role[i]} does not exist!`,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
