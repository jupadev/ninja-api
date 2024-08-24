import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ninja } from 'src/ninjas/entities/ninja';

@Entity()
export class Weapon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  name: string;

  @OneToMany(() => Ninja, (ninja) => ninja.weapon)
  ninjas: Ninja[];

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
