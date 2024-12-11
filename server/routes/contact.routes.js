const router = require("express").Router();
const {
  ValidateContactForm,
} = require("../middlewares/validations/contactFormValidator");

const contactController = require("../controllers/contactController");

router.post("/create", ValidateContactForm, contactController.createMessage);
router.get("/all", contactController.allMessages);
router.get("/:id", contactController.getOneById);
router.delete("/delete/:id", contactController.delete);

module.exports = router;
