import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import "express-async-errors";
import errorHandler from "src/middleware/errorHandlerMiddleware.js";
const app = express();

const PORT = 3000;
// identificar o formato da entrada, substituiu o bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}! 🎉`);
});
