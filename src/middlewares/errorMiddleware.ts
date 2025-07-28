import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { BaseError } from "../errors/BaseError";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Erro capturado:", err);

  if (err instanceof BaseError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: "Erro interno do servidor" });
  return;
};
