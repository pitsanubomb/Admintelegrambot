import { Column, Entity,  Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Telegramuser {
    @PrimaryGeneratedColumn('uuid')
    uid:string;

    @Index()
    @Column()
    id:Number;

    @Index()
    @Column()
    username:string;

    @Index()
    @Column()
    firstname:string;

    @Column()
    isBot:boolean;
}