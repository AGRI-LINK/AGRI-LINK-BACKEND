// authorizeFarmer.js
function authorizeFarmer(req, res, next) {
    
    if (req.user && req.user.role === 'farmer') {
      return next();
    }
    return res.status(403).json({ error: "Only farmers are allowed to perform this action" });
  }
  
  export default authorizeFarmer;
  