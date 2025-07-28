// src/errors/ValidationError.ts
import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
  constructor(message: string = "Erro de validação") {
    super(message, 400);
  }
}
