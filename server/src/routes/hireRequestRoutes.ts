import { Router } from "express";
import {
  createHireRequest,
  listHireRequests,
} from "../controllers/hireRequestController";
import { authenticateToken } from "@/middleware/auth";
const router = Router();

router.post("/", authenticateToken("admin"), createHireRequest);
router.get("/", authenticateToken("admin"), listHireRequests);

export default router;
