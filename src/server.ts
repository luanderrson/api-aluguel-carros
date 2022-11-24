import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

app.use(express.json());

// Colocamos um path antes para ele saber que ja inicia com /categories e nao ter que ficar repetindo la dentro do arquivo.
app.use("/categories", categoriesRoutes);

app.listen(3333, () => console.log("Server is Running!"))