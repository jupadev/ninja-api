import { Injectable } from '@nestjs/common';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { Repository } from 'typeorm';
import { Weapon } from './entities/weapon.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WeaponsService {
  constructor(
    @InjectRepository(Weapon)
    private readonly weaponRepository: Repository<Weapon>,
  ) {}

  async create(createWeaponDto: CreateWeaponDto) {
    const newWeapon = this.weaponRepository.create(createWeaponDto);
    return await this.weaponRepository.save(newWeapon);
  }

  async findAll() {
    return await this.weaponRepository.find();
  }

  async findOne(id: number) {
    return await this.weaponRepository.findOneBy({ id });
  }
}
