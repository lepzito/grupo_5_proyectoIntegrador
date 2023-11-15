const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers.js");
const uploadUser = require("../middlewares/multerForUsers.js");
//Aqui va el middleware de ruta que no permite ver algunas vistas si el usraio esta logeado
const guestMiddleware = require("../middlewares/guestMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

//Validatios

const validations = require("../middlewares/validationMiddleware.js");
const validationsLogin = require("../middlewares/validationMiddlewareLogin.js");
const validationsEdit = require("../middlewares/validationMiddlewareEdit.js");

//Muestro la vista de login y registro
router.get("/login", guestMiddleware, userControllers.login);
router.get("/profile", authMiddleware, userControllers.profile);
router.get("/register", guestMiddleware, userControllers.register);
router.get("/edit", authMiddleware, userControllers.edit);

//Registro o creo al usuario
router.post(
  "/register",
  uploadUser.single("userImage"),
  validations,
  userControllers.create
);
router.post(
  "/edit",
  uploadUser.single("userImage"),
  validationsEdit,
  userControllers.update
);

//Login envio
router.post("/login", validationsLogin, userControllers.loginProcess);
//Logout
router.get("/logout", userControllers.logout);
module.exports = router;
