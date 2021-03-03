import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseDetail } from 'src/database/entities/coursedetail.entity';
import { getConnection, getRepository, Repository } from 'typeorm';
import { CreateDetailDto } from './dto/create-coursedetail';
import { UpdateDetailDto } from './dto/update-coursedetail';

@Injectable()
export class CourseDetailService {
    constructor(@InjectRepository(CourseDetail) private coursedetailRepository : Repository<CourseDetail>){}

    async create(createDetail : CreateDetailDto){
        let coursedetail = await this.coursedetailRepository.create(createDetail);  
        await this.coursedetailRepository.save(coursedetail);
    }

    async findOne(course_id :number, topic_id:number, trainer_id : number) :Promise<CourseDetail> {
        return await getConnection().createQueryBuilder()
            .select('detail','course.id, trainer.id,topic.id')
            .from(CourseDetail, 'detail')
            .innerJoinAndSelect("detail.course", "course", )
            .innerJoinAndSelect("detail.topic", "topic",)
            .innerJoinAndSelect("detail.trainer", "trainer")
            .where("course.id = :id1", {id1: course_id})
            .andWhere("topic.id = :id2", {id2: topic_id})
            .andWhere("trainer.id = :id3", {id3: trainer_id})
            .getOne(); 
    }


    


    async findAll() : Promise<CourseDetail[]>{
  
        return await getConnection().createQueryBuilder()
            .select('detail','course.id, trainer.id,topic.id')
            .from(CourseDetail, 'detail')
            .innerJoinAndSelect("detail.course", "course", )
            .innerJoinAndSelect("detail.topic", "topic",)
            .innerJoinAndSelect("detail.trainer", "trainer")
            .getMany();
    }

    async update(updateDetail: UpdateDetailDto){
        await getConnection().createQueryBuilder()
        .update(CourseDetail)
        .set({
            course_id: updateDetail.course_id,
            topic_id: updateDetail.topic_id,
            trainer_id: updateDetail.trainer_id
        })
        .where("course.id = :id1", {id1: updateDetail.course_oldid})
        .andWhere("topic.id = :id2", {id2: updateDetail.topic_oldid})
        .andWhere("trainer.id = :id3", {id3: updateDetail.trainer_oldid})
        .execute();
    }

    async delete(course_id :number, topic_id:number, trainer_id : number){
        await getConnection().createQueryBuilder()
        .delete()
        .from(CourseDetail)
        .where("course.id = :id1", {id1: course_id})
        .andWhere("topic.id = :id2", {id2: topic_id})
        .andWhere("trainer.id = :id3", {id3: trainer_id})
        .execute()
    }
}
