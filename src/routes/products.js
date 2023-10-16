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

//Administracion de lo Productos Crud//
// Listado de los Productos//
router.get("/admin", products.admin);
//Ediccion//
router.get("/:id/edit", products.edit);
router.put("/:id", upload.single("productImage"), products.update);
//Crear producto//
router.get("/create", products.create);
//Store//
router.post("/", upload.single("productImage"), products.store);
//Eliminar un producto//
//-------------//
router.delete("/:id", products.destroy);
module.exports = router;
