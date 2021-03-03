import { Body, Controller, Get, Post, Query, Render, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TraineesService } from './trainees.service';
import * as path from 'path'
import { CreateTraineeDto } from './dto/create-trainee.dto';
import * as fs from 'fs';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/role/role.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';



@Controller('trainees')
export class TraineesController {
    constructor(private readonly traineeService: TraineesService) { }

    @Roles(Role.Staff, Role.Admin)
    @UseGuards(RolesGuard)
    @Render('trainees/index.hbs')
    @Get('index')
    async index(@Req() req) {
        let trainees = await this.traineeService.findAll();
        return { trainees: trainees }
    }


    @Roles(Role.Admin, Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainees/create.hbs')
    @Get('create')
    create() { }

    @Roles(Role.Admin, Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainees/index.hbs')
    @Post('create')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: path.join(__dirname + '/..' + '/../', 'public/uploads/trainees/')
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = file.originalname
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async createOne(@Body() createTrainee: CreateTraineeDto, @UploadedFile() file: Express.Multer.File, @Req() req, @Res() res) {
        try {
            createTrainee.avatar = file.filename
            await this.traineeService.create(createTrainee);
            res.status(302).redirect('/trainees/index')
        } catch (error) {

        }

    }

    @Roles(Role.Admin, Role.Staff)
    @UseGuards(RolesGuard)
    @Render('trainees/detail.hbs')
    @Get('detail')
    async detail(@Query() query) {
        let trainee = await this.traineeService.findOne(query.id);
        console.log(trainee)
        return { trainee: trainee }
    }

    @Roles(Role.Admin, Role.Staff)
    @UseGuards(RolesGuard)
    @Get('delete')
    async delete(@Res() res, @Query() query) {
        await this.traineeService.delete(query.id);
        res.status(302).redirect('/trainees/index')
    }


    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Render('trainees/update.hbs')
    @Get('update')
    async update(@Query() query) {
        let trainee = await this.traineeService.findOne(query.id);
        return { trainee: trainee }
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('update')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: path.join(__dirname + '/..' + '/../', 'public/uploads/trainees/')
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = file.originalname
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async updateOne(@Body() updateTrainee: UpdateTraineeDto, @UploadedFile() file: Express.Multer.File, @Query() Query, @Res() res, @Req() req) {
        const folder = path.join(__dirname, '../', '../', '/public/uploads/trainees/');
        try {
            let avatar = file.filename;
            let old_image = path.join(folder, file.filename)
            if (!avatar) avatar = updateTrainee.old_image
            else {
                if (updateTrainee.old_image && fs.existsSync(old_image)) {
                    fs.unlinkSync(old_image);
                }
                updateTrainee.old_image = avatar
            }
            await this.traineeService.update(updateTrainee);
            res.status(302).redirect('/trainees/index')
        } catch (error) {
            
        }
    }

}
