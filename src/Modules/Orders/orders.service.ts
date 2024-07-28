import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import { CreateOrderDto } from './Dtos/CreateOrder.dto';
import { Order } from './Entities/Order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Users/Entities/User.entity';
import { Product } from '../Products/Entities/Product.entity';
import { OrderDetail } from './Entities/OrderDetail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

    constructor (
        private readonly ordersRepository: OrderRepository,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail> ) {}

    async getOrders(): Promise<Order[]> {
        const orders: Order[] = await this.ordersRepository.getOrders();
        if (orders.length>0) return orders;
        else throw new NotFoundException("No hay Ordenes en la Base de Datos")
    }

    async getOrderById(id: string): Promise<Order> {
        const order: Order = await this.ordersRepository.getOrderById(id);
        if (order) return order;
        else throw new NotFoundException("La orden buscada no existe")

    }    

    async addOrder(order: CreateOrderDto): Promise<Order | string> {
        const userFinded:User = await this.userRepository.findOneBy({id : order.userId})
        if (userFinded) {
            let productsList: Product[] = [];
            let totalOrder: number = 0;
            for (let product of order.products) {
                const productFinded: Product = await this.productRepository.findOneBy({id:product.id})
                if (productFinded) {
                    if (productFinded.stock > 0) {
                        productsList.push(productFinded);
                        productFinded.stock = productFinded.stock-1;
                        totalOrder = totalOrder + Number(productFinded.price);
                        await this.productRepository.save( productFinded );
                    }
                } 
            }
            if (productsList) {
                const saveOrderDitail: OrderDetail = await this.orderDetailRepository.save({price:totalOrder, products:productsList});
                const orderCreated: Partial<Order> = {user: userFinded, date: new Date(), orderDetails:saveOrderDitail}
                const saveOrder = await this.ordersRepository.save(orderCreated);
                const OrderReturn:Order = await this.ordersRepository.getOrderCreateById(saveOrder.id)
                return OrderReturn;
            } else {
                throw new NotFoundException("Productos inexistentes o sin Stock");
            }
        } else {throw new NotFoundException("Usuario Inexistente")}
    } 
}
