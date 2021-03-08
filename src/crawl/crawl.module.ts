import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from 'src/database/entities/topic.entity';
import { TopicsService } from 'src/topics/topics.service';
import { CrawlController } from './crawl.controller';
import { CrawlService } from './crawl.service';

@Module({
  imports:[TypeOrmModule.forFeature([Topic])],
  controllers: [CrawlController],
  providers: [CrawlService,TopicsService]
})
export class CrawlModule {}
