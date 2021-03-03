import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/database/entities/staff.entity';
import { Repository } from 'typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffsService {
    constructor(@InjectRepository(Staff) private staffRepository : Repository<Staff>){}

    async create(createStaff : CreateStaffDto){
        let staff = await this.staffRepository.create(createStaff);
        await this.staffRepository.save(staff);
    }

    async findAll(){
        return await this.staffRepository.find();
    }

    async findOne(id: number){
        return await this.staffRepository.findOne(id);
    }

    async delete(id : number){
        await this.staffRepository.delete(id);
    }
    
    async update(updateStaff : UpdateStaffDto){
        await this.staffRepository.update( 
            {id : updateStaff.id},
            {
                staff_address : updateStaff.staff_address,
                staff_firstname: updateStaff.staff_firstname,
                staff_lastname: updateStaff.staff_lastname,
                staff_email: updateStaff.staff_email,
                staff_phone: updateStaff.staff_phone,
                avatar: updateStaff.avatar
            }
        )
    }

    async findByEmail(username: string, password: string){
        return await this.staffRepository.findOne({
            where: [
                {password:password},
                {staff_email:username}
            ]
        })
    }

}
