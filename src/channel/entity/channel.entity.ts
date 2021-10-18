import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Index()
  @Column({ type: 'bigint' })
  id: number;

  @Index()
  @Column()
  title: string;

  @OneToMany(() => Message, (message) => message.channel, {
    cascade: true,
    eager: true,
  })
  messages: Message[];
}
