import { Module } from '@nestjs/common';
import { NinjasController } from './ninjas.controller';
import { NinjasService } from './ninjas.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ninja } from './entities/ninja';
import { WeaponsModule } from 'src/weapons/weapons.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ninja]), WeaponsModule, AuthModule],
  controllers: [NinjasController],
  providers: [NinjasService],
})
export class NinjasModule {}
