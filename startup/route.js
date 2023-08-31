module.exports = function (app) {
  const user = require("../routers/user.route");
  app.use("/user", user);
};
