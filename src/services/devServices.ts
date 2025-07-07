import devRepository from "../repositories/devRepository";
import Dev from "../models/devModel";

class DevService {
  async getAll(): Promise<Dev[]> {
    return devRepository.getAll();
  }

  async getById(id: number): Promise<Dev | null> {
    return devRepository.getById(id);
  }

  async add(dev: Omit<Dev, "id">): Promise<Dev> {
    if (!dev.nome) throw new Error("Nome é obrigatório");
    if (!dev.linguagem) throw new Error("Nome é obrigatório");
    return devRepository.add(dev);
  }

  async update(
    id: number,
    data: Partial<Omit<Dev, "id">>
  ): Promise<Dev | null> {
    const devAtual = await this.getById(id);
    if (!devAtual) throw new Error("Dev não encontrado");

    const nome = data.nome ?? devAtual.nome;
    const linguagem = data.linguagem ?? devAtual.linguagem;
    console.log("Atualizando dev:", { id, nome, linguagem });
    
    return devRepository.update(id, { nome, linguagem });
  }

  async delete(id: number): Promise<Dev | null> {
    const dev = await this.getById(id)
    if (!dev) throw new Error("Dev não encontrado");
    return devRepository.delete(id);
  }
}

export default new DevService();
