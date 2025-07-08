import express from "express";
import devRoutes from "./routes/devRoutes";
import dotenv from "dotenv";
import swaggerDocument from "./docs/swagger.json";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/dev", devRoutes);
if (process.env.NODE_ENV === "development") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.listen(port, () => {
  console.log("Servidor está rodando....");
  console.log(`Server rodando em http://localhost:${port}`);
});
