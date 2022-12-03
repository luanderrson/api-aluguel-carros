import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const importCatUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCatController = new ImportCategoryController(importCatUseCase);

export { importCatController };