import { Module } from "@nestjs/common";
import { CategoryController } from "./Category.controller";
import { CategoryService } from "./Category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entites/Category.entity";
import { CategoryRepository } from "./Category.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService, CategoryRepository],
    controllers: [CategoryController], 
})
export class CategoryModule {

}