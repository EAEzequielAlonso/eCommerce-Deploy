import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./User.repository";
import { User } from "./Entities/User.entity";
import preloadUsers from "../../Preload/usersData.json"
import * as bcrypt from "bcrypt"

@Injectable ()
export class UsersService {
        
    constructor (private readonly usersRepository: UsersRepository){}

    async preloadUsersSeed(): Promise<string> {
       let cont:number = 0;
        for (const user of preloadUsers) {
            const userExist = await this.usersRepository.getUserByEmail(user.email);
            if (!userExist) {
                const passwordHash= await bcrypt.hash(user.password,10)
                await this.usersRepository.createUser({...user, password: passwordHash})
                cont++;
            }
        }
        let response:string;
        if (cont === 0 ) response = `No se Cargó ningun usuario nuevo`;
        else if (cont === 1 ) response = `Se Cargó 1 usuario nuevo`;
        else if (cont > 1 ) response = `Se Cargaron ${cont} usuarios nuevos`;
        console.log(response)
        return response
    }

    async getUsers(page:number, limit: number): Promise<User[]> {
        const users: User[] = await this.usersRepository.getUsers(page, limit);
        if (users.length>0) return users;
        else throw new NotFoundException("No hay usuarios en la Base de Datos")
    }

    async getUserById(id:string): Promise<User> {
        const userFinded:User = await this.usersRepository.getUserById(id);
        if (userFinded) return  userFinded;
        else throw new NotFoundException("El usuario buscado no Existe")
    }

    async createUser(user: Partial<User>): Promise<string> {
        const newUser:User = await this.usersRepository.createUser(user);
        if (newUser) 
            return newUser.id;
        else throw new InternalServerErrorException("Error al intentar Crear el Usuario")
    }

    async deleteUser(id: string): Promise<string> {
        const userDelete = await this.usersRepository.deleteUser(id);
        if (userDelete.affected===1)
            return id;
        else throw new NotFoundException("El usuario a eliminar no Existe")
    }

    async updateUser(id: string, user: Partial<User>): Promise<string> {
        const userUpdate = await this.usersRepository.updateUser(id, user);
        if (userUpdate.affected===1)
            return id;
        else throw new NotFoundException("El usuario que intenta actualizar no Existe")
    }
}