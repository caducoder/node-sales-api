import routes from "./routes/index.js";
import cors from "cors";
import express from "express";
import errorHandler from "src/middleware/errorHandlerMiddleware.js";

import "express-async-errors";

const app = express();

const PORT = process.env.PORT || 3000;
// identificar o formato da entrada, substituiu o bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}! 🎉`);
});
