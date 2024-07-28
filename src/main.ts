import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './Middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersService } from './Modules/Users/Users.service';
import { ProductsService } from './Modules/Products/Products.service';
import { CategoryService } from './Modules/Categories/Category.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    // whitelist hace que solo se admitan las propiedades del DTO y ninguna adicional.
    whitelist:true,
    // setea la forma en la que voy a mostrar los errores de los DTO
    exceptionFactory: (errors) => {
      const cleanErrors = errors.map (error => {
        return {property: error.property, constraints: error.constraints}
      })
      return new BadRequestException ({
        alert: "Estos son los errores encontrados",
        errors: cleanErrors
      })
    }
  }))

  // registra en consola las llamadas a las rutas del servidor
  app.use(loggerGlobal);

  await app.get(UsersService).preloadUsersSeed()
  
  await app.get(CategoryService).preloadCategoriesSeed()

  await app.get(ProductsService).preloadProductsSeed()

  //genero el Document Builder donde preconfiguro los datos basicos 
  const swaggerConfig = new DocumentBuilder()
        .setTitle("Backend eCommerce")
        .setDescription("Esta es una API constuida para desarrollar un eCommerce de manera sencilla")
        .addBearerAuth({
          type: "http",
          description: "Ingresa tu Token de seguridad",
        }, "Autenticacion por Token - JWT")
        .setVersion("1.0")
        .build()
      
  //creo el documento. le asigno la ruta "api" 
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("api", app, document)

  await app.listen(3001);
}
bootstrap();













// https://github.com/HX-ARomero/pt19-m4-demo
