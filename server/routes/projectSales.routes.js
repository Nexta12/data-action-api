const router = require("express").Router();
const projectSalesController = require("../controllers/projectSalesController");
const { ValidateProjectSalesForm } = require("../middlewares/validations/projectSalesFormValidation");


router.post("/create", ValidateProjectSalesForm, projectSalesController.create);
router.get("/all", projectSalesController.allApplications);
router.get("/getOne/:id", projectSalesController.getOneById);
router.delete("/delete/:id", projectSalesController.delete);
router.get("/download/:id",  projectSalesController.downloadDataSet);

module.exports = router;
