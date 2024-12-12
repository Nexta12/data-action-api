const router = require('express').Router()
const authController = require('../controllers/authController');
const { emailToLowerCase, checkJwt } = require('../middlewares/authorization');
const { ValidateAddUserForm } = require('../middlewares/validations/addUserFormValidation');
// Add a User/Register a new User

router.post("/addUser", ValidateAddUserForm, emailToLowerCase,  authController.addUser);
router.post("/login", emailToLowerCase, authController.login);
router.post("/logout", authController.logout);
router.get("/validate", checkJwt, authController.validateAuth);



module.exports = router