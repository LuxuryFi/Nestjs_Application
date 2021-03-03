import { Body, Controller, Get, Post, Query, Render, Req, Res, UseGuards } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { TrainersService } from './trainers.service';
import * as fs from 'fs'
import * as path from 'path'
import { query } from 'express';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';

@Controller('trainers')
export class TrainersController {
    constructor(private readonly trainerService: TrainersService) { }

    @Roles(Role.Admin,Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainers/index.hbs')
    @Get('index')
    async index(@Req() req) {
        let trainers = await this.trainerService.findAll();
        return {user: req.user, trainers: trainers };
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Render('trainers/create.hbs')
    @Get('create')
    create(@Req() req) {
        return {user: req.user}
     }

     @Roles(Role.Admin)
     @UseGuards(RolesGuard)
    @Post('create')
    async createOne(@Res() res, @Req() req) {
        const files = await req.saveRequestFiles();
        const destination = path.join(__dirname + '/..' + '/../', 'public/uploads/trainers/', files[0].filename);
        try {
            const data = files[0].fields;
            let createTrainer = new CreateTrainerDto(
                data.trainer_firstname.value,
                data.trainer_lastname.value,
                data.trainer_email.value,
                data.trainer_phone.value,
                data.trainer_address.value,
                data.password.value,
                files[0].filename
            );

            const tmp_file = files[0].filepath;
            fs.copyFileSync(tmp_file, destination);
            await this.trainerService.create(createTrainer);
            res.status(302).redirect('/trainers/index')
        } catch (error) {             
            res.status(302).redirect('/trainers/index')
        }
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Render('trainers/detail.hbs')
    @Get('detail')
    async detail(@Req() req,@Query() query) {
        let trainer = await this.trainerService.findOne(query.id);
        return {user: req.user, trainer: trainer };
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Render('trainers/update.hbs')
    @Get('update')
    async update(@Req() req,@Query() query) {
        let trainer = await this.trainerService.findOne(query.id);
        return { user: req.user,trainer: trainer }
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('update')
    async updateOne(@Res() res, @Req() req) {
        const files = await req.saveRequestFiles();
        const data = files[0].fields;
        const tmp_file = files[0].filepath;
        const destination = path.join(__dirname + '/..' + '/../', 'public/uploads/trainers/', files[0].filename);
        
        let avatar = '';
        try {
            avatar = files[0].filename;
            
            let old_image = path.join(__dirname + '/..' + '/../', 'public/uploads/trainers/', data.old_image.value);
            if (!files[0].filename) avatar = data.old_image.value;
            else {
                if (data.old_image.value && fs.existsSync(old_image)){
                    fs.unlinkSync(old_image);
                }
                fs.copyFileSync(tmp_file, destination);
            }

            let updateTrainer = new UpdateTrainerDto(
                data.id.value,
                data.trainer_firstname.value,
                data.trainer_lastname.value,
                data.trainer_email.value,
                data.trainer_phone.value,
                data.trainer_address.value,
                data.password.value,
                avatar   
            );   
  
            await this.trainerService.update(updateTrainer);
            res.status(302).redirect('/trainers/index')
            
        } catch (error) {
            throw error.message;
        }
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Get('delete')
    async deleteOne(@Query() query, @Res() res) {
        await this.trainerService.delete(query.id);
        res.status(302).redirect('/trainers/index')
    }

}
