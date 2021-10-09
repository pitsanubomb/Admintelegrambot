import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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
}
