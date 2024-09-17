// Getting the DB CONNECTION HERE
const mongoose=require('mongoose');
const mongo_url=process.env.DB_CONN; // connection with the cloud Mongoose\

//Establishing the mongo connection and Getting the promise from the cloud mongoose (and fetching it in main index.js file)
mongoose.connect(mongo_url).then(()=>{
    console.log("Connected to database");
    
}).catch((error)=>{
    console.log(`Unable to connect with database: ${error}`);
    
})