import { Module} from "@nestjs/common"; 
import { AuthService } from "./Auth.service";
import { AuthController } from "./Auth.controller";
import { UsersRepository } from "../Users/User.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../Users/Entities/User.entity";

@Module ({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService, UsersRepository],
    controllers: [AuthController]
})
export class AuthModule{ 

}