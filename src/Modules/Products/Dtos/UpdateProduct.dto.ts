import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Category } from "../../Categories/entites/Category.entity"

export class UpdateProductDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Name must not exceed 80 characters.' })
    @IsOptional()
    @ApiPropertyOptional({
        description: "El nombre del producto es Opcional.",
        example: "Samsung X21",
    })
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(80, { message: 'Name must not exceed 80 characters.' })
    @IsOptional()
    @ApiPropertyOptional({
        description: "La descripción del producto es Opcional.",
        example: "Samsung X21, Cam 13 mp, Mem 2gb, 120 Gb",
    })
    description: string

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        description: "El precio del producto es Opcional.",
        example: 110,
    })
    price: number

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        description: "El stock del producto es Opcional.",
        example: 10,
    })
    stock: number

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "La Imagen del producto es Opcional. Es la Url donde se aloja la imagen del producto",
        example: "http://nombreDeDominio/producto12.webp",
    })
    imgUrl: string

    @IsOptional()
    @ApiPropertyOptional({
        description: "La Imagen del producto es Opcional. Es la Url donde se aloja la imagen del producto",
        example: "http://nombreDeDominio/producto.webp",
    })
    category: Category;

}