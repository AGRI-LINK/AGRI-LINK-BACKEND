import express from 'express';
import authenticate from '../middlewares/auth.js';
import { subscribeForProduceAlerts } from '../controllers/subscription.js';

const router = express.Router();

router.post('/', authenticate, subscribeForProduceAlerts);



export default router;