import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/database/entities/topic.entity';
import { Repository } from 'typeorm';
import * as axios from 'axios';
import * as fs from 'fs';
import * as jsdom from 'jsdom';
const { JSDOM } = jsdom;
import * as url from 'url';

@Injectable()
export class CrawlService {
    constructor(@InjectRepository(Topic) topicRepository : Repository<Topic>){}


}
