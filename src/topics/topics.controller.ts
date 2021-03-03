import { Body, Controller, Get, HttpException, HttpStatus,Request,Post, Query, Render, Res, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { query } from 'express';
import { join } from 'path';
import { getegid } from 'process';
import { Topic } from 'src/database/entities/topic.entity';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicsService } from './topics.service';

@Controller('topics')
export class TopicsController {
    constructor(private readonly topicsService : TopicsService){}

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('topics/index.hbs')
    @Get('index')
    async index(@Request() req)  {
        let topics =  await this.topicsService.findAll()

        return {user: req.user,topics : topics};
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('topics/create.hbs')
    @Get('create')
    create(){}

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('topics/create.hbs')
    @Post('create')
    async createOne(@Body(ValidationPipe) createTopic : CreateTopicDto,  @Res() res){
        try {
           this.topicsService.createOne(createTopic)
            res.status(302).redirect('/topics/index');
        } catch(err) {
            console.log(new HttpException({
                message: err.message
              }, HttpStatus.BAD_REQUEST));
        };

    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('topics/update.hbs')
    @Get('update')
    async update(@Req() req,@Query() query){
        let topic = await this.topicsService.findOne(query.id);
        if (topic.is_active == 1) return {topic : topic, active:'selected', disable: ''};
        return {user: req.user,topic : topic, active:'', disable: 'selected'};
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Post('update')
    async updateone(@Body() updateTopic : UpdateTopicDto, @Res() res){
        this.topicsService.updateOne(updateTopic);
        console.log(updateTopic);
        res.status(302).redirect('/topics/index');
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('topics/detail.hbs')
    @Get('detail')
    async detail(@Req() req,@Query() query){
        let topic = await this.topicsService.findOne(query.id);
        return {user: req.user,topic : topic};
    }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Get('delete')
    async deleteOne(@Query() query, @Res() res){
        await this.topicsService.deleteOne(query.id);
        res.status(302).redirect('/topics/index');
    }
}
