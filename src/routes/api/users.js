const express = require("express");
const router = express.Router();
const userApiController = require("../../controllers/api/userApiControllers");

router.get("/", userApiController.list);
router.get("/:id", userApiController.getUserById);

module.exports = router;
