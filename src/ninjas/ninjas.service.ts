import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateNinjaDto, UpdateNinjaDto } from './dto/createNinja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ninja } from './entities/ninja';
import { Repository } from 'typeorm';
import { Weapon } from 'src/weapons/entities/weapon.entity';
import { ActiveUserInterface } from 'src/common/types';
import { Role } from 'src/auth/types';

@Injectable()
export class NinjasService {
  constructor(
    @InjectRepository(Ninja)
    private readonly ninjaRepository: Repository<Ninja>,
    @InjectRepository(Weapon)
    private readonly weaponRepository: Repository<Weapon>,
  ) {}

  async getOne(id: number, user: ActiveUserInterface) {
    const ninja = await this.ninjaRepository.findOneBy({
      id,
    });
    if (!ninja) {
      throw new NotFoundException('Ninja not found');
    }

    this.validateOwnership(ninja, user);

    return ninja;
  }

  private validateOwnership(ninja: Ninja, user: ActiveUserInterface) {
    if (user.role !== Role.ADMIN && ninja.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }

  async getAll(user: ActiveUserInterface) {
    // console.log('getAll', user);
    // return [];
    return user.role === Role.ADMIN
      ? await this.ninjaRepository.find()
      : await this.ninjaRepository.find({
          where: { userEmail: user.email },
        });
  }

  async createNinja(payload: CreateNinjaDto, user: ActiveUserInterface) {
    const weapon = await this.validateWeapon(payload.weapon);
    const newNinja = this.ninjaRepository.create({
      ...payload,
      weapon,
      userEmail: user.email,
    });
    const savedNinja = await this.ninjaRepository.save(newNinja);
    return savedNinja;
  }

  async updateNinja(
    id: number,
    body: UpdateNinjaDto,
    user: ActiveUserInterface,
  ) {
    await this.getOne(id, user);

    const updatedNinja = await this.ninjaRepository.save({
      id,
      ...{
        ...body,
        weapon: body.weapon
          ? await this.validateWeapon(body.weapon)
          : undefined,
        userEmail: user.email,
      },
    });
    return updatedNinja;
  }

  async deleteNinja(id: number, user: ActiveUserInterface) {
    await this.getOne(id, user);
    const deletedNinja = await this.ninjaRepository.softDelete(id);
    if (deletedNinja.affected === 1) {
      return `This ninja was deleted #${id}`;
    }
    throw new NotFoundException(`Something went wrong deleting #${id}`);
  }

  private async validateWeapon(name: string) {
    const weaponEntity = await this.weaponRepository.findOneBy({ name });

    if (!weaponEntity) {
      throw new BadRequestException('Weapon not found');
    }

    return weaponEntity;
  }
}
