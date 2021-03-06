import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CourseDetailModule } from './course-detail/course-detail.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { StaffsModule } from './staffs/staffs.module';
import { TopicsModule } from './topics/topics.module';
import { TraineesModule } from './trainees/trainees.module';
import { TrainersModule } from './trainers/trainers.module';
import { HomepageModule } from './homepage/homepage.module';


@Module({
  imports: [CategoriesModule,
    CoursesModule, 
    TopicsModule, 
    TrainersModule, 
    CourseDetailModule, 
    StaffsModule, 
    AdminModule, 
    TraineesModule ,   
    EnrollmentsModule,AuthModule
    ,TypeOrmModule.forRootAsync({
    useFactory: async () =>
      Object.assign(await getConnectionOptions(), {
        autoLoadEntities: true,
      }),
  }), HomepageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
