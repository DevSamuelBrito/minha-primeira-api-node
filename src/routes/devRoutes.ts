import express, { Request, Response } from "express";
import {
  getAllDevs,
  getDevById,
  createDev,
  updateDev,
  deleteDev,
  getAllProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/devControllers";

const router = express.Router();

// === rotas de Devs ===
router.get("/devs", getAllDevs);
router.get("/devs/:id", getDevById);
router.post("/devs", createDev);
router.put("/devs/:id", updateDev);
router.delete("/devs/:id", deleteDev);

// === rotas de Projects ===
router.get("/projects", getAllProject);
router.get("/projects/:id", getProjectById);
router.get("/projects", createProject);
router.get("/projects/:id", updateProject);
router.get("/projects/:id", deleteProject);

export default router;
