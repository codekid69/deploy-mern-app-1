// Validating the JWT TOKEN
const jwt=require('jsonwebtoken');
const ensureAuthentication=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403).json({
            message:"Unauthorised, token required",
            success:false
        })
    }
    try{
        //verifying the token
        const decode=jwt.verify(auth,process.env.JWT_SECRET);
        // setting the decoded data to the reqq body so that user can use the email and id without making db call
        req.user=decode
        next();

    }catch(err){
        return res.status(403).json({
            message:"token not valid",
            success:false
        })
    }
}
module.exports={
    ensureAuthentication
}