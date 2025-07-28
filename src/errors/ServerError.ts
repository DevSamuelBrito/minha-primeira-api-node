// src/errors/ServerError.ts
import { BaseError } from "./BaseError";

export class ServerError extends BaseError {
  constructor(message: string = "Erro interno do servidor") {
    super(message, 500);
  }
}
