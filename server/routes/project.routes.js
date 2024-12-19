const router = require("express").Router();
const projectController = require("../controllers/projectController");
const {
  ValidateProjectForm,
} = require("../middlewares/validations/projectFormValidation");

router.post("/create", ValidateProjectForm, projectController.createProject);
router.get("/all", projectController.allProjects);
router.get("/getOne/:id", projectController.getOneById);
router.put("/update/:id", projectController.update);
router.delete("/delete/:id", projectController.delete);

module.exports = router;
