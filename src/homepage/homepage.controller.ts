import { Controller, Get, Post, Query, Render, Req, Res, UseGuards } from '@nestjs/common';
import { query, request } from 'express';
import { CategoriesService } from 'src/categories/categories.service';
import { CourseDetailService } from 'src/course-detail/course-detail.service';
import { CoursesService } from 'src/courses/courses.service';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';
import { TopicsService } from 'src/topics/topics.service';
import { TrainersService } from 'src/trainers/trainers.service';

@Controller('homepage')
export class HomepageController {
    constructor(
        private readonly detailService: CourseDetailService,
        private readonly topicService: TopicsService,
        private readonly trainerService: TrainersService,
        private readonly courseService: CoursesService,
        private readonly categoryService: CategoriesService,
        private readonly enrollmentService: EnrollmentsService
    ) { }

    
    @Roles(Role.Trainee,Role.Trainer)
    @UseGuards(RolesGuard)
    @Render('homepage.hbs')
    @Get('index')
    async index(@Req() req, @Res() res){
        let course_detail = await this.detailService.findAll();
        return {course_detail: course_detail,user:req.user, user1:req.user}
    }

    @Roles(Role.Trainee,Role.Trainer)
    @UseGuards(RolesGuard)
    @Render('homepage/courselist.hbs')
    @Get('courselist')
    async courselist(@Req() req, @Res() res){
        let courses = await this.courseService.findAll();
        return {courses : courses,user:req.user, user1:req.user}
    }

    @Roles(Role.Trainee,Role.Trainer)
    @UseGuards(RolesGuard)
    @Render('homepage/trainerlist.hbs')
    @Get('trainerlist')
    async trainerlist(@Req() req){
        let trainers = await this.trainerService.findAll();
        return {trainers : trainers,user:req.user, user1:req.user}
    }

    @Roles(Role.Trainee,Role.Trainer)
    @UseGuards(RolesGuard)
    @Render('homepage/topiclist.hbs')
    @Get('topiclist')
    async topiclist(@Req() req){
        let topics = await this.topicService.findAll();
        return {topics : topics,user:req.user, user1:req.user}
    }

    @Render('homepage/myCourseTrainee.hbs')
    @Get('coursetrainee')
    async coursetrainee(@Query() query, @Res() res,@Req() req){
        let courses = await this.enrollmentService.findAllTrainee(query.trainee_id);
        console.log(courses)
        return {courses:courses,user:req.user}
    }

    @Render('homepage/myCourseTrainer.hbs')
    @Get('coursetrainer')
    async coursetrainer(@Query() query, @Res() res,@Req() req){
        let courses = await this.detailService.findByCourse(query.trainer_id);
        console.log(courses)
        return {courses:courses,user:req.user}
    }

    @Render('homepage/profile.hbs')
    @Get('profile')
    async profile(@Req() request){
        return {user:request.user}
    }


    @Post('profile')
    async profileUpdate(@Req() req, @Res() res){
        await this.trainerService.changePassword(req.user.trainer_email,req.body.password)
        res.redirect('/homepage/profile')
    }

    
}
