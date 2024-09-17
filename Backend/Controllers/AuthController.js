// Server Logic
const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email }); //checking if user exists
        if (user) {
            return res.status(409).json({ message: "User Already exist", success: false })
        }

        const userModel = new UserModel({ name, email, password });// creating user if not exist
        //encrypting the passsword by hashing the password and the strength of the salt
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save() // saving the user after encrypting the password
        res.status(201).json({ message: "Signup Success",success:true})
    } catch (error) {
        res.status(500).json({ message: `Internal server error : ${error} `, success: false })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log("login",req.body)
    try {
        const user = await UserModel.findOne({ email }); //checking if user exists
        if (!user) {
            return res.status(404).json({
                message: "No user found please signup",
                success: false
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials", success: false });
        }

        // creating jwt token ({payload}, secretkey, {expiresIn}) used for encrypting
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
        });
    } catch (error) {
        res.status(500).json({ message: `Internal server error : ${error} `, success: false })
    }
}
module.exports = {
    signup,
    login
}