const authController = require("../controllers/auth.controller");

module.exports = function(app) {

  app.get(
    "/auth/callback",
    authController.callback
  );

};
