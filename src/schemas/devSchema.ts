import { string, z } from "zod";

export const createDevSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  techs: z
    .array(string().min(1, "Tecnologia não pode ser vazia"))
    .min(1, "Pelo menos uma tecnologia é obrigatória"),

  //devProjects é opcional aqui
  devProjects: z
    .array(
      z.object({
        projectId: z.string().min(1, "O ID do projeto é obrigatório"),
      })
    )
    .optional(),
});

export const updateDevSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("Email inválido").optional(),
  techs: z
    .array(string().min(1, "Tecnologia não pode ser vazia"))
    .min(1, "Pelo menos uma tecnologia é obrigatória")
    .optional(),
  devProjects: z
    .array(
      z.object({
        projectId: z.string().min(1, "O ID do projeto é obrigatório"),
      })
    )
    .optional(),
}).strict();

export const createProjectSchema = z.object({
  name: z.string().min(1, "Nome do Projeto é obrigatório"),
  description: z.string().min(1, "Descrição do Projeto é obrigatória"),
  url: z.string().min(1, "URL é obrigatória"),
  devProjects: z
    .array(
      z.object({
        devId: z.string().min(1, "O ID do desenvolvedor é obrigatório"),
      })
    )
    .min(1, "Pelo menos um desenvolvedor é obrigatório"),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1, "Nome do Projeto é obrigatório").optional(),
  description: z.string().min(1, "Descrição do Projeto é obrigatória").optional(),
  url: z.string().min(1, "URL é obrigatória").optional(),
  devProjects: z
    .array(
      z.object({
        devId: z.string().min(1, "O ID do desenvolvedor é obrigatório"),
      })
    )
    .optional(),
}).strict();
