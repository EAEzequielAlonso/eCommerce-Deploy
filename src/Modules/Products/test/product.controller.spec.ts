import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "../Products.controller";
import { Product } from "../Entities/Product.entity";
import { ProductsService } from "../Products.service"; 
import { v4 as uuid} from "uuid"
import { JwtService } from "@nestjs/jwt";

describe ("productController", ()=> {

    let productController:ProductsController;
    let mockProductService: Partial<ProductsService>;
    let mockJwtService: Partial<JwtService>;

    const mockProduct = new Product()
    mockProduct.name= "Compu Genial"
    mockProduct.description= "este es una compu genial"
    mockProduct.price= 100
    mockProduct.stock= 3
    //'https://static.vecteezy.com/system/resources/previews/006/411/071/non_2x/physical-testing-black-glyph-icon-visual-appearance-analysis-defect-detection-product-weighing-and-measuring-procedure-silhouette-symbol-on-white-space-isolated-illustration-vector.jpg' })
    mockProduct.imgUrl= "http://quiensabe"

    const mockUUID = uuid()
    beforeEach (async () => {
        
        mockProductService = {
            getProducts: (page:number, limit:number) => Promise.resolve(undefined),
            getProductById: (id: string) => Promise.resolve({...mockProduct, id: uuid()} as Product),
            updateProduct: (id: string, product: Partial<Product>) => Promise.resolve (uuid()),
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                { provide: JwtService, useValue: mockJwtService},
                {provide: ProductsService, useValue: mockProductService},
            ],
        }).compile()

        productController = module.get<ProductsController>(ProductsController)
    } )

    it ("productController esta definida", () => {
        expect(productController).toBeDefined()
    })

    it ("getProducts() debe retornar un array de productos", async () => {
        mockProductService.getProducts= () => Promise.resolve([{...mockProduct, id: mockUUID} as Product])
        let products = await productController.getProducts(1,2);
        const dataProduct = products[0];
        expect(products.length).toBe(1)
        expect(dataProduct.name).toBe(mockProduct.name)
        expect(dataProduct.description).toBe(mockProduct.description)
        expect(dataProduct.price).toBe(mockProduct.price)
    })

    it ("getProducts() debe retornar un error con el mensaje 'No hay productos en la Base de Datos'", async () => {
        try {
        mockProductService.getProducts= () => Promise.resolve([])
        const products = await productController.getProducts(1,2);
        } catch (e) {
            expect(e.message).toBe("No hay productos en la Base de Datos")
        }
    })
})