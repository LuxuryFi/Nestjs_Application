import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/database/entities/course.entity';
import { Enrollment } from 'src/database/entities/enrollment.entity';
import { Topic } from 'src/database/entities/topic.entity';
import { Trainer } from 'src/database/entities/trainer.entity';
import { getConnection, Repository } from 'typeorm';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
    constructor(@InjectRepository(Enrollment) private readonly enrollmentRepository : Repository<Enrollment> ){}
    async create(createEnrollment : CreateEnrollmentDto){

        let result = JSON.parse(createEnrollment.course_detail_value)

        createEnrollment.course_id = result.course_id;
        createEnrollment.trainer_id = result.trainer_id;
        createEnrollment.topic_id = result.topic_id;

        let enrollment = await this.enrollmentRepository.create(createEnrollment);
        await this.enrollmentRepository.save(enrollment);
    }

    async findAll() : Promise<Enrollment[]> {
        return await getConnection().createQueryBuilder().
        select('enrollment', 'course_detail.trainer')
        .from(Enrollment,'enrollment')
        .innerJoinAndSelect("enrollment.course_detail", "course_detail")
        .innerJoinAndSelect("enrollment.trainee", "trainee")
        .innerJoinAndMapOne('enrollment.trainer',Trainer, 'trainer', 'course_detail.trainer_id = trainer.id')
        .innerJoinAndMapOne('enrollment.topic',Topic, 'topic', 'course_detail.topic_id = topic.id')
        .innerJoinAndMapOne('enrollment.course',Course, 'course', 'course_detail.course_id = course.id')
        .getMany();
    }

    async findAllTrainee(course_id :number, topic_id:number, trainer_id : number) : Promise<Enrollment[]>{
        return await getConnection().createQueryBuilder().
        select('enrollment', 'course_detail.trainer')
        .from(Enrollment,'enrollment')
        .innerJoinAndSelect("enrollment.course_detail", "course_detail")
        .innerJoinAndSelect("enrollment.trainee", "trainee")
        .innerJoinAndMapOne('enrollment.trainer',Trainer, 'trainer', 'course_detail.trainer_id = trainer.id')
        .innerJoinAndMapOne('enrollment.topic',Topic, 'topic', 'course_detail.topic_id = topic.id')
        .innerJoinAndMapOne('enrollment.course',Course, 'course', 'course_detail.course_id = course.id')
        .where("course.id = :id1", {id1: course_id})
        .andWhere("topic.id = :id2", {id2: topic_id})
        .andWhere("trainer.id = :id3", {id3: trainer_id})
        .getMany();
    }
    

    async findOne(course_id :number, topic_id:number, trainer_id : number, trainee_id: number){
        return await getConnection().createQueryBuilder().
        select('enrollment', 'course_detail.trainer')
        .from(Enrollment,'enrollment')
        .innerJoinAndSelect("enrollment.course_detail", "course_detail")
        .innerJoinAndSelect("enrollment.trainee", "trainee")
        .innerJoinAndMapOne('enrollment.trainer',Trainer, 'trainer', 'course_detail.trainer_id = trainer.id')
        .innerJoinAndMapOne('enrollment.topic',Topic, 'topic', 'course_detail.topic_id = topic.id')
        .innerJoinAndMapOne('enrollment.course',Course, 'course', 'course_detail.course_id = course.id')
        .where("course.id = :id1", {id1: course_id})
        .andWhere("topic.id = :id2", {id2: topic_id})
        .andWhere("trainer.id = :id3", {id3: trainer_id})
        .andWhere("trainee.id = :id4",{id4: trainee_id})
        .getOneOrFail();
    }

    async delete(course_id :number, topic_id:number, trainer_id : number, trainee_id: number){
        await getConnection().createQueryBuilder()
        .delete()
        .from(Enrollment)
        .andWhere("enrollment.topic_id = :id2", {id2: topic_id})
        .andWhere("enrollment.trainer_id = :id3", {id3: trainer_id})
        .andWhere("enrollment.trainee_id = :id4",{id4: trainee_id})
        .execute()
    }
    
}
