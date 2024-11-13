import express from 'express';

import authenticate from '../middlewares/auth.js'; 
import { addNewProduct, deleteProductById, getAndFilterProducts, updateProductById } from '../controllers/products.js';
import roleCheck from '../middlewares/roleCheck.js';

const router = express.Router();


router.post('/add', authenticate, roleCheck('farmer'), addNewProduct)

router.put('/update/:id', authenticate, roleCheck('farmer'), updateProductById);

router.delete('/delete/:id', authenticate, roleCheck('farmer'),deleteProductById);

router.get('/list', getAndFilterProducts);

export default router;





  