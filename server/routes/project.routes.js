const router = require("express").Router();
const projectController = require("../controllers/projectController");
const { cloudinaryUploader } = require("../middlewares/fileUploadManager");
const {
  ValidateProjectForm,
} = require("../middlewares/validations/projectFormValidation");

router.post("/create", ValidateProjectForm, cloudinaryUploader, projectController.createProject);
router.get("/all", projectController.allProjects);
router.get("/getOne/:slug", projectController.getOneBySlug);
router.put("/update/:id", projectController.update);
router.delete("/delete/:id", projectController.delete);

module.exports = router;
