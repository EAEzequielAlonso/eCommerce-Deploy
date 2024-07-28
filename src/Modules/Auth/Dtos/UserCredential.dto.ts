import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "../../Users/Dtos/CreateUser.dto";

export class userCredentialDto extends PickType(CreateUserDto, ["email", "password"]) {

}