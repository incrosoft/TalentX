import { Router } from "express";
import {
  listTasks,
  createTask,
  updateTask,
} from "../controllers/taskController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/", authenticateToken("admin"), listTasks);
router.post("/", authenticateToken("admin"), createTask);
router.patch("/:id", authenticateToken("admin"), updateTask);

export default router;
