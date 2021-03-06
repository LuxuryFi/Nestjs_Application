import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { CourseDetailService } from 'src/course-detail/course-detail.service';
import { CoursesService } from 'src/courses/courses.service';
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
        private readonly categoryService: CategoriesService
    ) { }

    
    @Roles(Role.Trainee,Role.Trainer)
    @UseGuards(RolesGuard)
    @Render('homepage.hbs')
    @Get('index')
    async index(@Req() req, @Res() res){
        console.log(req.user)
        return {user:req.user, user1:req.user}
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
}
