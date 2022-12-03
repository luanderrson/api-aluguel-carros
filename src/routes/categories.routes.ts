import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { controllerListCategories } from "../modules/cars/useCases/listCategories";
import multer from "multer";
import { importCatController } from "../modules/cars/useCases/importCategory";

const upload = multer({
  dest: "./tmp"
})

const categoriesRoutes = Router();

categoriesRoutes.post("/", (request, response)=>{
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) =>{
  return controllerListCategories.handle(request, response);
})

categoriesRoutes.post("/import", upload.single("file"),(request, response)=>{
  return importCatController.handle(request, response);
})

export { categoriesRoutes };