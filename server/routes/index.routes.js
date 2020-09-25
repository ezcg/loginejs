const { authJwt } = require("../middleware");

module.exports = app => {

  const indexController = require("../controllers/index.controller.js");

  let router = require("express").Router();

  router.get("/",[authJwt.verifyToken], indexController.index);
  router.get("/indexmod",[authJwt.verifyToken], indexController.indexmod);

  app.use('/', router);

};
