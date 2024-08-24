import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNinjaDto, UpdateNinjaDto } from './dto/createNinja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ninja } from './entities/ninja';
import { Like, Repository } from 'typeorm';
import { Weapon } from 'src/weapons/entities/weapon.entity';

@Injectable()
export class NinjasService {
  constructor(
    @InjectRepository(Ninja)
    private readonly ninjaRepository: Repository<Ninja>,
    @InjectRepository(Weapon)
    private readonly weaponRepository: Repository<Weapon>,
  ) {}

  async getOne(id: number) {
    const ninja = await this.ninjaRepository.findOneBy({ id });
    if (!ninja) {
      throw new NotFoundException('Ninja not found');
    }

    return ninja;
  }

  async getAll() {
    return await this.ninjaRepository.find();
  }

  async searchNinjas(filters: Partial<Pick<CreateNinjaDto, 'name'>>) {
    if (filters.name) {
      const fileteredNinjas = await this.ninjaRepository.findBy({
        name: Like(`%${filters.name}%`),
      });
      return fileteredNinjas;
    }
    return this.getAll();
  }

  async createNinja(payload: CreateNinjaDto) {
    const weapon = await this.validateWeapon(payload.weapon);
    const newNinja = this.ninjaRepository.create({
      ...payload,
      weapon,
    });
    const savedNinja = await this.ninjaRepository.save(newNinja);
    return savedNinja;
  }

  async updateNinja(id: number, body: UpdateNinjaDto) {
    const newValues = {
      ...body,
      weapon: body.weapon ? await this.validateWeapon(body.weapon) : undefined,
    };
    const updatedNinja = await this.ninjaRepository.save({ id, ...newValues });
    return updatedNinja;
  }

  async deleteNinja(id: number) {
    const deletedNinja = await this.ninjaRepository.softDelete(id);
    if (deletedNinja.affected === 1) {
      return `This ninja was deleted #${id}`;
    }
    throw new NotFoundException(`Ninja not found #${id}`);
  }

  private async validateWeapon(name: string) {
    const breedEntity = await this.weaponRepository.findOneBy({ name });

    if (!breedEntity) {
      throw new BadRequestException('Weapon not found');
    }

    return breedEntity;
  }
}
