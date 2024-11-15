import express from 'express';

import authenticate from '../middlewares/auth.js'; 
import { addNewProduct, deleteProductById, deleteAllProducts, getAndFilterProducts, updateProductById, getProductById } from '../controllers/products.js';

import authorizeFarmer from '../middlewares/authorizeFarmer.js';

const router = express.Router();


router.post('/add', authenticate, authorizeFarmer, addNewProduct)

router.patch('/update/:id', authenticate,  authorizeFarmer, updateProductById);

router.delete('/delete/:id', authenticate, authorizeFarmer, deleteProductById);

router.delete('/delete', authenticate, authorizeFarmer, deleteAllProducts);


router.get('/list', getAndFilterProducts);

router.get('/get/:id', authenticate, authorizeFarmer, getProductById);

export default router;





  