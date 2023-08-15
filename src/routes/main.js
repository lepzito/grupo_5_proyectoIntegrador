const express = require("express");
const router = express.Router();
const mainControllers = require("../controllers/mainControllers.js");
/*--------------------Rutas Main----------------------------------------------*/

router.get("/", mainControllers.index);

module.exports = router;
