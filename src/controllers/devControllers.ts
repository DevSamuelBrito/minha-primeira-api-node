import { Request, Response } from "express";
import devService from "../services/devServices";

export async function getAllDevs(req: Request, res: Response) {
  try {
    const devs = await devService.getAll();
    res.json(devs);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function getDevById(req: Request, res: Response) {
  try {
    console.log("Body recebido:", req.body); // 👈 Aqui
    const dev = await devService.getById(Number(req.params.id));
    if (!dev)  res.status(404).send("Dev não encontrado");
    res.json(dev);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export async function createDev(req: Request, res: Response) {
  try {
    const newDev = await devService.add(req.body);
    res.status(201).json(newDev);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateDev(req: Request, res: Response) {
  try {
    const dev = await devService.getById(Number(req.params.id));
    if (!dev)  res.status(404).send("Dev não encontrado");
    const updatedDev = await devService.update(Number(req.params.id), req.body);
    res.status(201).json(updatedDev);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteDev(req: Request, res: Response) {
  try {
    const dev = await devService.getById(Number(req.params.id));
    if (!dev)  res.status(404).send("Dev não encontrado");
    const deletedDev = await devService.delete(Number(req.params.id));
    res.status(200).json(deletedDev);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
