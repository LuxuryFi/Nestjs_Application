import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDetailService } from 'src/course-detail/course-detail.service';
import { CourseDetail } from 'src/database/entities/coursedetail.entity';
import { Enrollment } from 'src/database/entities/enrollment.entity';
import { Trainee } from 'src/database/entities/trainee.entity';
import { TraineesService } from 'src/trainees/trainees.service';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment,CourseDetail,Trainee])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService,CourseDetailService,TraineesService]
})
export class EnrollmentsModule {}
