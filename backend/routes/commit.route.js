import { generateCommit } from "../controllers/commit.controller.js";
import { Router } from "express";
const router = Router();
router.post("/generate-commit", generateCommit);

export default router;
