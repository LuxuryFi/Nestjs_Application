import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from 'src/database/entities/trainer.entity';
import { MulterMiddleware } from './trainers.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  providers: [TrainersService],
  controllers: [TrainersController]
})

export class TrainersModule {
  
}
