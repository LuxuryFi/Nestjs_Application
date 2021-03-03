import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainee } from 'src/database/entities/trainee.entity';
import { UpdateTrainerDto } from 'src/trainers/dto/update-trainer.dto';
import { getConnection, Repository } from 'typeorm';
import { CreateTraineeDto } from './dto/create-trainee.dto';
import { UpdateTraineeDto } from './dto/update-trainee.dto';

@Injectable()
export class TraineesService {
    constructor(@InjectRepository(Trainee) private traineeRepository : Repository<Trainee> ){}

    async findByEmail(username : string, password: string){
        return await getConnection()
        .createQueryBuilder()
        .select('trainee')
        .from(Trainee,'trainee')
        .where('trainee.trainee_email = :email', {email : username})
        .andWhere('trainee.password = :password', {password : password})
        .getOne()
    }

    async findAll(){
        return await this.traineeRepository.find();
    }

    async findOne(id: number){
        return await this.traineeRepository.findOne(id);
    }

    async create(createTrainee : CreateTraineeDto){
        let trainee = this.traineeRepository.create(createTrainee);
        await this.traineeRepository.save(trainee);
    }

    async delete(id :number){
        this.traineeRepository.delete(id);
    }

    async update(updateTrainee : UpdateTraineeDto){
        await this.traineeRepository.update(
            {id : updateTrainee.id},
            {
                trainee_address: updateTrainee.trainee_address,
                trainee_email: updateTrainee.trainee_email,
                trainee_firstname: updateTrainee.trainee_firstname,
                trainee_lastname: updateTrainee.trainee_lastname,
                avatar: updateTrainee.avatar,
                password: updateTrainee.password,
                trainee_phone: updateTrainee.trainee_phone
            }
        )
    }
}
