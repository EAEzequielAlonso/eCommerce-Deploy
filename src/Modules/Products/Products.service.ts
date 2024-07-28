import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "./Products.respository";
import { Product } from "./Entities/Product.entity";
import { CreateProductDto } from "./Dtos/CreateProduct.dto";
import { UpdateProductDto } from "./Dtos/UpdateProduct.dto";
import { CategoryRepository } from "../Categories/Category.repository";
import preloadProduct from "../../Preload/productsData.json"
import { Category } from "../Categories/entites/Category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable () 
export class ProductsService {

    constructor (
        private readonly productsRepository: ProductsRepository,
        private readonly categoryRepository: CategoryRepository,
    ){}

    async preloadProductsSeed(): Promise<{message:String, response: string[]}> {
        //return await this.productsRepository.preloadProductsSeed();
        let responsePreload: string[]=[];
        for (const product of preloadProduct) {
            const productExist:Product = await this.productsRepository.getProductByName(product.name);
            const categoryExist:Category = await this.categoryRepository.getCategoryByName(product.category);
            if (!productExist) {   
                if (categoryExist) {
                    const productCreated: Product = await this.productsRepository.createProduct({...product, category: categoryExist});
                    responsePreload.push(`Se Agrego el Producto: ${productCreated.name}`)
                } 
            } else {
                if (productExist.orderDetails.length>=1) {
                    await this.productsRepository.updateProduct(productExist.id, {...product, category: categoryExist});
                    responsePreload.push(`Se Resetearon los datos del Producto: ${productExist.name}. Esta involucrado en una Orden`)
                } else {
                    await this.productsRepository.deleteProduct(productExist.id);
                    await this.productsRepository.createProduct({...product, category: categoryExist});
                    responsePreload.push(`Se elimino el Producto: ${product.name} y se volvio a crear con sus valores por defecto`)
                }
            }
        }
        const response = { 
            message: `Se realizaron ${responsePreload.length} modificaciones`,
            response: responsePreload
        }
        console.log(response);
        return response
    }

    async getProducts(page:number, limit:number): Promise<Product[]> {
       const start:number = (page-1) * limit;
        const end:number = page * limit; 
        const productPaginated: Product[] = await this.productsRepository.getProducts()
        if (productPaginated.length>0) return productPaginated.slice(start, end);
        else throw new NotFoundException("No hay productos en la Base de Datos")
    }

    async getProductById(id: string): Promise<Product> {
        const productFinded: Product = await this.productsRepository.getProductById(id);
        if (productFinded) return productFinded;
        else throw new NotFoundException("El producto buscado no existe");
    }

    async createProduct(product: CreateProductDto): Promise<string> {
       const category:Category = await this.categoryRepository.getCategoryByName(product.category.name)
        if (category) {
            const newProduct:Product = await this.productsRepository.createProduct(product);
            return newProduct.id;
        }else {
            throw new NotFoundException ("La categoria asignada al producto no existe")
        }
    }

    async updateProduct(id: string, product: UpdateProductDto): Promise<string> {
        const productUpdate = await this.productsRepository.updateProduct(id, product);
        if (productUpdate.affected===1) {
            return id;
        } else throw new NotFoundException("El producto que intenta actualizar no existe")
    }

    async deleteProduct(id: string): Promise<string> {
        const productDelete = await this.productsRepository.deleteProduct(id);
        if (productDelete.affected===1) {
            return id;
        } else throw new NotFoundException("El producto que intenta eliminar no existe")
    }
    
}