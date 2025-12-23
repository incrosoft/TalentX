import { Router } from "express";
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
} from "../controllers/projectController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken("agency"), listProjects);
router.get("/:id", authenticateToken("agency"), getProject);
router.post("/", authenticateToken("agency"), createProject);
router.patch("/:id", authenticateToken("agency"), updateProject);

export default router;
