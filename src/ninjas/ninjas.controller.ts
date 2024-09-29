import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';

import { CreateNinjaDto, UpdateNinjaDto } from './dto/createNinja.dto';
import { NinjasService } from './ninjas.service';
import { Auth } from 'src/auth/decorators/auth';
import { Role } from 'src/auth/types';
import { ActiveUser } from 'src/auth/decorators/activeUser';
import { ActiveUserInterface } from 'src/common/types';

@Controller('ninjas')
@Auth(Role.USER)
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}

  @Get()
  findAll(
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.ninjaService.getAll(user);
  }

  @Get(':id')
  getOneNinja(
    @Param('id', ParseIntPipe) id: number,
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.ninjaService.getOne(id, user);
  }

  @Post()
  creteNinja(
    @Body() createNinjaDto: CreateNinjaDto,
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.ninjaService.createNinja(createNinjaDto, user);
  }

  @Patch(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBody: UpdateNinjaDto,
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.ninjaService.updateNinja(id, updateBody, user);
  }

  @Delete(':id')
  deleteNinja(
    @Param('id', ParseIntPipe) id: number,
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.ninjaService.deleteNinja(id, user);
  }
}
