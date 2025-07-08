import { z } from "zod";

export const devSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    linguagem: z.string().min(1, "Linguagem é obrigatória"),
})