import { Controller, Post, Request, Body, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { IRegisterSchema, registerSchema } from "./request-schemas/register.schema";
import AuthService from "./auth.service";
import UserDto from "./dto/user.dto";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller('auth')
export default class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    public async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('/register')
    public async register(@Body() body: IRegisterSchema) {
        try {
            await registerSchema.validateAsync(body);
            const user = await this.authService.registerUser(body);
            if (!user) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }
            
            return UserDto.fromEntity(user);
        }
        catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
}