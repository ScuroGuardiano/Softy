import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./entities/user.entity";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import PasswordService from "./password.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import LocalStrategy from "./local.strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '30m'
            }
        })],
    controllers: [AuthController],
    providers: [
        AuthService,
        PasswordService,
        LocalStrategy
    ]
})
export default class AuthModule {}