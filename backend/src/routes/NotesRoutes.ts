import { Router } from "express";
import NotesController from "../controllers/NotesController";

const router = Router();

router.get("/getAll", NotesController.getAll);
router.post("/create", NotesController.createNote);
router.put("/update/:id", NotesController.updateNote);
router.delete("/delete/:id", NotesController.deleteNote);

export default router;
