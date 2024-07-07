import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateNinjaDto } from './dto/createNinja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}

  @Get()
  searchNinjas(@Query('name') name: string): CreateNinjaDto[] {
    return this.ninjaService.filterNinjas({ name });
  }

  @Get(':id')
  getOneNinja(@Param('id') id: string) {
    return { id };
  }

  @Post()
  creteNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return { ...createNinjaDto };
  }
}
