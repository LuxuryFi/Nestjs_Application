import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from 'src/database/entities/trainee.entity';
import { Trainer } from 'src/database/entities/trainer.entity';
import { Staff } from 'src/database/entities/staff.entity';
import { Admin } from 'src/database/entities/admin.entity';
import { TraineesService } from 'src/trainees/trainees.service';
import { TrainersService } from 'src/trainers/trainers.service';
import { StaffsService } from 'src/staffs/staffs.service';
import { AdminService } from 'src/admin/admin.service';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([Trainee,Trainer,Staff,Admin])],
  providers: [AuthService, LocalStrategy,TraineesService,TrainersService,StaffsService,AdminService,SessionSerializer],
})
export class AuthModule {}
