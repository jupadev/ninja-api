import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ninja {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  name: string;
  @Column()
  life: number;
  @Column({ length: 30 })
  weapon: string;
  @Column()
  level: string;
  @DeleteDateColumn()
  deletedAt: Date;
}
