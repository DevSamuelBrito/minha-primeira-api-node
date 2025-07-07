import pool from "../db/database";
import Dev  from "../models/devModel";

class DatabaseDevelopment {
  async getAll(): Promise<Dev[]> {
    const result = await pool.query('SELECT * FROM devs');
    return result.rows;
  }

  async getById(id: number): Promise<Dev | null> {
    const result = await pool.query('SELECT * FROM devs WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async add(dev: Omit<Dev, 'id'>): Promise<Dev> {
    const result = await pool.query(
      'INSERT INTO devs (nome, linguagem) VALUES ($1, $2) RETURNING *',
      [dev.nome, dev.linguagem]
    );
    return result.rows[0];
  }

  async update(id: number, data: Partial<Omit<Dev, 'id'>>): Promise<Dev | null> {
    const devAtual = await this.getById(id);
    if (!devAtual) return null;

    const nome = data.nome ?? devAtual.nome;
    const linguagem = data.linguagem ?? devAtual.linguagem;

    const result = await pool.query(
      'UPDATE devs SET nome = $1, linguagem = $2 WHERE id = $3 RETURNING *',
      [nome, linguagem, id]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<Dev | null> {
    const result = await pool.query('DELETE FROM devs WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
  }
}

export default new DatabaseDevelopment();
