import { app } from "..";
import request from "supertest";

describe("Testando a rota GET", () => {
  it("Deve retornar todos os dev", async () => {
    const response = await request(app).get("/dev");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Deve retornar um dev pelo ID", async () => {
    const create = await request(app)
      .post("/dev")
      .send({ nome: "TesteDeGetSupertes", linguagem: "TS" });
    const id = create.body.id;

    const response = await request(app).get(`/dev/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", id);
  });

  it("Deve retornar 404 para dev inexistente", async () => {
    const response = await request(app).get("/dev/999999");
    expect(response.status).toBe(404);
  });
});

describe("Testando a rota POST", () => {
  it("Deve criar um novo dev", async () => {
    const response = await request(app).post("/dev").send({
      nome: "Samuel",
      linguagem: "JavaScript",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("Samuel");
    expect(response.body.linguagem).toBe("JavaScript");
  });

  it("Deve dar erro ao criar um dev com dados faltantes", async () => {
    const response = await request(app).post("/dev").send({
      nome: "Samuel",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Dados inválidos");
  });
});

describe("Testando a rota PUT", () => {
  it("Deve atualizar um dev", async () => {
    const create = await request(app)
      .post("/dev")
      .send({ nome: "Antigo", linguagem: "Python" });
    const id = create.body.id;

    const response = await request(app)
      .put(`/dev/${id}`)
      .send({ nome: "Antigo Atualizado" });
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe("Antigo Atualizado");
  });

  it("Deve retornar 400 para dados inválidos na atualização", async () => {
    const create = await request(app)
      .post("/dev")
      .send({ nome: "Teste", linguagem: "Java" });
    const id = create.body.id;

    const response = await request(app).put(`/dev/${id}`).send({ nome: "" }); // nome inválido
    expect(response.status).toBe(400);
  });
});

describe("Testando a rota DELETE", () => {
  it("Deve deletar um dev", async () => {
    const create = await request(app)
      .post("/dev")
      .send({ nome: "Deletar", linguagem: "C++" });
    const id = create.body.id;

    const response = await request(app).delete(`/dev/${id}`);
    expect(response.status).toBe(200);
  });

  it("Deve retornar 404 ao tentar deletar dev inexistente", async () => {
    const response = await request(app).delete("/dev/9999999");
    expect(response.status).toBe(404);
  });
});

describe.only("Testando a rota de documentação Swagger", () => {
  it("Deve redirecionar /api-docs para /api-docs/", async () => {
    const response = await request(app).get("/api-docs");
    expect(response.status).toBe(301);
    expect(response.header.location).toBe("/api-docs/");
  });

  it("Deve retornar a documentação Swagger", async () => {
    const response = await request(app).get("/api-docs/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Swagger UI");
  });
});
