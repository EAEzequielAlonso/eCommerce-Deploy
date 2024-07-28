import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./Entities/Product.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { UpdateProductDto } from "./Dtos/UpdateProduct.dto";

@Injectable()
export class ProductsRepository {

    constructor(@InjectRepository(Product) private productRepository:Repository<Product>) {}

    async getProducts(): Promise<Product[]> {
        return await this.productRepository.find()
    }

    async getProductById(id: string): Promise<Product> {
        return await this.productRepository.findOne({
            where : {id},
            relations: {category: true}
        });
    }

    async getProductByName(name: string): Promise<Product> {
        return await this.productRepository.findOne({
            where : {name},
            relations: {
                category: true,
                orderDetails:  true,
            }
        });
    }
 
    async createProduct(product: Partial<Product>):Promise<Product> {        
        return await this.productRepository.save(product);
    }

    async updateProduct(id: string, product: Partial<Product>): Promise<UpdateResult> {
        return await this.productRepository.update(id, product);
    }

    async deleteProduct(id: string): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }
}