import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { StaffsService } from 'src/staffs/staffs.service';
import { TraineesService } from 'src/trainees/trainees.service';
import { TrainersService } from 'src/trainers/trainers.service';


@Injectable()
export class AuthService {
    constructor(
        private traineeService: TraineesService,
        private adminService: AdminService,
        private trainerService: TrainersService,
        private staffService: StaffsService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const trainee = await this.traineeService.findByEmail(username, pass);
        const admin = await this.adminService.findByEmail(username, pass);
        const trainer = await this.trainerService.findByEmail(username, pass);
        const staff = await this.staffService.findByEmail(username, pass);
        

        if (trainee && trainee.trainee_email === username && trainee.password === pass) {
            const { password, ...result } = trainee;
            return result;
        }
        else if (admin && admin.admin_email === username && admin.password === pass) {
            const { password, ...result } = admin;
            return result;
        }
        else if (trainer && trainer.trainer_email === username && trainer.password === pass) {
            const { password, ...result } = trainer;
            return result;
        }
        else if (staff && staff.staff_email === username &&staff.password === pass) {
            const { password, ...result } = staff;
            return result;
        }
        return null;
    }
}
