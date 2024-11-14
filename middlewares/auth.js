
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  // Check if Authorization header exists
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Split to get the token after 'Bearer '

  try {
    // Verify token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token payload to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Authenticated user:", req.user);  // Log to confirm role here
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is invalid or expired' });
  }
}


export default authenticate;  