import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import {v4 as uuid} from "uuid";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID('4', { message: 'userID must be a valid UUID version 4' })
    @ApiProperty({
        description: "Es el UUID del usuario que emite la Orden. Es Obligatorio",
        example: "123ui-456poiu-456ñl5-456gft",
    })
    userId: string

    @IsArray()
    @ArrayNotEmpty({ message: 'Products array must contain at least one product.' })
    @ApiProperty({
        description: "Es un arreglo de UUIDs de los productos comprados por el usuario. Es Obligatorio",
        example: ["123ui-456poiu-456ñl5-456gft", "123ui-456poiu-456ñl5-456gft", "123ui-456poiu-456ñl5-456gft"],
    })
    products: uuid[];
}