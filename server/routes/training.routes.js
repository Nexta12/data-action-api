const router = require("express").Router();

const trainingController = require("../controllers/trainingController");
const {
  ValidateTrainingForm,
} = require("../middlewares/validations/TrainingFormValidation");

router.post("/apply", ValidateTrainingForm, trainingController.apply);
router.get("/all", trainingController.allApplications);
router.get("/:id", trainingController.getOneById);
router.delete("/delete/:id", trainingController.delete);

module.exports = router;
