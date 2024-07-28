import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./Products.service";
import { AuthGuard } from "../Auth/Guards/Auth.guard";
import { Product } from "./Entities/Product.entity";
import { CreateProductDto } from "./Dtos/CreateProduct.dto";
import { UpdateProductDto } from "./Dtos/UpdateProduct.dto";
import { Roles } from "../Users/Roles/roles.decorator";
import { Role } from "../Users/Roles/roles.enum";
import { RolesGuard } from "../Users/Roles/roles.guard";
import { ErrorManager } from "../../Utils/ErrorManager";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiForbiddenResponse, ApiHeader, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { seedResponseDto } from "./Dtos/seedResponse.dto";

@ApiTags("Products")
@Controller ("products")
export class ProductsController {
    constructor (private readonly productsService: ProductsService) {}

    @Get()
    @ApiOperation({ summary: 'Retorna todos los Productos de la base de datos'})
    @HttpCode(200)
    @ApiNotFoundResponse({description:"No hay productos en la Base de Datos"})
    @ApiInternalServerErrorResponse({description: "Error al intentar mostrar los productos"})
    async getProducts(
        @Query("page") page:number = 1,
        @Query("limit") limit:number = 5,
    ): Promise<Product[]> {

        return ErrorManager ({
            functionTry: () => this.productsService.getProducts(page, limit), 
            message: "Error al intentar mostrar los productos"
        })
    }

    @Get(":id")
    @ApiOperation({ summary: 'Retorna el producto correspondiente al ID ingresado'})
    @HttpCode(200)
    @ApiNotFoundResponse({description:"El producto buscado no existe"})
    @ApiInternalServerErrorResponse({description: "Error al intentar mostrar el producto"})
    @ApiBadRequestResponse({description: "Validation failed (uuid is expected)"})
    async getProductById(@Param("id", ParseUUIDPipe) id: string): Promise<Product> {

        return ErrorManager ({
            functionTry: () => this.productsService.getProductById(id), 
            message: "Error al intentar mostrar el producto"
        })
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Crea un producto nuevo'})
    @ApiBody({description:"Ingrese todos los datos del Producto nuevo", type: CreateProductDto})
    @Post() 
    @HttpCode(201)
    @ApiUnauthorizedResponse({description: "Si no se envia el token: 'No se ha encontrado el Bearer token' // Si el token no es valido: 'El Token es Invalido'"})
    @ApiBadRequestResponse({description: "Se mostrara la lista de todos los datos mal ingresados"})
    @ApiNotFoundResponse({description: "La categoria asignada al producto no existe"})
    @ApiInternalServerErrorResponse({description: "Error al intentar crear el producto"})
    async createProduct(@Body() product: CreateProductDto): Promise<string> {

        return ErrorManager ({
            functionTry: () => this.productsService.createProduct(product), 
            message: "Error al intentar crear el producto"
        })
    }

    @Post("seeder")
    @ApiOperation({ summary: 'Realiza la recarga de los productos'})
    @HttpCode(201)
    @ApiInternalServerErrorResponse({description: "Error al intentar ejecutar la precarga de Productos"})
    async preloadProductsSeed (): Promise<seedResponseDto> {

        return ErrorManager ({
            functionTry: () => this.productsService.preloadProductsSeed(), 
            message: "Error al intentar ejecutar la precarga de Productos"
        })        
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualiza los datos pasados por body del producto correspodiente al ID ingresado'})
    @ApiBody({description:"Ingrese solo los datos a actualizar", type: UpdateProductDto})
    @Put(":id")
    @Roles(Role.Admin) 
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(200)
    @ApiInternalServerErrorResponse({description: "Error al intentar actualizar el producto"})
    @ApiNotFoundResponse({description:"El producto que intenta actualizar no existe"})
    @ApiForbiddenResponse({description: "No tienes permiso ni acceso a esta ruta"})
    @ApiUnauthorizedResponse({description: "Si no se envia el token: 'No se ha encontrado el Bearer token' // Si el token no es valido: 'El Token es Invalido'"})
    async updateProduct(@Param("id", ParseUUIDPipe) id: string, @Body() product: UpdateProductDto): Promise<string> {

        return ErrorManager ({
            functionTry:() => this.productsService.updateProduct(id, product), 
            message :"Error al intentar actualizar el producto"
        })
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Elimina el procucto correspondiente al ID ingresado'})
    @Delete(":id")
    @HttpCode(200)
    @ApiInternalServerErrorResponse({description: "Error al intentar eliminar el Producto"})
    @ApiNotFoundResponse({description:"El producto que intenta eliminar no existe"})
    async deleteProduct(@Param("id", ParseUUIDPipe) id: string): Promise<string> {

        return ErrorManager ({
            functionTry: () => this.productsService.deleteProduct(id),  
            message: "Error al intentar eliminar el Producto"
        })
    }
}