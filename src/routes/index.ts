import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";

const router = Router();

// Colocamos um path antes para ele saber que ja inicia com /categories e nao ter que ficar repetindo la dentro do arquivo.
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);

export { router }