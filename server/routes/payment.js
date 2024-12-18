const router = require("express").Router();
const paymentController = require("../controllers/paymentController")


router.post("/checkout", paymentController.checkout);
router.post("/verifiedSuccess", paymentController.verifiedSuccess);
router.post("/cancalledTransaction", paymentController.cancalledTransaction);
router.get("/all", paymentController.allApplications);
router.get("/:id", paymentController.getOneById);
router.delete("/delete/:id", paymentController.delete);

module.exports = router;
