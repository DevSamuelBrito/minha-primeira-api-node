import { prisma } from "../lib/prisma";
import { Dev, Project, DevProject } from "@prisma/client";
import {
  CreateDevInput,
  CreateProjectInput,
  UpdateDevInput,
  UpdateProjectInput,
} from "../models/devModel";

class DatabaseDevelopment {
  //GET
  async getAllDevs(): Promise<Dev[]> {
    return await prisma.dev.findMany();
  }

  async getDevById(id: string): Promise<Dev | null> {
    return await prisma.dev.findUnique({
      where: { id: id },
      include: {
        devProjects: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async getAllProjects(): Promise<Project[]> {
    return await prisma.project.findMany();
  }

  async getProjectById(id: string): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: { id: id },
      include: {
        devProjects: {
          include: {
            dev: true,
          },
        },
      },
    });
  }

  async getDevProjectsByDevId(devId: string): Promise<DevProject[]> {
    return await prisma.devProject.findMany({
      where: { devId: devId },
      include: {
        project: true,
      },
    });
  }

  //POST
  async createDev(data: CreateDevInput): Promise<CreateDevInput> {
    return await prisma.dev.create({
      data: {
        name: data.name,
        email: data.email,
        techs: data.techs,
        devProjects: {
          create:
            data.devProjects?.map((project) => ({
              project: {
                connect: { id: project.projectId },
              },
            })) ?? [],
        },
      },
      include: {
        devProjects: {
          include: {
            project: true,
          },
        },
      },
    });
  }

  async createProject(data: CreateProjectInput): Promise<Project> {
    return await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        url: data.url,
        devProjects: {
          create: data.devProjects.map((dev) => ({
            dev: {
              connect: {
                id: dev.devId,
              },
            },
          })),
        },
      },
      include: {
        devProjects: {
          include: {
            dev: true,
          },
        },
      },
    });
  }

  //PUT
  async updateDev(data: Partial<UpdateDevInput>, id: string) {
    const existingLinks = await prisma.devProject.findMany({
      where: { devId: id },
      select: { projectId: true },
    });

    const existingProjectIds = new Set(
      existingLinks.map((link: any) => link.projectId)
    );

    const newProjectsToLink = data.devProjects?.filter(
      (project) => !existingProjectIds.has(project.projectId)
    );

    return await prisma.dev.update({
      where: { id: id },
      data: {
        name: data.name,
        email: data.email,
        techs: data.techs,
        updatedAt: new Date(),
        devProjects:
          newProjectsToLink && newProjectsToLink.length > 0
            ? {
                create: newProjectsToLink.map((project) => ({
                  project: {
                    connect: { id: project.projectId },
                  },
                })),
              }
            : undefined,
      },
      include: {
        devProjects: {
          include: { project: true },
        },
      },
    });
  }

  async updateProject(data: Partial<UpdateProjectInput>, id: string) {
    const existingLinks = await prisma.devProject.findMany({
      where: { projectId: id },
      select: { devId: true },
    });

    const existingDevIds = new Set(
      existingLinks.map((link: any) => link.devId)
    );

    const newDevsToLink = data.devProjects?.filter(
      (dev) => !existingDevIds.has(dev.devId)
    );

    return await prisma.project.update({
      where: { id: id },
      data: {
        name: data.name,
        description: data.description,
        url: data.url,
        updatedAt: new Date(),
        devProjects:
          newDevsToLink && newDevsToLink.length > 0
            ? {
                create: newDevsToLink.map((dev) => ({
                  dev: {
                    connect: { id: dev.devId },
                  },
                })),
              }
            : undefined,
      },
      include: {
        devProjects: {
          include: { dev: true },
        },
      },
    });
  }

  //DELETE
  async deleteDev(id: string): Promise<Dev | null> {
    const devProjects = await prisma.devProject.findMany({
      where: { devId: id },
      include: { project: true },
    });
    for (const devProject of devProjects) {
      const count = await prisma.devProject.count({
        where: { projectId: devProject.projectId },
      });

      if (count === 1) {
        await prisma.project.delete({
          where: { id: devProject.projectId },
        });
      } else {
        await prisma.devProject.delete({
          where: { id: devProject.id },
        });
      }
    }
    return await prisma.dev.delete({
      where: { id: id },
    });
  }

  async deleteProject(id: string): Promise<Project | null> {
    await prisma.devProject.deleteMany({
      where: { projectId: id },
    });

    return await prisma.project.delete({
      where: { id: id },
    });
  }
}

export default new DatabaseDevelopment();
