const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Roles = require("../config/roles.config.js");

verifyToken = (req, res, next) => {

  let token = req.cookies['x-access-token'];
  let jsonResponse = true;
  if(!(/application\/json;/.test(req.headers['content-type']))) {
    jsonResponse = false;
  }

  if (!token) {
    return respond("Not logged in, no token provided. Please login.", jsonResponse, res);
  }

  jwt.verify(token, config.JWTsecret, async (err, decoded) => {
    if (err) {
      let body = "Unauthorized! You must login to access.";
      return respond(body, jsonResponse, res);
    }
    req.validatedUserId = decoded.id;
    let userObj = await User.findOne({where:{ id: req.validatedUserId}});
    if (!userObj) {
      let body = "Did not find a row in users table with userId:" + req.validatedUserId + ". If logged in, logout and back in.";
      return respond(body, jsonResponse, res);
    } else {
      req.validatedAccessLevel = userObj.role;
      if (req.validatedAccessLevel === 0) {
        let body = "You no longer have access to anything because you have been banned.";
        return respond(body, jsonResponse, res);
      } else {
        next();
      }
    }
  });

};

function respond(body, jsonResponse, res) {
  if(!jsonResponse) {
    return res.render("pages/error", {body: body});
  } else {
    return res.status(401).send({message:body});
  }
}

isUser = (req, res, next) => {
  if (!((Roles.user & req.validatedAccessLevel) === Roles.user)) {
    return res.status(401).send({message: "'user' role required to access this. "});
  }
  next();
};

isAdmin = (req, res, next) => {
  if (!((Roles.admin & req.validatedAccessLevel) === Roles.admin)) {
    return res.status(401).send({message: "'admin' role required to access this. "});
  }
  next();
};

isModerator = (req, res, next) => {
  if (!((Roles.moderator & req.validatedAccessLevel) === Roles.moderator)) {
    return res.status(401).send({message: "'moderator' role or more required to access this. "});
  }
  next();
};
isModeratorOrAdmin = isModerator;

// isModeratorUser = (req, res, next) => {
//   if (!(Roles.moderator_user & req.validatedAccessLevel)) {
//     return res.status(401).send({message: "'moderator_user' role or more required to access this. "});
//   }
//   next();
// };

const authJwt = {
  verifyToken: verifyToken,
  isUser: isUser,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  // isModeratorUser: isModeratorUser,
};
module.exports = authJwt;
