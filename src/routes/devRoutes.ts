import express, { Request, Response } from "express";
import {
  getAllDevs,
  getDevById,
  createDev,
  updateDev,
  deleteDev,
} from "../controllers/devControllers";

const router = express.Router();

router.get("/", getAllDevs);
router.get("/:id", getDevById);
router.post("/", createDev);
router.put("/:id", updateDev);
router.delete("/:id", deleteDev);
export default router;
