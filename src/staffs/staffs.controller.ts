import { Controller, Get, Post, Query, Render, Req, Res } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffsService } from './staffs.service';
import * as path from 'path'
import * as fs from 'fs'
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('staffs')
export class StaffsController {
    constructor(private readonly staffService : StaffsService){}

    @Render('staffs/index.hbs')
    @Get('index')
    async index(){
        let staffs = await this.staffService.findAll();
        return {staffs: staffs}
    }

    @Render('staffs/create.hbs')
    @Get('create')
    create(){
        
    }

    @Post('create')
    async createOne(@Req() req, @Res() res){
        const files = await req.saveRequestFiles();
        const destination = path.join(__dirname , '/../' , '/../', 'public/uploads/staffs/', files[0].filename);

        
        try {
            const data = files[0].fields;
            let createStaff = new CreateStaffDto(
                data.staff_firstname.value,
                data.staff_lastname.value,
                data.staff_email.value,
                data.staff_phone.value,
                data.staff_address.value,
                data.password.value,
                files[0].filename
            );

            const tmp_file = files[0].filepath;
            fs.copyFileSync(tmp_file, destination);
            await this.staffService.create(createStaff);
            res.status(302).redirect('/staffs/index')

        } catch (error) {
            return {message : 'Create Failed'}
        }
    
    }

    @Get('delete')
    async deleteOne(@Res() res, @Query() query){
        await this.staffService.delete(query.id);
        res.status(302).redirect('/staffs/index')
    }

    @Render('staffs/update.hbs')
    @Get('update')
    async update(@Query() query){
        let staff = await this.staffService.findOne(query.id);
        return {staff : staff}
    }

    @Post('update')
    async updateOne(@Req() req,@Res() res, @Query() query){
        const files = await req.saveRequestFiles();
        const destination = path.join(__dirname, '/../','/../', 'public/uploads/staffs/', files[0].filename);
        let data = files[0].fields;
        const tmp_file = files[0].filepath;
        let avatar = '';
        try {
            avatar = files[0].filename;
            
            let old_image = path.join(__dirname, '/../','/../', 'public/uploads/staffs/', data.old_image.value)

            if (!files[0].filename) avatar = data.old_image.value;
            else {
                if (data.old_image.value && fs.existsSync(old_image)){
                    fs.unlinkSync(old_image);
                }
                fs.copyFileSync(tmp_file, destination);
            }

            let updateStaff = new UpdateStaffDto(
                data.id.value,
                data.staff_firstname.value,
                data.staff_lastname.value,
                data.staff_email.value,
                data.staff_phone.value,
                data.staff_address.value,
                data.password.value,
                avatar, 
            )

            this.staffService.update(updateStaff);

            res.status(302).redirect('/staffs/index');
        } catch (error) {
            
        }
    }

    @Render('staffs/detail.hbs')
    @Get('detail')
    async detail(@Res() res, @Query() query){
        let staff = await this.staffService.findOne(query.id);
        return {staff :  staff}
    }




}
