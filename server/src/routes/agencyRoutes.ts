import { Router } from "express";
import { listAgencies, getAgency } from "../controllers/agencyController";
import { authenticateToken } from "@/middleware/auth";

const router = Router();

router.get("/", authenticateToken("admin"), listAgencies);
router.get("/:id", authenticateToken("admin"), getAgency);

export default router;
