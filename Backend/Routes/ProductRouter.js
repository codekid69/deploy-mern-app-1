const { signup, login } = require('../Controllers/AuthController');
const { ensureAuthentication } = require('../Middlewares/Auth');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router(); // requiring router from express;
// ensureAuthentication verifies the token for the logged in user
router.get('/',ensureAuthentication, (req,res) => {
    console.log("REquser",req.user);
    
    res.status(200).json([
        {
            name: "GPU",
            price: "$499",
        },
        {
            name: "Wireless Mouse",
            price: "$199",
        }

    ])
})
module.exports = router;