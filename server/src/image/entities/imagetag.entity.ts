import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Image } from "./image.entity";

@Entity()
export class ImageTag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    tag: string;

    @Column({ default: 'general' })
    tagType: string;

    @ManyToMany(() => Image)
    images: Image[]
}
