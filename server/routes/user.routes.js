const router = require('express').Router()
const authController = require('../controllers/authController');
const { emailToLowerCase } = require('../middlewares/authorization');
// Add a User/Register a new User

router.post("/addUser", emailToLowerCase, authController.addUser);
router.post("/login", emailToLowerCase, authController.login);


module.exports = router