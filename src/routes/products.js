const express = require("express");
const router = express.Router();
const products = require("../controllers/productControllers.js");
/*--------------------Rutas de Productos----------------------------------------------*/

router.get("/", products.all);
router.get("/product/:id", products.detalle);
router.get("/search", products.search);
router.get("/carrito", products.carrito);
router.get("/edit", products.edit);
router.get("/create", products.create);

module.exports = router;
