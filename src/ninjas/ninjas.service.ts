import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNinjaDto, UpdateNinjaDto } from './dto/createNinja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ninja } from './entities/ninja';
import { Like, Repository } from 'typeorm';

@Injectable()
export class NinjasService {
  constructor(
    @InjectRepository(Ninja)
    private readonly ninjaRepository: Repository<Ninja>,
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

  async createNinja(body: CreateNinjaDto) {
    const newNinja = this.ninjaRepository.create(body);
    const savedNinja = await this.ninjaRepository.save(newNinja);
    return savedNinja;
  }

  async updateNinja(id: number, body: UpdateNinjaDto) {
    const updatedNinja = await this.ninjaRepository.save({ id, ...body });
    return updatedNinja;
  }

  async deleteNinja(id: number) {
    const deletedNinja = await this.ninjaRepository.softDelete(id);
    if (deletedNinja.affected === 1) {
      return `This ninja was deleted #${id}`;
    }
    throw new NotFoundException(`Ninja not found #${id}`);
  }
}
