import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, OneToMany } from "typeorm";
import {v4 as uuid} from "uuid"
import { Product } from "../../Products/Entities/Product.entity";

@Entity({name:"categories"})
export class Category {
    
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({length:50, nullable:false})
    name: string
 
    //@OneToOne(() => Product)
    //@JoinColumn() 
    //product: Product

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}