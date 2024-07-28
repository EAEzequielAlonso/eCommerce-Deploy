import { Module} from "@nestjs/common"; 
import { ProductsService } from "./Products.service";
import { ProductsController } from "./Products.controller";
import { ProductsRepository } from "./Products.respository";
import { Product } from "./Entities/Product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../Categories/entites/Category.entity";
import { CategoryRepository } from "../Categories/Category.repository";

@Module ({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    providers: [ProductsService, ProductsRepository, CategoryRepository],
    controllers: [ProductsController]
})
export class ProductsModule{

} 