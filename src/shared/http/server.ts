import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes/index.js";
import AppError from "@shared/errors/AppError.js";
import "express-async-errors";
const app = express();

const PORT = 3000;
// identificar o formato da entrada, substituiu o bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error`,
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}! 🎉`);
});
