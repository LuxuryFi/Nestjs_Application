import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Render, Res } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { Course } from 'src/database/entities/course.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService: CoursesService, private readonly categoryService : CategoriesService){}

    @Render('courses/index.hbs')
    @Get('index')
    async getAll(){
        let courses = await this.courseService.findAll();
        console.log(courses);
        return {courses: courses};
    }

    @Render('courses/create.hbs')
    @Get('create')
    async create() {
        let categories = await this.categoryService.findAll();
        console.log(categories)
        return {categories:categories}
    }

    @Post('create')
    async createOne(@Body() createCourse : CreateCourseDto, @Res() res){
        await this.courseService.createOne(createCourse);
        res.status(302).redirect('/courses/index')
    }

    @Render('courses/update.hbs')
    @Get('update')
    async update(@Query() query){
        let course = await this.courseService.findOne(query.id);
        let categories = await this.categoryService.findAll();
        
        if (course.is_active == 1) return {course : course, active: 'selected', disable: '', categories:categories};
        
        return {course : course,active: '', disable: 'selected', categories:categories};
    }

    @Post('update')
    updateOne(@Body() updateCourse : UpdateCourseDto, @Res() res){
        this.courseService.updateOne(updateCourse);
        console.log(updateCourse);
        res.status(302).redirect('/courses/index')
    }

    @Render('courses/detail.hbs')
    @Get('detail')
    async detail(@Query() query){
        let course = await this.courseService.findOne(query.id);
        if (course.is_active == 1) return {course : course, active: 'selected', disable: ''};
        return {course : course,active: '', disable: 'selected'};
    }

    @Get('delete')
    delete(@Query() query, @Res() res){
        this.courseService.deleteOne(query.id);
        res.status(302).redirect('/courses/index')
    }
    

}
