import { Dev, Project } from "@prisma/client";
import devRepository from "../repositories/devRepository";
import {
  CreateDevInput,
  CreateProjectInput,
  UpdateProjectInput,
} from "../models/devModel";

class DevService {

  //GET
  async getAllDevs(): Promise<Dev[]> {
    const devs = await devRepository.getAllDevs();

    if (!devs || devs.length === 0) {
      throw new Error("Nenhum desenvolvedor encontrado");
    }
    return devs;
  }

  async getAllDevsByID(id: string): Promise<Dev | null> {
    const devs = await devRepository.getDevById(id);

    if (!devs) {
      throw new Error(`Nenhum desenvolvedor com o ID ${id} encontrado`);
    }
    return devs;
  }

  async getAllProjects(): Promise<Project[] | null> {
    const projetcs = await devRepository.getAllProjects();

    if (!projetcs || projetcs.length === 0) {
      throw new Error("Nenhum projeto encontrado");
    }
    return projetcs;
  }

  async getProjectByID(id: string): Promise<Project | null> {
    const projetcs = await devRepository.getProjectById(id);

    if (!projetcs) {
      throw new Error(`Nenhum projeto com o ID ${id} encontrado`);
    }
    return projetcs;
  }

  //POST
  async createDev(data: CreateDevInput) {
    if (!data.name) throw new Error("Nome é obrigatório");
    if (!data.techs) throw new Error("Linguagem é obrigatória");

    const newDev = await devRepository.createDev(data);
    if (!newDev) throw new Error("Erro ao criar desenvolvedor");
    return newDev;
  }

  async createProject(data: CreateProjectInput) {
    if (!data.name) throw new Error("Nome do projeto é obrigatório");
    if (!data.description)
      throw new Error("Descrição do projeto é obrigatória");
    if (
      !data.devProjects ||
      data.devProjects.length === 0 ||
      !data.devProjects[0].devId
    )
      throw new Error("ID do desenvolvedor é obrigatório");

    const newProject = await devRepository.createProject(data);
    if (!newProject) throw new Error("Erro ao criar projeto");
    return newProject;
  }

  //PUT
  async updateDev(id: string, data: Partial<CreateDevInput>) {
    if (!id) throw new Error("ID do desenvolvedor é obrigatório");
    if (!data) throw new Error("Dados para atualizar são obrigatórios");

    const existingDev = await devRepository.getDevById(id);
    if (!existingDev)
      throw new Error(`Desenvolvedor com ID ${id} não encontrado`);

    const updateDev = await devRepository.updateDev(data, id);
    if (!updateDev) throw new Error("Erro ao atualizar desenvolvedor");
    return updateDev;
  }

  async updateProject(id: string, data: Partial<UpdateProjectInput>) {
    if (!id) throw new Error("ID do desenvolvedor é obrigatório");
    if (!data) throw new Error("Dados para atualizar são obrigatórios");

    const existingProject = await devRepository.getProjectById(id);
    if (!existingProject){
      throw new Error(`Projeto com ID ${id} não encontrado`);
    }
    const updateProject = await devRepository.updateProject(data, id);
    if (!updateProject) throw new Error("Erro ao atualizar projeto");
    return updateProject;
  }

  //Delete 
  async deleteDev(id: string){
    if(!id) throw new Error("ID do desenvolvedor é obrigatório");
    const existingDev = await devRepository.getDevById(id);
    if (!existingDev) throw new Error(`Desenvolvedor com ID ${id} não encontrado`);

    const deleteDev = await devRepository.deleteDev(id);
    if (!deleteDev) throw new Error("Erro ao deletar desenvolvedor");
    return deleteDev;
  }

  async deleteProject(id: string){

  }
}

export default new DevService();
