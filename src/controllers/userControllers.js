const fs = require("fs");
const path = require("path");
const userControllers = {
  login_register: function (req, res) {
    res.render("login-register");
  },
};

module.exports = userControllers;
