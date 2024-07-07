import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/createNinja.dto';

@Injectable()
export class NinjasService {
  private ninjas: CreateNinjaDto[] = [
    { name: 'Kakuro', level: 'beginner', weapon: 'stars', life: 30 },
    { name: 'Sukai', level: 'senior', weapon: 'nunchakus', life: 50 },
  ];

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
}
