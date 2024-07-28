import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsString } from "class-validator"

export class seedResponseDto {

    @IsString()
    @ApiProperty({
        example: "Se realizaron 3 modificaciones",
    })
    message: string

    @IsArray()
    @ApiProperty({
        example: `['Se Agrego el Producto: NombreProducto', 'Se Resetearon los datos del Producto: NombreProducto1. Esta involucrado en una Orden', 'Se eliminó y volvió a crear el Producto: NomnbreProducto3 con sus valores por defecto']`,
    })
    response: string[]

}