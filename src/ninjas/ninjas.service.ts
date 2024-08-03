import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateNinjaDto, UpdateNinjaDto } from './dto/createNinja.dto';

@Injectable()
export class NinjasService {
  private ninjas: CreateNinjaDto[] = [
    { id: 100, name: 'Kakuro', level: 'beginner', weapon: 'stars', life: 30 },
    {
      id: 101,
      name: 'Sukai',
      level: 'senior',
      weapon: 'nunchakus',
      life: 50,
    },
  ];

  getOne(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (ninja) {
      return ninja;
    }
    throw new NotFoundException('Ninja not found');
  }

  getAll() {
    return this.ninjas;
  }

  filterNinjas(filters: Partial<Pick<CreateNinjaDto, 'level' | 'name'>>) {
    if (filters.name) {
      const fileteredNinjas = this.ninjas.filter((ninja: CreateNinjaDto) => {
        return ninja.name.toLowerCase().includes(filters.name.toLowerCase());
      });
      return fileteredNinjas || [];
    }
    return this.ninjas;
  }

  createNinja(body: CreateNinjaDto) {
    const ninjaFound = this.ninjas.find((ninja) => ninja.id === body.id);
    if (ninjaFound) {
      throw new ConflictException('ninja already exits with this id');
    }
    this.ninjas.push(body);
    return body;
  }

  updateNinja(id: number, body: UpdateNinjaDto) {
    const foundNinja = this.getOne(id);
    if (foundNinja) {
      let newNinja;
      this.ninjas = this.ninjas.map((ninja) => {
        if (ninja.id !== id) {
          return ninja;
        }
        newNinja = { ...ninja, ...body };
        return newNinja;
      });
      return newNinja;
    }
  }

  deleteNinja(id: number) {
    const foundNinja = this.getOne(id);
    if (foundNinja) {
      this.ninjas = this.ninjas.filter((ninja) => {
        return ninja.id !== id;
      });
    }
    return `This ninja was deleted #${id}`;
  }
}
