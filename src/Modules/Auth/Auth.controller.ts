import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { User } from "../Users/Entities/User.entity";
import { CreateUserDto } from "../Users/Dtos/CreateUser.dto";
import { ErrorManager } from "../../Utils/ErrorManager";
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { userCredentialDto } from "./Dtos/UserCredential.dto";

@ApiTags("Auth")
@Controller ("auth")
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post("signin")
    @ApiOperation({ summary: 'Realiza el logueo y devuelve el Token de autenicacion'})
    @ApiBody({description:"Las credenciales", type: userCredentialDto})
    @ApiInternalServerErrorResponse({description: "Error al intentar Loguear el Usuario"})
    @ApiBadRequestResponse({description: "Usuario o Clave incorrectos"})
    async signin (@Body() userLogin:userCredentialDto): Promise<Omit<User, "password" | "isAdmin"> & {token: string}> {
        return ErrorManager ({
            functionTry: () => this.authService.signin(userLogin), 
            message: "Error al intentar Loguear el Usuario"})
    }

    @Post("signup")
    @ApiOperation({ summary: 'Registra usuarios nuevos'})
    @ApiBody({description:"Ingrese todos los datos requeridos", type: CreateUserDto})
    @ApiInternalServerErrorResponse({description: "Error al intentar Registrar el Usuario"})
    @ApiBadRequestResponse({description: "Si el usuario esta en al Base de Datos: El usuario ya existe / Si las contrseñas no son iguales: La contraseña y su confirmacion no cohinciden"})
    async signup (@Body() user:CreateUserDto): Promise<Omit<User, "password">> {
        
        return ErrorManager ({
            functionTry: () => this.authService.signup(user), 
            message: "Error al intentar Registrar el Usuario"})
    }
} 