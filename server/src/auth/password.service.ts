import { Injectable } from "@nestjs/common";
import bcrypt = require('bcrypt');


@Injectable()
export default class PasswordService {
    public async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    public async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
