import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./entities/user.entity";
import { Repository, Connection } from "typeorm";
import { IRegisterSchema } from "./request-schemas/register.schema";
import PasswordService from "./password.service";
import { ILoginSchema } from "./request-schemas/login.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class AuthService {
    @InjectRepository(User)
    private userRepository: Repository<User>;

    public constructor(
        private passwordService: PasswordService,
        private jwtService: JwtService
    ) {}

    public async registerUser(userData: IRegisterSchema): Promise<User> {
        if (await this.checkIfUserCanBeCreated(userData)) {
            const user = new User();
            
            user.email = userData.email.toLowerCase();
            user.username = userData.username;
            user.password = await this.passwordService.hashPassword(userData.password);
            await this.setPermissionLevel(user);
            console.log(user.permissionLevel);

            return this.userRepository.save(user);
        }
        
        return null;
    }

    public async validateUser(userData: ILoginSchema): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { username: userData.username }
        });
        
        if (await this.passwordService.verifyPassword(userData.password, user.password)) {
            return user;
        }
        
        return null;
    }

    public async login(user: User) {
        const payload = { username: user.username, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
    
    /**
     * Will check if user name or email is not already in use
     * @param userData 
     */
    private async checkIfUserCanBeCreated(userData: IRegisterSchema): Promise<boolean> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('LOWER(user.username) = :username', { username: userData.username.toLowerCase() })
            .orWhere('user.email = :email', { email: userData.email.toLowerCase() })
            .getOne();
        
        return !user;
    }

    /**
     * Will set appropriate permission level on fresh created, yet not saved user.
     * 
     * If it's first user ever created this user will get ADMIN level,
     * any other user will get standard USER permission level
     * 
     * @param user user entity to set permissions on
     */
    private async setPermissionLevel(user: User) {
        if (!(await this.isAnyUserInDatabase())) {
            return user.permissionLevel = 'ADMIN';
        }
        user.permissionLevel = 'USER';
    }
    private async isAnyUserInDatabase(): Promise<boolean> {
        return (await this.userRepository.count()) > 0;
    }
}