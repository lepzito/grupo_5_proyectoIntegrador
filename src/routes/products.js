const express = require("express");
const router = express.Router();
const products = require("../controllers/productControllers.js");
const upload = require("../middlewares/multer.js");

/*--------------------Rutas de Productos----------------------------------------------*/

router.get("/", products.all);
//Detalle aqui//
router.get("/product/:id", products.detalle);
//Search//
router.get("/search", products.search);
//Carrito//
router.get("/carrito", products.carrito);
//Ediccion//
router.get("/edit", products.edit);
router.post("/edit");
//Crear producto//
router.get("/create", products.create);
router.post("/", upload.single("productImage"), products.store);
module.exports = router;
