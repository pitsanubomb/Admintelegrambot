import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Channel } from './channel.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ type: 'bigint', nullable: true })
  mid: number;

  @Column()
  message: string;

  @Column({nullable: true})
  file: string;


  @ManyToOne(() => Channel, (channel) => channel.messages)
  channel: Channel;
}
