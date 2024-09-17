const express=require('express'); // took the express
const app=express(); // express initializing
const bodyParser=require('body-parser');// Need to add this library to the middle ware for parsing the req body and to get the data coming in req/ 
const cors=require('cors');
require('dotenv').config();//taking env to create the variable for port
const PORT =process.env.PORT || 8080; // port from env variable in .env file
//Getting DB connection
require('./Models/db');

//Requring Routes and Controllers
const AuthRouter=require('./Routes/AuthRouter');
const ProductRouter=require('./Routes/ProductRouter');
app.use(bodyParser.json());// for json format
app.use(cors()); // for accepting the connection coming from the different port form the client side| And for restricting it to specific port we can add configration to it also making our server more secure
// ---------------------------------------------------------- ordering is most important here as middleware must be used before the routes
app.get('/',(req,res) =>{
  res.send("WELCOME");
})

app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)
//Listening to the app on the port
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})