import User from '../models/user.js';
import bcrypt from 'bcryptjs'; // For hashing passwords
import jwt from 'jsonwebtoken'; // For creating JWT tokens
import { validationResult } from 'express-validator';

// User Registration Controller
export const registerUser = async (req, res) => {
  const { name, email, password, role, contact, location } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Send back error messages if validation fails
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      contact,
      location,
    });

    // Save the user to the database
    await newUser.save();

    // Send a success response without JWT token
    res.status(201).json({
      message: 'User created successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

//login
export const loginUser = async (req, res) => {
  
  const { email, password } = req.body;
  
  // Validate if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Compare the hashed password with the provided password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token (valid for 1 hour)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token to user
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Access the user ID here

    // Fetch user data from the database using userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateUserProfile = async (req, res) => {
  const { name, email, role, contact, location, profilePic } = req.body;
  
  try {
    // Find user by ID from JWT
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    
    // Update user profile
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.contact = contact || user.contact;
    user.location = location || user.location;
    user.profilePic = profilePic || user.profilePic;

    // Save updated user
    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};