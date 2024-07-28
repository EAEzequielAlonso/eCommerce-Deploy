import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./Entities/User.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class UsersRepository {

    constructor (@InjectRepository(User) private userRepository: Repository<User>) {}

    async getUsers(page: number, limit:number): Promise<User[]> {
        // devuelve todos los datos menos el password
        return await this.userRepository.find({
            select: ["id", "name", "email", "isAdmin", "phone", "address", "country", "city", "orders"],
            skip: (page-1)*limit,
            take: limit
        })
    }

    async getUserById(id: string): Promise<User> {
        // devuelve todos los datos menos el password y el isAdmin
        return await this.userRepository.findOne({
            select: ["id", "name", "email", "phone", "address", "country", "city", "orders"],
            where : {id},
            relations: {orders: true}
        }); 
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where : {email}
        }); 
    }

    async createUser(user: Partial<User>):Promise<User> {
        return await this.userRepository.save(user);
    }

    async updateUser(id: string, user: Partial<User>): Promise<UpdateResult> {
        return await this.userRepository.update(id, user)
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        return await this.userRepository.delete(id)
    }
}