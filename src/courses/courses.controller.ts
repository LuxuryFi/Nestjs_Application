import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Render, Req, Res, UseGuards } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { Course } from 'src/database/entities/course.entity';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService: CoursesService, private readonly categoryService : CategoriesService){}


    @Roles(Role.Staff,Role.Admin)
    @UseGuards(RolesGuard)
    @Render('courses/index.hbs')
    @Get('index')
    async getAll(@Req() req){
        let courses = await this.courseService.findAll();
        console.log(courses);
        return {user: req.user,courses: courses};
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Render('courses/create.hbs')
    @Get('create')
    async create(@Req() req) {
        let categories = await this.categoryService.findAll();
        console.log(categories)
        return {user: req.user,categories:categories}
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('create')
    async createOne(@Body() createCourse : CreateCourseDto, @Res() res, @Req() req){
        await this.courseService.createOne(createCourse);
        res.status(302).redirect('/courses/index')
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Render('courses/update.hbs')
    @Get('update')
    async update(@Req() req,@Query() query){
        let course = await this.courseService.findOne(query.id);
        let categories = await this.categoryService.findAll();
        
        if (course.is_active == 1) return {user: req.user,course : course, active: 'selected', disable: '', categories:categories};
        
        return {user: req.user,course : course,active: '', disable: 'selected', categories:categories};
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('update')
    updateOne(@Body() updateCourse : UpdateCourseDto, @Res() res){
        this.courseService.updateOne(updateCourse);
        console.log(updateCourse);
        res.status(302).redirect('/courses/index')
    }

    
    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Render('courses/detail.hbs')
    @Get('detail')
    async detail(@Query() query, @Req() req){
        let course = await this.courseService.findOne(query.id);
        if (course.is_active == 1) return {course : course, active: 'selected', disable: ''};
        return {course : course,active: '', disable: 'selected'};
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Get('delete')
    delete(@Query() query, @Res() res){
        this.courseService.deleteOne(query.id);
        res.status(302).redirect('/courses/index')
    }
    

}
