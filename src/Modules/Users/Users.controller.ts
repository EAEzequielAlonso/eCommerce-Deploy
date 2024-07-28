import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./Users.service";
import { AuthGuard } from "../Auth/Guards/Auth.guard";
import { User } from "./Entities/User.entity";
import { UpdateUserDto } from "./Dtos/UpdateUser.dto";
import { ErrorManager } from "../../Utils/ErrorManager";
import { Role } from "./Roles/roles.enum";
import { RolesGuard } from "./Roles/roles.guard";
import { Roles } from "./Roles/roles.decorator";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags("Users") 
@Controller ("users")
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retorna todos los usuarios existentes segun la paginacion ingresada'})
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    @ApiNotFoundResponse({description:"No hay usuarios en la Base de Datos"})
    @ApiInternalServerErrorResponse({description: "Error al intentar mostrar los usuarios"})
    async getUsers (@Query("page") page:number = 1, @Query("limit") limit:number = 5,): Promise<User[]> {
        
        return ErrorManager ({
                functionTry:() => this.usersService.getUsers(page, limit), 
                message: "Error al intentar mostrar los usuarios",
            }) 
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retorna el usuario correspondiente al ID ingresado'})
    @Get(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @ApiNotFoundResponse({description:"El usuario buscado no Existe"})
    @ApiInternalServerErrorResponse({description: "Error al intentar mostrar el usuario"})
    @ApiBadRequestResponse({description: "Validation failed (uuid is expected)"})
    async getUserById(@Param("id", ParseUUIDPipe) id: string): Promise<User> {
        
        return ErrorManager ({
            functionTry: () => this.usersService.getUserById(id),
            message: "Error al intentar mostrar el usuario"
        })
    }

    // @Post()
    // @HttpCode(201)
    // async createUser(@Body() user:CreateUserDto):Promise<string> {

    //     return ErrorManager ({
    //         functionTry:() => this.usersService.createUser(user), 
    //         message: "Error al Intentar Crear el Usuario"
    //     }) 
    // }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualiza los datos pasador por body del usuario correspondiente al ID ingresado'})
    @ApiBody({description: "Ingrese solo los datos a modificar", type: UpdateUserDto})
    @Put(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @ApiInternalServerErrorResponse({description: "Error al Intentar Actualizar el Usuario"})
    @ApiNotFoundResponse({description:"El usuario que intenta actualizar no existe"})
    @ApiUnauthorizedResponse({description: "Si no se envia el token: 'No se ha encontrado el Bearer token' // Si el token no es valido: 'El Token es Invalido'"})
    async updateUser(@Param("id", ParseUUIDPipe) id: string, @Body() user:UpdateUserDto): Promise<string> {

        return ErrorManager ({functionTry: () => this.usersService.updateUser(id, user), 
            message: "Error al Intentar Actualizar el Usuario"
        }) 
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Elimina el usuario correspondiente al ID ingresado'})
    @Delete(":id")
    @UseGuards(AuthGuard)
    @HttpCode(200)
    @ApiInternalServerErrorResponse({description: "Error al intentar eliminar el Usuario"})
    @ApiNotFoundResponse({description:"El usuario que intenta eliminar no existe"})
    @ApiUnauthorizedResponse({description: "Si no se envia el token: 'No se ha encontrado el Bearer token' // Si el token no es valido: 'El Token es Invalido'"})
    async deleteUser(@Param("id", ParseUUIDPipe) id: string):Promise<string> {
        
        return ErrorManager ({
            functionTry: () => this.usersService.deleteUser(id), 
            message: "Error al Intentar Eliminar el Usuario"
        }) 
    }

    @Post("seeder")
    @ApiOperation({ summary: 'Realiza la recarga de los productos'})
    @HttpCode(201)
    @ApiInternalServerErrorResponse({description: "Error al intentar ejecutar la precarga de Usuarios"})
    async preloadUsersSeed(): Promise<string> {
       
        return ErrorManager ({
            functionTry: () => this.usersService.preloadUsersSeed(), 
            message: "Error al intentar ejecutar la precarga de Usuarios"
        })
    }
}