const express = require("express");
const router = express.Router();
const productController = require("../controllers/controller.product.js");
const upload = require("../helpers/updateFile");

router.get("/all", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post("/add", upload.single("image"), productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
