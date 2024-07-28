import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Name must not exceed 80 characters.' })
    @IsOptional()
    @ApiPropertyOptional({
        description: "El nombre de usuario es opcional.",
        example: "Hernestino Harrison",
    })
    name: string

    @IsEmail()
    @IsOptional()
    @ApiPropertyOptional({
        description: "El email debe ser valido. Es opcional",
        example: "harris@gmail.com",
    })
    email: string

    @IsString() 
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
    })
    @MinLength(8, {message: 'Password must be at least 8 characters long.' })
    @MaxLength(15, {message: 'Password must not exceed 15 characters.' })
    @IsOptional()
    @ApiPropertyOptional({
        description: "El password es opcional, debe contener al menos una minuscula, una mayuscula, un numero y algun caracter especial (!@#$%^&*).",
        example: "2024@Hernestino",
    })
    password: string

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({
        description: "Este campo indica si el usuario es Administrador o no. Es Opcional",
        example: true,
    })
    isAdmin: boolean

    @MinLength(3, {message: 'Address must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Address must not exceed 80 characters.' })
    @IsOptional()
    @ApiPropertyOptional({
        description: "La dirección es Opcional.",
        example: "Alamos de Primavera 555",
    })
    address: string

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        description: "El telefono es opcional. Deben ser solo numeros",
        example: "1165456111",
    })
    phone: number

    @MinLength(3, {message: 'Country must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Country must not exceed 80 characters.' })
    @IsOptional()
    @ApiPropertyOptional({
        description: "El Pais es opcional.",
        example: "Peru",
    })
    country: string | undefined

    @MinLength(3, {message: 'Country must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Country must not exceed 80 characters.' })
    @IsOptional()
    @ApiPropertyOptional({
        description: "La ciudad es opcional.",
        example: "Lima",
    })
    city: string | undefined
}