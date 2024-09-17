// Creating Schema For Users
const { required } = require('joi');
const mongoose = require('mongoose');

//Requiring schema from the  mongoose
const Schema = mongoose.Schema;

//Creating the user schema with the object of the required schema
const UserSchema = new Schema({ 
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
})

//Creating User Model and giving the collection name in the model it should be  plural and attaching it to the schema
const UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel; // exporting the usermodel contains the collection and schema