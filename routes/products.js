import express from 'express';

import authenticate from '../middlewares/auth.js'; 
import { addNewProduct, deleteProductById, getAndFilterProducts, updateProductById } from '../controllers/products.js';
import roleCheck from '../middlewares/roleCheck.js';
import authorizeFarmer from '../middlewares/authorizeFarmer.js';

const router = express.Router();


router.post('/add', authenticate, roleCheck('farmer'), authorizeFarmer, addNewProduct)

router.put('/update/:id', authenticate, roleCheck('farmer'), authorizeFarmer, updateProductById);

router.delete('/delete/:id', authenticate, roleCheck('farmer'), authorizeFarmer, deleteProductById);

router.get('/list', getAndFilterProducts);

export default router;





  