import express from 'express';
import authenticate from '../middlewares/auth.js';

import { sendMessage, getInboxMessages} from '../controllers/messages.js';

const router = express.Router();


router.post('/send', authenticate, sendMessage);

router.get('/inbox', authenticate, getInboxMessages);

export default router;