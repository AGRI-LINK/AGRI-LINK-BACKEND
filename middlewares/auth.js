
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  

  try {
    // Verify token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token payload to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};



export default authenticate;  