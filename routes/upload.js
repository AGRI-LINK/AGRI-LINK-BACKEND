import express from 'express';
import upload from '../middlewares/upload.js';


const router = express.Router();

// Route to handle single image uploads
router.post('/upload', upload.single('file'), (req, res) => {
    try {
      res.status(200).json({
        message: 'Image uploaded successfully!',
        filePath: `uploads/${req.file.filename}`, // Path to the uploaded file
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  export default router;
  