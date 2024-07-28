import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Category } from "../../Categories/entites/Category.entity"

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Name must not exceed 80 characters.' })
    @ApiProperty({
        description: "El nombre del producto es Obligatorio.",
        example: "Samsung X20",
    })
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(80, { message: 'Name must not exceed 80 characters.' })
    @ApiProperty({
        description: "La descripción del producto es Obligatorio.",
        example: "Samsung X20, Cam 30 mp, Mem 4gb, 120 Gb",
    })
    description: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "El precio del producto es Obligatorio.",
        example: 120.90,
    })
    price: number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "El stock del producto es Obligatorio.",
        example: 13,
    })
    stock: number

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: "La Imagen del producto es Opcional. Es la Url donde se aloja la imagen del producto",
        example: "http://nombreDeDominio/producto.webp",
    })
    imgUrl: string

    @ApiPropertyOptional({
        description: "esta es la categoria a la que pertenece el producto",
        example: {id: "123ew-123ert-456ytr-345ty-1234rttyu",
                name: "SmartPhone",
                },
    })
    category: Category;

}