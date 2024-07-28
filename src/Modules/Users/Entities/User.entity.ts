import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Order } from "../../Orders/Entities/Order.entity";

@Entity({name: "users"})
export class User {
    
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({length:50, nullable:false})
    name: string

    @Column({length:50, nullable:false, unique:true})
    email: string
 
    @Column({nullable:false})
    password: string 

    @Column({default: false})
    isAdmin: boolean

    @Column("int")
    phone: number 

    @Column({length:50})
    country: string

    @Column()
    address: string

    @Column({length:50})
    city: string

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

}