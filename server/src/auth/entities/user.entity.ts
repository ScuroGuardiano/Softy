import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    permissionLevel: string;
}