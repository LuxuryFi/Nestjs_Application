import { Body, Controller, Get, Post, Query, Render, Req, Res } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { CourseDetailService } from 'src/course-detail/course-detail.service';
import { TraineesService } from 'src/trainees/trainees.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
    constructor(
        private readonly detailService: CourseDetailService,
        private readonly enrollmentService: EnrollmentsService,
        private readonly traineeService: TraineesService
    ){}

    @Render('enrollments/index.hbs')
    @Get('index')
    async index(){
        let enrollments =await this.detailService.findAll();
        console.log(enrollments)
        return {enrollments: enrollments}
    }

    @Render('enrollments/create.hbs')
    @Get('create')
    async create(){
        let details = await this.detailService.findAll();
        let trainees = await this.traineeService.findAll();
        return {details: details, trainees: trainees}
    }

    @Post('create')
    async createOne(@Body() createEnrollment : CreateEnrollmentDto, @Res() res){
       await this.enrollmentService.create(createEnrollment);
        res.status(302).redirect('/enrollments/create')
    }

    @Render('enrollments/list.hbs')
    @Get('detail')
    async detail(@Res()  res, @Query() query){
        let trainees = await this.enrollmentService.findAllTrainee(query.course_id,query.topic_id,query.trainer_id);
        console.log(trainees)
        return {trainees : trainees}
    }

    @Get('delete')
    async delete(@Res() res, @Query() query){
        await this.enrollmentService.delete(query.course_id,query.topic_id,query.trainer_id,query.trainee_id)
        res.status(302).redirect('/enrollments/detail?course_id=' + query.course_id + '&topic_id=' + query.topic_id + '&trainer_id=' +query.trainer_id)
    }
    

}   
