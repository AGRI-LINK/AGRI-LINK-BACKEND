
import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Assuming "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next(); 
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default authenticate;  