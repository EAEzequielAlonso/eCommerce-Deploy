import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './Dtos/CreateOrder.dto';
import { Order } from './Entities/Order.entity';
import { AuthGuard } from '../Auth/Guards/Auth.guard';
import { ErrorManager } from '../../Utils/ErrorManager';
import { ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags("Orders")
@Controller('orders') 
export class OrdersController {
    constructor (private readonly ordersService: OrdersService) {}

    @Get()
    @ApiOperation({ summary: 'Retorna todas las ordenes de la base de datos'})
    @ApiInternalServerErrorResponse({description: "Error al intentar mostrar las ordenes"})
    @ApiNotFoundResponse({description:"No hay Ordenes en la Base de Datos"})
    async getOrders (): Promise<Order[]> {
        return ErrorManager ({
            functionTry:() => this.ordersService.getOrders(),
            message: "Error al intentar mostrar las ordenes"
        }) 
    }
    
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retorna la orden correspondiente al Id ingresado'})
    @ApiInternalServerErrorResponse({description: "Error al intentar mostrar la orden"})
    @ApiNotFoundResponse({description:"La orden buscada no existe"})
    @ApiUnauthorizedResponse({description: "Si no se envia el token: 'No se ha encontrado el Bearer token' // Si el token no es valido: 'El Token es Invalido'"})
    @Get(":id")
    @UseGuards(AuthGuard)
    async getOrderById (@Param("id", ParseUUIDPipe) id:string): Promise<Order> {

        return ErrorManager ({
            functionTry:() => this.ordersService.getOrderById(id), 
            message: "Error al intentar mostrar la orden"
        }) 
    }
    
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Crea una nueva orden a nombre de Usuario ingresado por ID con los productos ingresados por ID'})
    @ApiBody({description:"ingrese el ID de usuario y los IDs de los productos correspondientes", type: CreateOrderDto})
    @Post()
    @UseGuards(AuthGuard)
    @ApiInternalServerErrorResponse({description: "Error al intentar crear la orden"})
    @ApiNotFoundResponse({description:"Si el producto no existe o no hay stock: 'Productos inexistentes o sin Stock' / Si el usuario no existe: 'Usuario Inexistente'"})
    @ApiUnauthorizedResponse({description: "Si no se envia el token: 'No se ha encontrado el Bearer token' // Si el token no es valido: 'El Token es Invalido'"})
    async addOrder (@Body() order: CreateOrderDto): Promise<Order | string> {
        
        return ErrorManager ({
            functionTry: () => this.ordersService.addOrder(order),
             message:"Error al intentar crear la orden"
            }) 
    } 
}
