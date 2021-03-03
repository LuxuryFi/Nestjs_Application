import { join } from 'path'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { Category } from './category.entity'
import { Course } from './course.entity'
import { Topic } from './topic.entity'
import { Trainer } from './trainer.entity'

@Entity()
export class CourseDetail {
   @ManyToOne(type => Course, { primary: true })
   @JoinColumn({ name: "course_id" })
   course: Course

   @ManyToOne(type => Topic, { primary: true })
   @JoinColumn({ name: "topic_id" })
   topic: Topic

   @ManyToOne(type => Trainer, { primary: true })
   @JoinColumn({ name: "trainer_id" })
   trainer: Trainer

   @PrimaryColumn()
   course_id: number

   @PrimaryColumn()
   topic_id: number

   @PrimaryColumn()
   trainer_id: number

   @CreateDateColumn()
   created_at: Date

   @UpdateDateColumn()
   updated_at: Date

}
