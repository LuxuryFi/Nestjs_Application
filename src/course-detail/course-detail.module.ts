import { Module } from '@nestjs/common';
import { CourseDetailService } from './course-detail.service';
import { CourseDetailController } from './course-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseDetail } from 'src/database/entities/coursedetail.entity';
import { TopicsService } from 'src/topics/topics.service';
import { Trainer } from 'src/database/entities/trainer.entity';
import { TrainersService } from 'src/trainers/trainers.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CoursesService } from 'src/courses/courses.service';
import { Topic } from 'src/database/entities/topic.entity';
import { Course } from 'src/database/entities/course.entity';
import { Category } from 'src/database/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseDetail,Topic,Course,Category,Trainer])],
  providers: [CourseDetailService,TopicsService,TrainersService,CategoriesService,CoursesService],
  controllers: [CourseDetailController]
})
export class CourseDetailModule {}
