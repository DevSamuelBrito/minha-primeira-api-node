// src/errors/NotFoundError.ts
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message: string = "Recurso não encontrado") {
    super(message, 404);
  }
}
