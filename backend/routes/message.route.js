import express from 'express';
import {sendMessage,getMessages} from '../controller/message.controller.js';
import protectRoutes from '../middleware/protectRoute.js';
const router = express.Router();

router.get("/:id",protectRoutes,getMessages)
router.post("/send/:id",protectRoutes,sendMessage)

export default router;