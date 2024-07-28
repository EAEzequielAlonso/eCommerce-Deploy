import { Test } from '@nestjs/testing';
import { UsersService } from '../Users.service';
import { UsersRepository } from '../User.repository';
import { User } from '../Entities/User.entity';
import {v4 as uuid} from "uuid"

describe ("userService", () => {

    let userService : UsersService;
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
            getUsers: (page, limit) => Promise.resolve(undefined),
            createUser: (user: Omit<User, "id">) => Promise.resolve(undefined),
            deleteUser: ()=> Promise.resolve(undefined)
        };

        const module = await Test.createTestingModule({
            providers: [UsersService, 
                { provide: UsersRepository, useValue: mockUserRepository}
            ],
        }).compile();
    
        userService = module.get<UsersService>(UsersService);
    })

    it ("Crea una instancia de UserService", async ()=> {
        expect (userService).toBeDefined();
    });

    it ("Crea correctamente un usuario", async ()=> {
        mockUserRepository.createUser= (user: Omit<User, "id">) => Promise.resolve({mockUUID, ...mockUser})
        const responseCreate = await userService.createUser(mockUser)
        // regex para UUID valido
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;        
        expect (responseCreate).toBeDefined();
        expect (regex.test(responseCreate)).toBe(true); // debe responder un UUID valido
    });

    it ("No puede cargar el usuario y da el siguiente error: 'Error al intentar Crear el Usuario'", async ()=> {
        try {
            const responseCreate = await userService.createUser(new User())
        } catch (e) {
            expect (e.message).toBe("Error al intentar Crear el Usuario");
        }
    });

    it ("Debe retornar un array con dos usuarios", async ()=> {
        mockUserRepository.getUsers= (page: 1, limit: 2) => Promise.resolve([{mockUUID, ...mockUser}, {mockUUID, ...mockUser, email:"ezequiel@gmail.com"}])
        const responseCreate = await userService.getUsers(1,2);   

        expect (responseCreate).toBeDefined();
        expect (responseCreate.length).toBe(2);
    });

    it ("al no haber usuarios en la BD debe dar el error: 'No hay usuarios en la Base de Datos'", async ()=> {
        mockUserRepository.getUsers= (page: 1, limit: 2) => Promise.resolve([])
        try {
            const responseCreate = await userService.getUsers(1,2)
        } catch (e) {
            expect (e.message).toBe("No hay usuarios en la Base de Datos");
        }
    });
 })
