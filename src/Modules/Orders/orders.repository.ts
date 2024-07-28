import { Injectable } from "@nestjs/common";
import { Order } from "./Entities/Order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()  
export class OrderRepository {
    
    constructor (@InjectRepository(Order) private orderRepository: Repository<Order>) {}

    async getOrders(): Promise<Order[]> {
        return await this.orderRepository.find({
            relations: {
                orderDetails: {products: true}
        }});
    }

    async save(order: Partial<Order>): Promise<Order> {
        return await this.orderRepository.save(order);
    }

    async getOrderById(orderId: string): Promise<Order> {
        return await this.orderRepository.findOne ({
            relations: {
                orderDetails: {products: true}
            },
            where: {
                id: orderId
            }
        }) 
    }

    async getOrderCreateById(orderId: string): Promise<Order> {
        return await this.orderRepository.findOne({
            relations: {
                orderDetails: true
            },
            where: {
                id: orderId
            }
        })
    }

}