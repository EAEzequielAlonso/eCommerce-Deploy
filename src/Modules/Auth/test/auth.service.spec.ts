import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { User } from '../../Users/Entities/User.entity';
import { UsersRepository } from '../../Users/User.repository';
import { AuthService } from '../auth.service';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
import {v4 as uuid} from "uuid"

describe ("authService", () => {

    let authService : AuthService;
    let mockUserRepository : Partial<UsersRepository>
    const mockUUID = uuid();
    const mockUser = new User()
    mockUser.name = "Ezequiel",
    mockUser.password= "123456",
    mockUser.email= "eze@gmail.com",
    mockUser.phone= 1168776655,
    mockUser.address= "33 756",
    mockUser.isAdmin= false,
    mockUser.city= "Buenos Aires",
    mockUser.country="Argentina",

    beforeEach (async () => {
        mockUserRepository = {
            getUserByEmail: () => Promise.resolve(undefined),
            createUser: (user: Omit<User, "id">): Promise<User> => 
              Promise.resolve({
                ...user,
                id: mockUUID,
              })
        };

        const mockJwtService = {
            sign: (payload) => jwt.sign (payload, "testSecret")
        }
        const module = await Test.createTestingModule({
            providers: [AuthService, 
                { provide: JwtService, useValue: mockJwtService}, 
                { provide: UsersRepository, useValue: mockUserRepository}
            ],
        }).compile();
    
        authService = module.get<AuthService>(AuthService);
    })

    it ("Crea una instancia de AuthService", async ()=> {
        expect (authService).toBeDefined();
    });

    it ("Singup: Create an instance of Usuario", async ()=> {
        const user = await authService.signup({...mockUser, passwordConfirm: "123456"})

        mockUser.id = user.id;
        const {password, ...resultMockUser} = mockUser;

        expect (user).toBeDefined();
        expect (user).toEqual(resultMockUser);
    });

    it ("signUp: si el usuario ya fue creado debe tirar un error" , async () => {
        mockUserRepository.getUserByEmail = (email:string) =>
            Promise.resolve(mockUser as User) 
        try {
            await authService.signup({...mockUser, passwordConfirm: "123456" })
        } catch (e) {
            expect(e.message).toEqual("El usuario ya existe")
        }
    })

    it ("signUp: si elpassword y su confirmacion son diferentes debe tirar un error" , async () => {
        try {
            await authService.signup({...mockUser, passwordConfirm: "passdiferente" })
        } catch (e) {
            expect(e.message).toEqual("La contraseña y su confirmacion no cohinciden")
        }
    })

    it ("signIn: retorna un error si el password es invalido", async () => {
        mockUserRepository.getUserByEmail = (email:string) => Promise.resolve(mockUser as User)
        try {
            await authService.signin({email: mockUser.email, password:"Invalid Password"})
        } catch (e) {
            expect(e.message).toEqual("Usuario o Clave incorrectos")
        }
    })

    it ("signIn: retorna un error if el usuario no existe", async () => {
        try {
            await authService.signin({email: "mockUser@email.com", password:mockUser.password})
        } catch (e) {
            expect(e.message).toEqual("Usuario o Clave incorrectos")
        }
    })

     it ("signin: test que depende del JwtService", async () => {
         const mockUserVariant= {
            ...mockUser,
             password: await bcrypt.hash(mockUser.password, 10),
         }
         mockUserRepository.getUserByEmail= (email:string) => Promise.resolve(mockUserVariant as User)
         const response = await authService.signin({email: mockUser.email, password:mockUser.password});

         expect (response).toBeDefined();
         expect (response.token).toBeDefined();

     })
 })


