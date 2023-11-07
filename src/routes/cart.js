const express = require("express");
const router = express.Router();
const products = require("../controllers/carritoControllers.js");
//Carrito//
router.get("/", products.carrito);
module.exports = router;
