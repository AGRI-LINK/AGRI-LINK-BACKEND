
import jwt from 'jsonwebtoken';

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded Token in authenticate:", req.user); // Check role here
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is invalid or expired' });
  }
}



export default authenticate;  