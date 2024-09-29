import { User } from 'src/users/entities/user.entity';
import { Weapon } from 'src/weapons/entities/weapon.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Ninjas' })
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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;

  @Column()
  userEmail: string;

  @DeleteDateColumn({ select: false })
  deletedAt: Date;
}
