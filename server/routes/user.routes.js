const router = require('express').Router()
const userController = require('../controllers/userController');
const { ValidateAddUserForm } = require('../middlewares/validations/addUserFormValidation');

// Add a User/Register a new User

router.get("/test", userController.createSuperAdmin); 
router.get("/getAll",  userController.getAllUsers); 
router.get("/getOne/:id",  userController.getOne); 
router.put("/update/:id",  ValidateAddUserForm, userController.update); 
router.delete("/delete/:id", userController.delete); 


module.exports = router