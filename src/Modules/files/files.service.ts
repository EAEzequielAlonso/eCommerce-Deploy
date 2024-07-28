import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../Products/Entities/Product.entity';
import { CloudinaryService } from './cloudinary.service';
import { ProductsRepository } from '../Products/Products.respository';

@Injectable()
export class FilesService {

  constructor (private readonly productRepository:ProductsRepository,
        private readonly cloudinaryService: CloudinaryService
  ) {}

  async update(id: string, file: Express.Multer.File) {
    const product: Product = await this.productRepository.getProductById(id)
        if (product) { 
            const image = await this.cloudinaryService.uploadImage(file);
            await this.productRepository.updateProduct(id, {imgUrl: image.secure_url});
            product.imgUrl = image.secure_url;
            return product;
        } else {
            throw new NotFoundException("El producto que intenta actualizar no existe")
        }
  }
}
