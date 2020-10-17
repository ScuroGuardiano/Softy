import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./entities/user.entity";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import PasswordService from "./password.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService, PasswordService]
})
export default class AuthModule {}