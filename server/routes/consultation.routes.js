const { ValidateConsulationForm } = require("../middlewares/validations/ConsultationFormValidation");
const consultationController = require("../controllers/consultationController")
const router = require("express").Router();

router.post("/book-consultation", ValidateConsulationForm, consultationController.bookConsultation );
router.get("/all",  consultationController.allConsultation );
router.get("/:id",  consultationController.getOneById );
router.delete("/delete/:id",  consultationController.delete );

module.exports = router;
