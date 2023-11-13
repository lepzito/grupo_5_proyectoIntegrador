const { body } = require("express-validator");

const validationsLogin = [
  body("email")
    .notEmpty()
    .withMessage("No debe estar vacio")
    .isEmail()
    .withMessage("Formato Incorrecto"),
  body("password").notEmpty().withMessage("No debe estar vacio"),
];

module.exports = validationsLogin;
