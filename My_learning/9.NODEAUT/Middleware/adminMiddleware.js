



const adminMiddleware = (req, res, next) => {
    // logic to check if user is admin
    const userinfo = req.userinfo;  
    if (userinfo.role !== 'admin') {
      return res.status(403).json({ 
          success: false,
          message: 'Access denied, admin only resource' });
    }
    return next();
  };
  
  module.exports = adminMiddleware;