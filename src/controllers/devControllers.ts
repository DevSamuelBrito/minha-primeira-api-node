import { Request, Response, RequestHandler } from "express";
import devService from "../services/devServices";
import {
  createDevSchema,
  createProjectSchema,
  updateDevSchema,
  updateProjectSchema,
} from "../schemas/devSchema";

export const getAllDevs: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const devs = await devService.getAllDevs();
    res.json(devs);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getDevById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const dev = await devService.getAllDevsByID(req.params.id);
    if (!dev) {
      res.status(404).send("Dev não encontrado");
      return;
    }
    res.json(dev);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getAllProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const projects = await devService.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const getProjectById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const project = await devService.getProjectByID(req.params.id);
    if (!project) res.status(404).send("Projeto não encontrado");
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const createDev: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const validation = createDevSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      error: "Dados inválidos",
      details: validation.error.errors,
    });
    return;
  }

  try {
    const dev = await devService.createDev(validation.data);
    res.status(201).json({ message: "Dev criado com sucesso", dev });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const validation = createProjectSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      error: "Dados inválidos",
      details: validation.error.errors,
    });
    return;
  }

  if (validation.data.devProjects.length === 0) {
    res.status(400).json({
      error: "Deve haver pelo menos um desenvolvedor vinculado ao projeto",
    });
    return;
  }

  try {
    const project = await devService.createProject(validation.data);
    res.status(201).json({ message: "Projeto criado com sucesso", project });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDev: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const validation = updateDevSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      error: "Dados inválidos",
      details: validation.error.errors,
    });
    return;
  }

  try {
    const dev = await devService.updateDev(req.params.id, validation.data);
    res.json({
      message: "Dev atualizado com sucesso",
      dev,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const validation = updateProjectSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      error: "Dados inválidos",
      details: validation.error.errors,
    });
    return;
  }
  try {
    const project = await devService.updateProject(
      req.params.id,
      validation.data
    );
    res.json({
      message: "Projeto atualizado com sucesso",
      project,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDev: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await devService.deleteDev(req.params.id);
    res.json({ message: "Dev deletado com sucesso", result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await devService.deleteProject(req.params.id);
    res.json({ message: "Projeto deletado com sucesso", result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
