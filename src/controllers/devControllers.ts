import { Request, Response, RequestHandler } from "express";
import devService from "../services/devServices";
import {
  createDevSchema,
  createProjectSchema,
  updateDevSchema,
  updateProjectSchema,
} from "../schemas/devSchema";
import { ValidationError } from "../errors/ValidationError";

export const getAllDevs: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const devs = await devService.getAllDevs();
  res.json(devs);
};

export const getDevById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const dev = await devService.getAllDevsByID(req.params.id);
  res.json(dev);
};

export const getAllProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const projects = await devService.getAllProjects();
  res.json(projects);
};

export const getProjectById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const project = await devService.getProjectByID(req.params.id);
  res.json(project);
};

export const createDev: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const validation = createDevSchema.safeParse(req.body);

  if (!validation.success) {
    throw new ValidationError("Dados inválidos");
  }

  const dev = await devService.createDev(validation.data);
  res.status(201).json({ message: "Dev criado com sucesso: ", dev });
};

export const createProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const validation = createProjectSchema.safeParse(req.body);

  if (!validation.success) {
    throw new ValidationError("Dados inválidos");
  }

  if (validation.data.devProjects.length === 0) {
    throw new ValidationError(
      "Deve haver pelo menos um desenvolvedor associado ao projeto"
    );
  }

  const project = await devService.createProject(validation.data);
  res.status(201).json({ message: "Projeto criado com sucesso", project });
};

export const updateDev: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const validation = updateDevSchema.safeParse(req.body);

  if (!validation.success) {
    throw new ValidationError("Dados inválidos");
  }

  const dev = await devService.updateDev(req.params.id, validation.data);
  res.json({
    message: "Dev atualizado com sucesso",
    dev,
  });
};

export const updateProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const validation = updateProjectSchema.safeParse(req.body);

  if (!validation.success) {
    throw new ValidationError("Dados inválidos");
  }
  const project = await devService.updateProject(
    req.params.id,
    validation.data
  );
  res.json({
    message: "Projeto atualizado com sucesso",
    project,
  });
};

export const deleteDev: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const result = await devService.deleteDev(req.params.id);
  res.json({ message: "Dev deletado com sucesso", result });
};
export const deleteProject: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const result = await devService.deleteProject(req.params.id);
  res.json({ message: "Projeto deletado com sucesso", result });
};
