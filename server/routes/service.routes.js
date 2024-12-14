const router = require("express").Router();
const serviceController = require("../controllers/serviceController");
const {
  ValidateServiceForm,
} = require("../middlewares/validations/serviceFormValidation");

router.post("/create", ValidateServiceForm, serviceController.createService);
router.get("/all", serviceController.allServices);
router.get("/servicesOnly", serviceController.servicesOnly);
router.get("/coursesOnly", serviceController.coursesOnly);
router.get("/getOne/:id", serviceController.getOneById);
router.put("/update/:id", serviceController.update);
router.delete("/delete/:id", serviceController.delete);

module.exports = router;
