import express from 'express';

import authenticate from '../middlewares/auth.js'; 
import { addNewProduct, deleteProductById, deleteAllProducts, getAndFilterProducts, updateProductById, getProductById } from '../controllers/products.js';

import authorizeFarmer from '../middlewares/authorizeFarmer.js';
import { productImage } from '../middlewares/upload.js';

const router = express.Router();


router.post('/add', authenticate, authorizeFarmer, productImage.single('images'), addNewProduct)

router.patch('/update/:id', authenticate,  authorizeFarmer, productImage.single('images'), updateProductById);

router.delete('/delete/:id', authenticate, authorizeFarmer, deleteProductById);

router.delete('/delete', authenticate, authorizeFarmer, deleteAllProducts);


router.get('/list', authenticate, getAndFilterProducts);

router.get('/get/:id', authenticate, getProductById);

export default router;





  