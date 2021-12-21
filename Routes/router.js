module.exports = (app) => {
  var Controller = require("../Controller/Controller");

  app.route("/").get(Controller.index);
};
