import express from 'express';

import authenticate from '../middlewares/auth.js'; 
import { addNewProduct, deleteProductById, getAndFilterProducts, updateProductById } from '../controllers/products.js';

import authorizeFarmer from '../middlewares/authorizeFarmer.js';

const router = express.Router();


router.post('/add', authenticate, authorizeFarmer, addNewProduct)

router.put('/update/:id', authenticate,  authorizeFarmer, updateProductById);

router.delete('/delete/:id', authenticate, authorizeFarmer, deleteProductById);

router.get('/list', getAndFilterProducts);

export default router;





  