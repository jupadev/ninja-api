import { Weapon } from 'src/weapons/entities/weapon.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
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

  @Column()
  level: string;

  @ManyToOne(() => Weapon, (weapon) => weapon.id, {
    eager: true, // to include data in findOne
  })
  weapon: Weapon;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
