const express = require("express");
const router = express.Router();

const productsController = require('../controllers/productsController')

router.get("/", productsController.productList);
router.post("/", productsController.addProduct);
router.get("/:id", productsController.getProduct);
router.delete("/:id", productsController.deleteProduct);
router.patch("/:id", productsController.updateProduct);

module.exports = router;