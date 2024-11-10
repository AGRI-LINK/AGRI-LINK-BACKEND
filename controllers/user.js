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

    // Create a JWT token for the user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Send response with the JWT token
    res.status(201).json({
      message: 'User created successfully',
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }

};
