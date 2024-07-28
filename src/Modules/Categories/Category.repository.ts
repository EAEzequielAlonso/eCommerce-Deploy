import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entites/Category.entity";
import { Repository } from "typeorm";


@Injectable() 
export class CategoryRepository {
        
        constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){}

        async getCategories() {
            return await this.categoryRepository.find();
        }

        async getCategoryByName (name:string): Promise<Category> {
            return await this.categoryRepository.findOne({
                where : {name}
            });
        }

        async create(category: Partial<Category>) {
            return await this.categoryRepository.save(category);
        }

}