const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers.js");
const uploadUser = require("../middlewares/multerForUsers.js");
//Aqui va el middleware de ruta que no permite ver algunas vistas si el usraio esta logeado
const guestMiddleware = require("../middlewares/guestMiddleware.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

//Muestro la vista de login y registro
router.get("/login", guestMiddleware, userControllers.login);
router.get("/profile", authMiddleware, userControllers.profile);
router.get("/register", guestMiddleware, userControllers.register);
//Registro o creo al usuario
router.post(
  "/register",
  uploadUser.single("userImage"),
  userControllers.create
);
//Login envio
router.post("/login", userControllers.loginProcess);
//Logout
router.get("/logout", userControllers.logout);
module.exports = router;
