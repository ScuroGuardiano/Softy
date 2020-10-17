import { Controller, Post, Request, Body, HttpException, HttpStatus } from "@nestjs/common";
import { IRegisterSchema, registerSchema } from "./request-schemas/register.schema";
import AuthService from "./auth.service";
import UserDto from "./dto/user.dto";

@Controller('auth')
export default class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    public async loginUser() {
        
    }

    @Post('/register')
    public async registerUser(@Body() body: IRegisterSchema) {
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