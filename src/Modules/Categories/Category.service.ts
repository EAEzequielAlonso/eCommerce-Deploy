import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoryRepository } from "./Category.repository";
import { Category } from "./entites/Category.entity";
import preloadCategories from "../../Preload/categoryData.json"

@Injectable ()
export class CategoryService {
        
    constructor(private readonly categoryRepository:CategoryRepository) {}

    async getCategories() {
        const categories:Category[] = await this.categoryRepository.getCategories();
        if (categories.length > 0) return categories;
        else throw new NotFoundException("No hay categorias en la base de datos")
    }
    
    async preloadCategoriesSeed(): Promise<string> {
        let cont:number = 0;
            for (const category of preloadCategories) {
                const categoryExist:Category = await this.categoryRepository.getCategoryByName(category.name);
                if (!categoryExist) {
                    await this.categoryRepository.create(category)
                    cont++;
                }
            }
            let response:string;
            if (cont === 0 ) response = `No se Cargó ninguna categoria nueva`;
            else if (cont === 1 ) response = `Se Cargó 1 categoria nueva`;
            else if (cont > 1 ) response = `Se Cargaron ${cont} categrias nuevas`; 
            console.log(response)
            return response
    }

}