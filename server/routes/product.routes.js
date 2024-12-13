const router = require("express").Router();
const productController = require("../controllers/productController");
const {
  ValidateProductForm,
} = require("../middlewares/validations/productFormValidation");

router.post("/create", ValidateProductForm, productController.createProduct);
router.get("/all", productController.allProducts);
router.get("/getOne/:id", productController.getOneById);
router.put("/update/:id", productController.update);
router.delete("/delete/:id", productController.delete);

module.exports = router;
