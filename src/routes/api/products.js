const express = require("express");
const router = express.Router();
const productApiController = require("../../controllers/api/productApiControllers");

router.get("/", productApiController.list);
router.get("/:id", productApiController.getById);

module.exports = router;
