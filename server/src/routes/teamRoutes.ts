import { Router } from "express";
import { listTeams, getTeam } from "../controllers/teamController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken("admin"), listTeams);
router.get("/:id", authenticateToken("admin"), getTeam);

export default router;
