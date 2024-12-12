const router = require('express').Router()
const userController = require('../controllers/userController')

// Add a User/Register a new User

router.get("/test", userController.createSuperAdmin); 


module.exports = router