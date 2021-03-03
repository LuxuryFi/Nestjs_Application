import { Body, Controller, Get, Post, Query, Render, Res } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { CoursesService } from 'src/courses/courses.service';
import { TopicsService } from 'src/topics/topics.service';
import { TrainersService } from 'src/trainers/trainers.service';
import { CourseDetailService } from './course-detail.service';
import { CreateDetailDto } from './dto/create-coursedetail';
import { UpdateDetailDto } from './dto/update-coursedetail';

@Controller('course-detail')
export class CourseDetailController {
    constructor(
        private readonly detailService: CourseDetailService,
        private readonly topicService: TopicsService,
        private readonly trainerService: TrainersService,
        private readonly courseService: CoursesService,
        private readonly categoryService: CategoriesService
    ) { }


    @Render('course-detail/index.hbs')
    @Get('index')
    async index() {
        let coursedetails = await this.detailService.findAll();
       return {coursedetails : coursedetails}
    }

    @Render('course-detail/create.hbs')
    @Get('create')
    async create() {
        let courses = await this.courseService.findAll();
        let topics = await this.topicService.findAll();
        let trainers = await this.trainerService.findAll();

        return { courses: courses, topics: topics, trainers: trainers }
    }

    @Post('create')
    async createOne(@Res() res, @Body() createDetail: CreateDetailDto) {
        await this.detailService.create(createDetail);
        res.status(302).redirect('/course-detail/index')
    }

    @Render('course-detail/detail.hbs')
    @Get('detail')
    async detail(@Query() query){
        let course_detail = await this.detailService.findOne(query.course_id,query.topic_id,query.trainer_id);
        
        return {course_detail: course_detail}
    }

    @Render('course-detail/update.hbs')
    @Get('update')
    async update(@Query() query){
        let course_detail = await this.detailService.findOne(query.course_id,query.topic_id,query.trainer_id);
        let courses = await this.courseService.findAll();
        let topics = await this.topicService.findAll();
        let trainers = await this.trainerService.findAll();
       
        return {course_detail: course_detail,courses: courses, topics: topics, trainers: trainers}
    }

    @Post('update')
    async updateOne(@Res() res,@Body() updateDetail : UpdateDetailDto){
        await this.detailService.update(updateDetail);
        res.status(302).redirect('/course-detail/index')
    }


    @Get('delete')
    async deleteOne(@Res() res, @Query() query){
        await this.detailService.delete(query.course_id,query.topic_id,query.trainer_id)
        res.status(302).redirect('/course-detail/index')
    }


}
