import express, { Request, Response } from "express";
const router = express.Router();
import db from "../db/DatabaseDevelopment";

//Rotas de GET
router.get("/", (req: Request, res: Response) => {
  res.json(db.getAllDevs());
});

router.get("/:id", (req: Request, res: Response) => {
  const dev = db.getById(Number(req.params.id));
  dev ? res.json(dev) : res.status(404).send("Dev not found");
});


//Rotas de POST
router.post("/", (req: Request, res: Response) => {
  const newDev = req.body;
  db.add(newDev);
  res.status(201).json(newDev);
});


//Rotas de PUT
router.put("/:id", (req: Request, res: Response) => {
    const updateDev = db.update(Number(req.params.id), req.body);
    updateDev ? res.json(updateDev) : res.status(404).send("Dev not found");
});


//Rotas de DELETE
router.delete('/:id', (req: Request, res: Response) => {
    const deleteDev = db.delete(Number(req.params.id));
    deleteDev ? res.json(deleteDev) : res.status(404).send("Dev not found");
})
export default router;
