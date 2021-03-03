import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from 'src/database/entities/trainer.entity';
import { CreateTopicDto } from 'src/topics/dto/create-topic.dto';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainersService {
    updateOne(updateTrainer: UpdateTrainerDto) {
        throw new Error('Method not implemented.');
    }
    constructor(@InjectRepository(Trainer) private trainerRepository: Repository<Trainer>){}

    async create(createTrainer : CreateTrainerDto) : Promise<void> {
        let trainer = await this.trainerRepository.create(createTrainer);
        await this.trainerRepository.save(trainer);
    }

    async findOne(id:number) : Promise<Trainer> {
        return await this.trainerRepository.findOne(id);
    }

    async findAll() : Promise<Trainer[]> {
        return await this.trainerRepository.find();
    }

    async update(updateTrainer : UpdateTrainerDto) : Promise<void> {
        await this.trainerRepository.update(
            {id : updateTrainer.id},
            {
                trainer_address : updateTrainer.trainer_address,
                trainer_firstname: updateTrainer.trainer_firstname,
                trainer_lastname: updateTrainer.trainer_lastname,
                trainer_email: updateTrainer.trainer_email,
                trainer_phone: updateTrainer.trainer_phone,
                avatar: updateTrainer.avatar
            }
        )
    }
    
    async delete(id:number) : Promise<void> {
        await this.trainerRepository.delete(id);
    }

    async findByEmail(username: string, password: string){
        return await this.trainerRepository.findOne({
            where: [
                {password:password},
                {trainer_email:username}
            ]
        })
    }

}
