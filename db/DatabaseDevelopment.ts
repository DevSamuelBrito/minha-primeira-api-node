export interface Dev {
  id: number;
  name: string;
  age: number;
  linguagem: string;
}

class DatabaseDevelopment {
  private devs: Dev[] = [
    { id: 1, name: "Samuel", age: 25, linguagem: "JavaScript" },
    { id: 2, name: "Maria", age: 30, linguagem: "Python" },
    { id: 3, name: "João", age: 22, linguagem: "Java" },
  ];

  getAllDevs(): Dev[] {
    return this.devs;
  }

  getById(id: number): Dev | undefined {
    return this.devs.find((dev) => dev.id === id);
  }

  add(dev: Dev): void {
    this.devs.push(dev);
  }

  update(id: number, data: Partial<Dev>): Dev | null {
    const index = this.devs.findIndex((dev) => dev.id == id);
    if (index !== -1) {
      this.devs[index] = { ...this.devs[index], ...data };
      return this.devs[index];
    }
    return null;
  }

  delete(id: number): Dev | null {
    const index = this.devs.findIndex((dev) => dev.id == id);
    if (index !== -1) {
      return this.devs.splice(index, 1)[0];
    }
    return null;
  }
}

export default new DatabaseDevelopment();
