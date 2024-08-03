import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateNinjaDto, UpdateNinjaDto } from './dto/createNinja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}

  @Get()
  searchNinjas(@Query('name') name: string): CreateNinjaDto[] {
    return this.ninjaService.filterNinjas({ name });
  }

  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.getOne(id);
  }

  @Post()
  creteNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateNinjaDto,
  ) {
    return this.ninjaService.updateNinja(id, updateBody);
  }

  @Delete(':id')
  deleteNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.deleteNinja(id);
  }
}
