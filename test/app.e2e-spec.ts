import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get /users/ retorna un error de autenticacion', async () => {
    const req = await request (app.getHttpServer()).get("/users");

    expect(req.status).toBe(401);
    expect (req.body.error).toBe("Bearer token no encontrado");
    expect (req.body).toBeInstanceOf(Object);

  });

  it('Get /products/ retorna un estado OK y un tipo Array', async () => {
    const req = await request (app.getHttpServer()).get("/products");

    expect(req.status).toBe(200);
    expect (req.body).toBeInstanceOf(Array);

  });

  it('Get /products/:id retorna un mensaje con un notFound', async () => {
    const req = await request (app.getHttpServer()).get("/products/cad95d9d-9139-4212-811a-139ce41271f6");

    expect(req.body.status).toBe(404);
    expect (req.body.error).toBe("Producto inexistente");
    expect (req.body).toBeInstanceOf(Object);
  });

  it('get /categories retorna un OK y un array', async () => {
    const req = await request (app.getHttpServer()).get("/categories");

    expect(req.status).toBe(200);
    expect (req.body).toBeInstanceOf(Array);

  });

  it('get /orders retorna un OK y un array', async () => {
    const req = await request (app.getHttpServer()).get("/orders");

    expect(req.status).toBe(200);
    expect (req.body).toBeInstanceOf(Array);

  });
});
