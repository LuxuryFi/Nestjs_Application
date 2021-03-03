import { Module } from '@nestjs/common';
import { TraineesService } from './trainees.service';
import { TraineesController } from './trainees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from 'src/database/entities/trainee.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Trainee])],
  providers: [TraineesService],
  controllers: [TraineesController]
})
export class TraineesModule {}
