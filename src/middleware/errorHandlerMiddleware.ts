import { Request, Response } from "express";
import createHttpError from "http-errors";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: any
) {
  if (createHttpError.isHttpError(err)) {
    // Se for um erro HTTP, usa o status e a mensagem do erro
    res.status(err.status || 500).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Para outros tipos de erros, usa um status 500 e uma mensagem genérica
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
