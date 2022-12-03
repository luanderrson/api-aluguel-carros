import fs from "fs";
import { parse } from 'csv-parse';
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string
}


class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository){}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
    return new Promise((resolve, reject) =>{
      const stream = fs.createReadStream(file.path); //Faz a leitura do nosso arquivo e passando para o stream (tmp)
      const categories: IImportCategory[] = [];
  
      const parseFile = parse(); // Vai ser responsavel por ler linha por linha
      
      stream.pipe(parseFile); // A açao acima só é possível devido ao pipe que ta seperando nosso arquivo.
  
      parseFile.on("data", async (line) =>{
        const [name, description] = line;
        categories.push({
          name,
          description
        })
      })
      .on("end", () =>{
        fs.promises.unlink(file.path);
        resolve(categories);
      })
      .on("error", (err) =>{
        reject(err);
      })
    })
  }


  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async (category) =>{
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if(!existCategory){
        this.categoriesRepository.create({
          name, 
          description
        })
      }
    })
  }
}

export { ImportCategoryUseCase }