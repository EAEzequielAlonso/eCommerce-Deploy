import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "../Users/Entities/User.entity";
import { CreateUserDto } from "../Users/Dtos/CreateUser.dto";
import { userCredentialDto } from "./Dtos/UserCredential.dto";
import { UsersRepository } from "../Users/User.repository";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"
import { Role } from "../Users/Roles/roles.enum";

@Injectable () 
export class AuthService {

    constructor (private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService) {}

    async signin(userLogin: userCredentialDto): Promise<Omit<User, "password" | "isAdmin"> & {token: string}> {
        const userDB: User = await this.usersRepository.getUserByEmail(userLogin.email)
        if (!userDB) {
            throw new BadRequestException ("Usuario o Clave incorrectos")
        }
        const isPasswordValid= await bcrypt.compare(userLogin.password, userDB.password)
        if (!isPasswordValid) {
            throw new BadRequestException ("Usuario o Clave incorrectos")
        }

        const userPayload = {
            sub: userDB.id, //se suscribe a este user WT
            id: userDB.id,
            email: userDB.email,
            roles: [userDB.isAdmin ? Role.Admin : Role.User] 
        }
        const token = this.jwtService.sign(userPayload)
        const {password,isAdmin,  ...sendUser} = userDB
        return {...sendUser, token: token}
    }

    async signup(user: CreateUserDto): Promise<Omit<User, "password">> {
        const userDB = await this.usersRepository.getUserByEmail(user.email)
        if (userDB) throw new BadRequestException("El usuario ya existe");
        if (user.password !== user.passwordConfirm) throw new BadRequestException("La contraseña y su confirmacion no cohinciden")
        const passwordHash= await bcrypt.hash(user.password,10)
        const {passwordConfirm, ...createUser} = user
        const userSave = await this.usersRepository.createUser({...createUser, password: passwordHash});
        const {password, ...sendUser} = userSave;
        return sendUser;
    }
}