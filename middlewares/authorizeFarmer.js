// authorizeFarmer.js
export const authorizeFarmer = (req, res, next) => {
  // Log the role of the user for debugging
  console.log("User role in authorizeFarmer:", req.user?.role);

  // Check if the role is 'farmer'
  if (!req.user || req.user.role !== 'farmer') {
    return res.status(403).json({ error: "Only farmers are allowed to perform this action" });
  }

  next(); // Continue to the route handler if the user is a farmer
};

  
  export default authorizeFarmer;
  