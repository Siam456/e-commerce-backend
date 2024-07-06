const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getShowingProducts,
  getDiscountedProducts,
  getStockOutProducts,
  getProductById,
  getProductBySlug,
  addProduct,
  addAllProducts,
  updateProduct,
  updateStatus,
  deleteProduct,
  updateView,
  getMostViewedProduct,
  deleteAllProducts,
} = require("../controller/productController");

//add a product
router.post("/add", addProduct);

//add multiple products
router.post("/all", addAllProducts);

//get a product
router.post("/:id", getProductById);

//get showing products only
router.get("/show", getShowingProducts);

router.get("/most-viewed", getMostViewedProduct);

//get discounted products only
router.get("/discount", getDiscountedProducts);

//get all products
router.get("/", getAllProducts);

//get all stock out products
router.get("/stock-out", getStockOutProducts);

//get a product by slug
router.get("/:slug", getProductBySlug);

//update a product
router.put("/:id", updateProduct);
router.put("/:id/view", updateView);

//update a product status
router.put("/status/:id", updateStatus);

//delete a product
router.delete("/:id", deleteProduct);

//delete all products
router.delete("/", deleteAllProducts);

module.exports = router;
