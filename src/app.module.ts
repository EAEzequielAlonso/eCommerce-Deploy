import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductsModule } from './Modules/Products/Products.module';
import { AuthModule } from './Modules/Auth/Auth.module';
import { UserModule } from './Modules/Users/Users.module';
import { UserDataMiddleware } from './Modules/Users/Middlewares/user.middleware';
import { AuthMiddleware } from './Modules/Auth/Middlewares/auth.middleware';
import { ProductDataMiddleware } from './Modules/Products/Middlewares/Product.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from "./config/typeorm"
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './Modules/Categories/Category.module';
import { OrdersModule } from './Modules/Orders/orders.module';
import { FilesModule } from './Modules/files/files.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
      // entender bien que pasa aca.
      ConfigModule.forRoot({
         isGlobal: true,
         load: [typeOrmConfig]
         }),
      // y aca tambien entender bien que estoy haciendo
      TypeOrmModule.forRootAsync({ 
         inject:[ConfigService],
         useFactory: (configService: ConfigService) => configService.get("typeorm"), 
         }),

      // modulo para generar los token
      JwtModule.register({
        global: true,
        signOptions: {expiresIn : "1h"},
        secret: process.env.JWT_SECRET,
      }),
      ProductsModule, AuthModule, UserModule, CategoryModule, OrdersModule, FilesModule,
      ],
  controllers: [],
  providers: [],
})
export class AppModule {
 /* configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserDataMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/:id', method: RequestMethod.PUT}
      )
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: "auth/singn", method: RequestMethod.POST})
    consumer
      .apply(ProductDataMiddleware)
      .forRoutes(
        { path: 'products', method: RequestMethod.POST },
        { path: 'products/:id', method: RequestMethod.PUT}
      )
  }*/
}
