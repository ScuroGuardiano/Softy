import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ImageTag } from "./imagetag.entity";

@Entity()
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    imageUrl: string;

    @Column({ default: false })
    encrypted: boolean;

    @ManyToMany(() => ImageTag)
    tags: ImageTag[];

    @Column({ length: 4096 })
    urlToSauce: string;

    @Column({ default: "uknown" })
    author: string;

    
}
