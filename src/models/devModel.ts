export  interface Dev {
  id: string;
  nome: string;
  email: string;
  techs: string[];
  createdAt: Date;
  updatedAt: Date;
  devProject: DevProject[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  devId: number;
  createdAt: Date;
  updatedAt: Date;
  devProjects: DevProject[];
}

export  interface DevProject {
  id: string;
  devId: string;
  projectId: string;
}

export  interface CreateDevInput {
  name: string;
  email: string;
  techs: string[];
  devProjects?: {
    projectId: string;
  }[];
}
export  interface UpdateDevInput {
  name: string;
  email: string;
  techs: string[];
  devProjects?: {
    projectId: string;
  }[];
}

export interface CreateProjectInput {
  name: string;
  description: string;
  url: string;
  devProjects:{
    devId: string;
  }[];
}
export interface UpdateProjectInput {
  name?: string;
  description?: string;
  url?: string;
  devProjects?: {
    devId: string;
  }[];
}