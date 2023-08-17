const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers.js");
/*--------------------Rutas Main----------------------------------------------*/

router.get("/", userControllers.login_register);

module.exports = router;
