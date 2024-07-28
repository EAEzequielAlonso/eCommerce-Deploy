import { Module} from "@nestjs/common"; 
import { UsersService } from "./Users.service";
import { UsersController } from "./Users.controller";
import { UsersRepository } from "./User.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./Entities/User.entity";

@Module ({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, UsersRepository],
    controllers: [UsersController] 
})
export class UserModule{

} 