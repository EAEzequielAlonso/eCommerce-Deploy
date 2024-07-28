import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, {message: 'Name must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Name must not exceed 80 characters.' })
    @ApiProperty({
        description: "El nombre de usuario es obligatorio.",
        example: "Hernesto Harris",
    })
    name: string

    @IsEmail()
    @ApiProperty({
        description: "El email de usuario es obligatorio y debe ser valido",
        example: "harris@gmail.com",
    })
    email: string

    @IsString() 
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
    })
    @MinLength(8, {message: 'Password must be at least 8 characters long.' })
    @MaxLength(15, {message: 'Password must not exceed 15 characters.' })
    @ApiProperty({
        description: "El password es obligaorio, debe contener al menos una minuscula, una mayuscula, un numero y algun caracter especial (!@#$%^&*).",
        example: "2024@Hernesto",
    })
    password: string

    @IsString() 
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
    })
    @MinLength(8, {message: 'Password must be at least 8 characters long.' })
    @MaxLength(15, {message: 'Password must not exceed 15 characters.' })
    @ApiProperty({
        description: "El password de Confirmacion es obligaorio, debe ser igual al password",
        example: "2024@Hernesto",
    })
    passwordConfirm: string

    @ApiHideProperty()
    @IsEmpty()
    @IsOptional()
    // @ApiProperty({
    //     description: "Este campo indica si el usuario es Administrador o no. Por default es 'false'. No es Obligatorio",
    //     default: false,
    // })
    isAdmin: boolean;

    @IsString()
    @MinLength(3, {message: 'Address must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Address must not exceed 80 characters.' })
    @ApiProperty({
        description: "La dirección es obligatoria.",
        example: "Alamos de Primavera 756",
    })
    address: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "El telefono es obligatoria. Deben ser solo numeros",
        example: "1165456789",
    })
    phone: number

    @MinLength(3, {message: 'Country must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Country must not exceed 80 characters.' })
    @IsOptional()
    @ApiPropertyOptional({
        description: "El Pais es opcional.",
        example: "Argentina",
    })
    country: string | undefined

    @MinLength(3, {message: 'Country must be at least 3 characters long.'})
    @MaxLength(80, { message: 'Country must not exceed 80 characters.' })
    @IsOptional()
    @ApiPropertyOptional({
        description: "La ciudad es opcional.",
        example: "Buenos Aires",
    })
    city: string | undefined
}