import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/todos";

dotenv.config();

const app: Application = express();
const port: number = 3000;

app.use(cors());
app.use(express.json());

app.use("/todos", todoRouter);

app.listen(port, () => {
  console.log(`App is listening ${port}`);
});

export default app;
