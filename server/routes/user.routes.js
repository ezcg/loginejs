const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {

  app.get(
    "/api/user",
    [authJwt.verifyToken],
    controller.user
  );

  app.get(
    "/api/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderator
  );

  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.admin
  );
};
