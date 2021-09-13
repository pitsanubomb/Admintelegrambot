import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Telegramgroup {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Index()
  @Column()
  id: number;

  @Index()
  @Column()
  groupname: string;

  @Column()
  grouptype: string;

  @Column()
  isAdminmember: boolean;
}
