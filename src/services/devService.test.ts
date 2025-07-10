import pool from "../db/database";
import Dev from "../models/devModel";
import devServices from "./devServices";

afterAll(async () => {
  await pool.end();
});

describe("Dev Service Tests", () => {
  describe("Teste do GetAll", () => {
    it("Isso deve retornar uma lista de devs", async () => {
      const devs = await devServices.getAll();
      expect(Array.isArray(devs)).toBe(true);
    });
  });

  describe("Teste do GetById", () => {
    it("Isso deve retornar um dev especifico", async () => {
      const dev = await devServices.getById(9);
      expect(dev).toBeDefined();
      expect(dev?.id).toBe(9);
    });
    it("Isso deve retornar um null para um id inexistente", async () => {
      const dev = await devServices.getById(9999999);
      expect(dev).toBeNull();
    });
  });

  describe("Teste do add", () => {
    it("Isso deve adicionar um novo Dev ", async () => {
      const novoDev = await devServices.add({
        nome: "Testador",
        linguagem: "Jestjs",
      } as Dev);
      expect(novoDev).toBeDefined();
      expect(novoDev).toHaveProperty("id");
      expect(novoDev.nome).toBe("Testador");
      expect(novoDev.linguagem).toBe("Jestjs");
    });
  });

  describe("Teste do Add com erro", () => {
    it("Isso deve dar um erro de nome faltando", async () => {
      const novoDevInvalido = {
        linguagem: "jestjs",
      } as any;

      await expect(devServices.add(novoDevInvalido)).rejects.toThrow(
        "Nome é obrigatório"
      );
    });

    it("Isso deve dar um erro de linguagem faltando", async () => {
      const novoDevInvalido = {
        nome: "Samuel",
      } as any;

      await expect(devServices.add(novoDevInvalido)).rejects.toThrow(
        "Linguagem é obrigatório"
      );
    });
  });

  describe("Teste do Update", () => {
    it("isso deve atualizar um Dev", async () => {
      const devAtualizado = await devServices.update(9, {
        nome: "Samuel Atualizado",
        linguagem: "javaScript atualizado",
      } as Dev);

      expect(devAtualizado).toBeDefined();
      expect(devAtualizado?.id).toBe(9);
      expect(devAtualizado?.nome).toBe("Samuel Atualizado");
      expect(devAtualizado?.linguagem).toBe("javaScript atualizado");
    });

    it("isso deve dar erro quando o dev não existe", async () => {
      await expect(
        devServices.update(9999999, {
          nome: "Teste",
        })
      ).rejects.toThrow("Dev não encontrado");
    });
  });

  describe("Teste do Delete", () => {
    it("isso deve deletar um dev", async () => {
      const devDeletado = await devServices.delete(11);
      expect(devDeletado).toBeDefined();
      expect(devDeletado?.id).toBe(11);
    });

    it("isso deve dar erro quando o dev não existe", async () => {
      await expect(devServices.delete(9999999)).rejects.toThrow(
        "Dev não encontrado"
      );
    });
  });
});
