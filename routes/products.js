import express from 'express';

import authenticate from '../middlewares/auth.js'; 
import { addNewProduct, deleteProductById, deleteAllProducts, getAndFilterProducts, updateProductById, getProductById } from '../controllers/products.js';

import authorizeFarmer from '../middlewares/authorizeFarmer.js';

const router = express.Router();


router.post('/products/add', authenticate, authorizeFarmer, addNewProduct)

router.patch('/products/update/:id', authenticate,  authorizeFarmer, updateProductById);

router.delete('/products/delete/:id', authenticate, authorizeFarmer, deleteProductById);

router.delete('/products/delete', authenticate, authorizeFarmer, deleteAllProducts);


router.get('/products/list', getAndFilterProducts);

router.get('/products/get/:id', authenticate, authorizeFarmer, getProductById);

export default router;





  