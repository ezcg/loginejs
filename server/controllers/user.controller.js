exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.user = (req, res) => {
  res.status(200).send("Hello user! This is authorized text from /app/controllers/user.controller.js user endpoint.");
};

exports.moderator = (req, res) => {
  res.status(200).send("Hello moderator! This is authorized text from /app/controllers/user.controller.js moderator endpoint.");
};

exports.admin = (req, res) => {
  res.status(200).send("Hello admin! This is authorized text from /app/controllers/user.controller.js admin endpoint.");
};


