import { Router } from "express";
import TagController from "../controllers/TagController";

const router = Router();

router.get("/getAll", TagController.getAll);
router.post("/create", TagController.createTag);

export default router;
