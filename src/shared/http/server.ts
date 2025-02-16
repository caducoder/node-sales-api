import routes from "./routes/index.js";
import cors from "cors";
import express from "express";
import errorHandler from "src/middleware/errorHandlerMiddleware.js";
import { generalLogger, httpLogger } from "@shared/lib/logger.js";

import "express-async-errors";

const app = express();

const PORT = process.env.PORT || 3000;
// identificar o formato da entrada, substituiu o bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(httpLogger);

app.get("/", (req, res) => {
  res.json({
    message: "Backend ativo! Recebendo requisições com sucesso 🚀",
    status: "OK",
    timestamp: new Date().toISOString() + " UTC",
    uptime: process.uptime().toFixed(2) + "s",
  });
});

app.use("/api", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  generalLogger.info(`Server is running on port ${PORT}!`);
});
