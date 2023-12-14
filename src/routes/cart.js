const express = require("express");
const router = express.Router();
const products = require("../controllers/carritoControllers.js");
//Carrito//
router.get("/", products.carrito);
router.post("/api/:id", products.addToCart);
module.exports = router;
