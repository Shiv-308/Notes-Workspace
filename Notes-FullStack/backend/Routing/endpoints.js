import express from "express"
import {
  createNotes,
  getNotes,
  updateNotes,
  deleteNotes,
  getUser
}
 from "../Pages/notes.js"
import authMiddleware from "../middleware/authMiddlewar.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/create",createNotes);
router.get("/getNotes",getNotes);
router.put("/updateNotes/:id",updateNotes);
router.delete("/deleteNotes/:id",deleteNotes);
router.get("/getUsers",getUser);

export default router;