import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { CourseDetailService } from 'src/course-detail/course-detail.service';
import { CoursesService } from 'src/courses/courses.service';
import { Category } from 'src/database/entities/category.entity';
import { Course } from 'src/database/entities/course.entity';
import { CourseDetail } from 'src/database/entities/coursedetail.entity';
import { Topic } from 'src/database/entities/topic.entity';
import { Trainer } from 'src/database/entities/trainer.entity';
import { TopicsService } from 'src/topics/topics.service';
import { TrainersService } from 'src/trainers/trainers.service';
import { HomepageController } from './homepage.controller';
import { HomepageService } from './homepage.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseDetail,Topic,Course,Category,Trainer])],
  controllers: [HomepageController],
  providers: [HomepageService,CourseDetailService,TopicsService,TrainersService,CategoriesService,CoursesService]
})
export class HomepageModule {}
