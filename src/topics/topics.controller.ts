import { Body, Controller, Get, HttpException, HttpStatus,Request,Post, Query, Render, Res, ValidationPipe, Req } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { query } from 'express';
import { join } from 'path';
import { getegid } from 'process';
import { Topic } from 'src/database/entities/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { TopicsService } from './topics.service';

@Controller('topics')
export class TopicsController {
    constructor(private readonly topicsService : TopicsService){}

    @Render('topics/index.hbs')
    @Get('index')
    async index(@Request() req)  {
        let topics =  await this.topicsService.findAll()

        return {user: req.user,topics : topics};
    }

    @Render('topics/create.hbs')
    @Get('create')
    create(){}

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

    @Render('topics/update.hbs')
    @Get('update')
    async update(@Req() req,@Query() query){
        let topic = await this.topicsService.findOne(query.id);
        if (topic.is_active == 1) return {topic : topic, active:'selected', disable: ''};
        return {user: req.user,topic : topic, active:'', disable: 'selected'};
    }

    @Post('update')
    async updateone(@Body() updateTopic : UpdateTopicDto, @Res() res){
        this.topicsService.updateOne(updateTopic);
        console.log(updateTopic);
        res.status(302).redirect('/topics/index');
    }

    @Render('topics/detail.hbs')
    @Get('detail')
    async detail(@Req() req,@Query() query){
        let topic = await this.topicsService.findOne(query.id);
        return {user: req.user,topic : topic};
    }

    @Get('delete')
    async deleteOne(@Query() query, @Res() res){
        await this.topicsService.deleteOne(query.id);
        res.status(302).redirect('/topics/index');
    }
}
