import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../Products/Entities/Product.entity';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryConfig } from '../../config/cloudinary';
import { ProductsRepository } from '../Products/Products.respository';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryService, CloudinaryConfig, ProductsRepository]
})
export class FilesModule {}
