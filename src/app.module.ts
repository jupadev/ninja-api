import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_DB_host,
      port: 5432,
      username: process.env.POSTGRES_DB_USER,
      password: process.env.POSTGRES_DB_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 5,
    }),
    
    NinjasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
