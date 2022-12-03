import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string, 
  description: string
}

// Sempre vamo manter esse padrao, criou o service e dentro coloca o execute.
// A gente precisa ver como vamos receber os dados do nosso request e pra isso criamos uma interface

/**
 * 
 * [x] - Definir o tipo do retorno
 * [x] - Alterar o retorno do erro
 * [x] - Acessar o repositorio
 * [x] - retornar algo (nem teve)
 */

// Nosso service nao precisa reconhecer o response.

// Service = Alto nível
// Rotas = Baixo nível "É o que está mais perto do usuario"
class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({name, description}: IRequest): void {
    const categoriesRepository = new CategoriesRepository();
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if(categoryAlreadyExists){
      // NO nosso serviço a gente nao consegue dar um response, entao retornamos uma funçao do JS como mostra abaixo
      throw new Error("Category already exists!")
    }

    this.categoriesRepository.create({name, description});

  }
}

export { CreateCategoryUseCase }