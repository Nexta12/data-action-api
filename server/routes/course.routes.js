const router = require("express").Router();
const courseController = require("../controllers/courseController");
const { cloudinaryUploader } = require("../middlewares/fileUploadManager");
const { ValidateCreateCourseForm } = require("../middlewares/validations/createCourseValidation");

// Create Course
router.post("/create", ValidateCreateCourseForm, cloudinaryUploader, courseController.createCourse);
router.get("/download/:id",  courseController.downloadCourseOutline);

// Get All Coursse.
router.get("/getAll", courseController.getAllCourses);
// Get One Course
router.get("/:slug", courseController.getOneCourse);
// Edit Course
router.put("/edit/:id", courseController.editCourse);
// Delete Course
router.delete("/delete/:id", courseController.deleteCourse);

module.exports = router;
