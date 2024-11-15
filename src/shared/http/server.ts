import routes from "./routes/index.js";
import cors from "cors";
import express from "express";
import errorHandler from "src/middleware/errorHandlerMiddleware.js";

import "express-async-errors";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3000;
// identificar o formato da entrada, substituiu o bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const allowedDevOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      // Permite pedidos sem origin (como Postman ou ferramentas de teste)
      if (!origin) return callback(null, true);

      if (process.env.NODE_ENV === "prod") {
        if (origin === "https://www.exemplo.com.br") {
          return callback(null, true);
        }
      }

      // Verifica se a origem está na lista de permitidas
      if (allowedDevOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Origin not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}! 🎉`);
});
