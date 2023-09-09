const user = require("../models/user.js");
const path = require("path");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const userControllers = {
  login: function (req, res) {
    res.render("./users/login");
  },
  loginProcess: function (req, res) {
    let userToLogin = user.findByField("email", req.body.email);
    if (userToLogin) {
      let passwordCorrect = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (passwordCorrect) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        if (req.body.remember_user) {
          res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 30 });
        }
        return res.redirect("./profile");
      }
    }
    return res.render("./users/login", {
      errors: {
        email: {
          msg: "Las credenciales son incorrectas",
        },
      },
    });
  },
  register: function (req, res) {
    res.render("./users/register");
  },
  create: function (req, res) {
    //antes de crear quiero saber si ya existe un usuario con el mismo mail en la bd
    //ver express validator
    //  let userInDb = user.findByField("email", req.body.email);
    //if (userInDb) {
    //return (
    //res.render("./users/register"),
    //{
    //email: {
    //msg: "este usuario ya se registro",
    //},
    //oldData: req.body,
    // }
    // );
    //}
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render("./users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }
    let userToCreate = {
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 8),
      imgUser: req.file.filename,
    };
    user.create(userToCreate);
    return res.redirect("./login");
  },
  profile: function (req, res) {
    res.render("./users/profile", { user: req.session.userLogged });
  },
  logout: function (req, res) {
    res.clearCookie("userEmail");
    req.session.destroy();

    return res.redirect("/");
  },
};

module.exports = userControllers;
