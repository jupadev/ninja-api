import { Module } from '@nestjs/common';
import { NinjasController } from './ninjas.controller';
import { NinjasService } from './ninjas.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ninja } from './entities/ninja';
import { WeaponsModule } from 'src/weapons/weapons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ninja]), WeaponsModule],
  controllers: [NinjasController],
  providers: [NinjasService],
})
export class NinjasModule {}
