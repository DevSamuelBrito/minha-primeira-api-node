import express from "express";
import devRoutes from "./routes/dev";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/dev", devRoutes);

app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port} veja o console para mais informações`
  );
});
