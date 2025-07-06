import express, { Request, Response } from "express";
const router = express.Router();
import db from "../db/DatabaseDevelopment";

//Rotas de GET
router.get("/", async (req: Request, res: Response) => {
  try {
    const devs = await db.getAll();
    res.json(devs);
  } catch (error) {
    console.error("Erro na rota GET:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const dev = await db.getById(Number(req.params.id));
    dev ? res.json(dev) : res.status(404).send("Dev not found");
  } catch (error) {
    console.error("Erro na rota GET:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rotas de POST
router.post("/", async (req: Request, res: Response) => {
  try {
    const newDev = req.body;
    await db.add(newDev);
    res.status(201).json(newDev);
  } catch (error) {
    console.error("Erro na rota POST:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rotas de PUT
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updateDev = await db.update(Number(req.params.id), req.body);
    updateDev ? res.json(updateDev) : res.status(404).send("Dev not found");
  } catch (error) {
    console.error("Erro na rota PUT:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rotas de DELETE
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deleteDev = await db.delete(Number(req.params.id));
    deleteDev ? res.json(deleteDev) : res.status(404).send("Dev not found");
  } catch (error) {
    console.error("Erro na rota DELETE:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});
export default router;
