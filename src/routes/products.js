const express = require("express");
const router = express.Router();
const products = require("../controllers/productControllers.js");
const upload = require("../middlewares/multer.js");
const validations = require("../middlewares/productsFormValidations/validationCreate.js");
const validationsEdit = require("../middlewares/productsFormValidations/validationEdit.js");
const checkAdminMiddleware = require("../middlewares/checkAdminMiddleware.js");

/*--------------------Rutas de Productos----------------------------------------------*/

router.get("/", products.all);
//Detalle aqui//
router.get("/product/:id", products.detalle);
//Search//
router.get("/search", products.search);

router.get("/admin", checkAdminMiddleware, products.admin);
//Ediccion//
router.get("/:id/edit", checkAdminMiddleware, products.edit);

router.put(
  "/:id",
  upload.single("productImage"),
  validationsEdit,
  checkAdminMiddleware,
  products.update
);
//Crear producto//
router.get("/create", checkAdminMiddleware, products.create);
//Store//
router.post(
  "/",
  upload.single("productImage"),
  validations,
  checkAdminMiddleware,
  products.store
);
//Eliminar un producto//
//-------------//
router.delete("/:id", products.destroy);
module.exports = router;
