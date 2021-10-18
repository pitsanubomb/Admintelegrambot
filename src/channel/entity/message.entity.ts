import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Channel } from './channel.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  message: string;

  @ManyToOne(() => Channel, (channel) => channel.messages)
  channel: Channel;
}
