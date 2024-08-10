import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { CreateWeaponDto } from './dto/create-weapon.dto';

@Controller('weapons')
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Post()
  create(@Body() createWeaponDto: CreateWeaponDto) {
    return this.weaponsService.create(createWeaponDto);
  }

  @Get()
  findAll() {
    return this.weaponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weaponsService.findOne(+id);
  }
}
