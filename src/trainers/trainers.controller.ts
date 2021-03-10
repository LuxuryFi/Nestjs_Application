import { Body, Controller, Get, Post, Query, Render, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { TrainersService } from './trainers.service';
import * as fs from 'fs'
import * as path from 'path'
import { query } from 'express';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('trainers')
export class TrainersController {
    constructor(private readonly trainerService: TrainersService) { }

    @Roles(Role.Admin, Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainers/index.hbs')
    @Get('index')
    async index(@Req() req) {
        let trainers = await this.trainerService.findAll();
        return { user: req.user, trainers: trainers };
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Render('trainers/create.hbs')
    @Get('create')
    create(@Req() req) {
        return { user: req.user }
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
          destination: path.join(__dirname + '/..' + '/../', 'public/uploads/trainers/')
          , filename: (req, file, cb) => {
            // Generating a 32 random chars long string
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            //Calling the callback passing the random name generated with the original extension name
            cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
      }))
    async createOne(@Body() createTrainer : CreateTrainerDto, @UploadedFile() file: Express.Multer.File,@Res() res, @Req() req) {
        try {
            var avatar = file.filename;
            createTrainer.avatar = avatar
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
    async detail(@Req() req, @Query() query) {
        let trainer = await this.trainerService.findOne(query.id);
        return { user: req.user, trainer: trainer };
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Render('trainers/update.hbs')
    @Get('update')
    async update(@Req() req, @Query() query) {
        let trainer = await this.trainerService.findOne(query.id);
        return { user: req.user, trainer: trainer }
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('update')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: path.join(__dirname + '/..' + '/../', 'public/uploads/trainers/')
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async updateOne(@Body() updateTrainer: UpdateTrainerDto, @Res() res, @Req() req, @UploadedFile() file: Express.Multer.File) {
        const destination = path.join(__dirname + '/..' + '/../', 'public/uploads/trainers/', file.originalname);
        try {
            var avatar = file.filename;

            let old_image = path.join(__dirname + '/..' + '/../', 'public/uploads/trainers/', updateTrainer.old_image);
            if (!avatar) avatar = updateTrainer.old_image;
            else {
                if (updateTrainer.old_image && fs.existsSync(old_image)) {
                    fs.unlinkSync(old_image);
                }
                updateTrainer.avatar = avatar
            }
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
        let trainer = await this.trainerService.findOne(query.id);
        let old_image = path.join(__dirname + '/..' + '/../', 'public/uploads/trainers/', trainer.avatar);

        if (trainer.avatar && fs.existsSync(old_image)) {
            fs.unlinkSync(old_image);
        }

        await this.trainerService.delete(query.id);
        res.status(302).redirect('/trainers/index')
    }

}
