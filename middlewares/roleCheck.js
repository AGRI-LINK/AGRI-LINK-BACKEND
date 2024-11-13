// Middleware to check user role
export const roleCheck = (requiredRole) => {
    return (req, res, next) => {
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ error: `Only ${requiredRole}s are allowed to perform this action` });
      }
      next();
    };
  };
  
  export default roleCheck;
  