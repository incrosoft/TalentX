import { Router } from "express";
import { listTalents, getTalent } from "../controllers/talentController";
import { authenticateToken } from "@/middleware/auth";
const router = Router();

router.get("/", authenticateToken("agency"), listTalents);
router.get("/:id", authenticateToken("agency"), getTalent);

export default router;
