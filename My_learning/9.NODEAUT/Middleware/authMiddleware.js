const  jwt  = require("jsonwebtoken")



const authMiddleware = (req, res, next) => {
    // logic to check if user is authenticated
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'No token provided, authorization denied' });
    }

    // decode the token
    // In a real application, you would verify the token here
    // For demonstration, we'll assume the token is valid and contains user info
  try {
    const decodedTokenInfo = jwt.verify(token, process.env.jwt_SECRET_key);
    const userinfo = decodedTokenInfo;
    console.log("Decoded User Info:", userinfo);
    req.userinfo = userinfo;
    
  } catch (error) {
    return res.status(403).json({ 
        success: false,
        message: 'Token is not valid',
        token
     });
       
  }
       

   return next();

};

module.exports = authMiddleware;