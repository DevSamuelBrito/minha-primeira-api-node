import express from "express";
import devRoutes from "./routes/devRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/dev", devRoutes);

app.listen(port, () => {
  console.log("Servidor está rodando....")
  console.log(`Server rodando em http://localhost:${port}`);
});
