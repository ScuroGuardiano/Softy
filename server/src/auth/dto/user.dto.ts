import User from "../entities/user.entity";

export default class UserDto {

    public username: string;
    public email: string;
    public permissionLevel: string;

    public static fromEntity(user: User): UserDto {
        const userDto = new UserDto();

        userDto.username = user.username;
        userDto.email = user.email;
        userDto.permissionLevel = user.permissionLevel;

        return userDto;
    }

}