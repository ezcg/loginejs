const db = require("../models");
const User = db.user;
const Roles = require("../config/roles.config");

//
exports.index = async (req, res) => {

  let userObj = {};
  let title = "Login index page title";
  let body = "Message from index.controller.index: You've logged in and are now viewing the index view in views/pages/index.ejs";
  try {
    userObj = await User.findOne({where:{id:req.validatedUserId}});
  } catch(e) {
    return res.render("pages/error", {body:e.message});
  }
  res.render("pages/index", {title:title, body:body, userObj:userObj});

}

exports.indexmod = (req, res) => {

  let isMod = isModerator(req);
  let body = '';
  if (!isMod) {
    body = "Message from index.controller.indexmod: You are not a moderator and cannot access this page.";
  } else {
    body = "Message from index.controller.indexmod: You are a moderator and can access this page. ";
  }
  body+=" Only moderator (no admin or user) permissions are demonstrated here.";
  res.render("pages/indexmod", {title:"Moderator only page", body:body, isModerator:isMod});

}

isModerator = (req) => {
  return ((Roles.moderator & req.validatedAccessLevel) === Roles.moderator);
}
