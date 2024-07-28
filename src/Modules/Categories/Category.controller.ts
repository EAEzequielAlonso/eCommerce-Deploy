import { Controller, Get, HttpCode, Post} from "@nestjs/common";
import { CategoryService } from "./Category.service";
import { ErrorManager } from "../../Utils/ErrorManager";
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Categories")
@Controller ("categories")
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @ApiOperation({ summary: 'Retorna todas las categorias de la base de datos'})
    @HttpCode(200)
    @ApiInternalServerErrorResponse({description: "Error al intentar mostrar las categorias"})
    @ApiNotFoundResponse({description:"No hay categorias en la base de datos"})
    async getCategories() {

        return ErrorManager ({
            functionTry:() => this.categoryService.getCategories(), 
            message: "Error al intentar mostrar las categorias"})
    }
    
    @Post("seeder")
    @ApiOperation({ summary: 'Realiza una recarga de las categorias'})
    @HttpCode(201)
    @ApiInternalServerErrorResponse({description: "Error al intentar realizar la precarga de Categorias"})
    async preloadCategoriesSeed (): Promise<string> {
        
        return ErrorManager ({
            functionTry: () => this.categoryService.preloadCategoriesSeed(), 
            message: "Error al intentar realizar la precarga de Categorias"})
    }
}