const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router(); // requiring router from express;

router.post('/login',loginValidation,login);

// Middleware validation in routes
router.post('/signup',signupValidation,signup );
module.exports=router;