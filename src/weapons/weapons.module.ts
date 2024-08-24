import { Module } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { WeaponsController } from './weapons.controller';
import { Weapon } from './entities/weapon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Weapon]), AuthModule],
  controllers: [WeaponsController],
  providers: [WeaponsService],
  exports: [TypeOrmModule],
})
export class WeaponsModule {}
