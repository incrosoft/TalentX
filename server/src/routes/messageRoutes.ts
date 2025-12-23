import { Router } from "express";
import { listMessages, createMessage } from "../controllers/messageController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken("client"), listMessages);
router.post("/", authenticateToken("client"), createMessage);

export default router;
