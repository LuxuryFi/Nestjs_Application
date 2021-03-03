import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/database/entities/topic.entity';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicsService {
    constructor(@InjectRepository(Topic) private topicRepository : Repository<Topic>) {}
    
    async createOne(createTopic : CreateTopicDto){
        let topic = await this.topicRepository.create(createTopic);
        this.topicRepository.save(topic);
    }

    async findOne(id : number) : Promise<Topic> {
        return await this.topicRepository.findOne(id);
    }

    async findAll() : Promise<Topic[]> {
        return await this.topicRepository.find();
    }

    async deleteOne(id:number) : Promise<void> {
        this.topicRepository.delete(id);
    }

    async updateOne(updateTopic : UpdateTopicDto) : Promise<void> {
        this.topicRepository.update(
            {id: updateTopic.id},
            {   topic_name: updateTopic.topic_name, 
                topic_description : updateTopic.topic_description, 
                slot : updateTopic.slot, 
                topic_summary: updateTopic.topic_summary}
        )
    }

}
