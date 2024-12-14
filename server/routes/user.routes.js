const router = require('express').Router()
const userController = require('../controllers/userController');
const { authenticateUser, mustBeSuperAdmin, mustBeSuperAdminOrAdmin } = require('../middlewares/authorization');
const { ValidateEditUserForm } = require('../middlewares/validations/addUserFormValidation');

// Add a User/Register a new User

router.get("/test", userController.createSuperAdmin); 
router.get("/getAll",  userController.getAllUsers); 
router.get("/getOne/:id",  userController.getOne); 
router.put("/update/:id", authenticateUser, mustBeSuperAdminOrAdmin, ValidateEditUserForm, userController.update); 
router.delete("/delete/:id", authenticateUser, mustBeSuperAdmin, userController.delete); 


module.exports = router