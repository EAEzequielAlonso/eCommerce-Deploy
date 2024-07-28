import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid"
import { Category } from "../../Categories/entites/Category.entity";
import { OrderDetail } from "../../Orders/Entities/OrderDetail.entity";

@Entity({name: "products"})
export class Product {
    
    @PrimaryGeneratedColumn("uuid")
    id: string = uuid()

    @Column({length:50, nullable:false})
    name: string

    @Column({length:50, nullable:false})
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number

    @Column({nullable:false})
    stock: number

    @Column({default: 'https://static.vecteezy.com/system/resources/previews/006/411/071/non_2x/physical-testing-black-glyph-icon-visual-appearance-analysis-defect-detection-product-weighing-and-measuring-procedure-silhouette-symbol-on-white-space-isolated-illustration-vector.jpg' })
    imgUrl: string
    
    @ManyToOne(() => Category, (category) => category.products)
    category: Category

    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
    orderDetails: OrderDetail[];

} 