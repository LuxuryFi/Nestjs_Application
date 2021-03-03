import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./course.entity";
import { CourseDetail } from "./coursedetail.entity";
import { Trainee } from "./trainee.entity";

@Entity()
export class Enrollment {
    
    @ManyToOne(type => Trainee, {primary: true,onDelete: 'CASCADE'})
    @JoinColumn({name: 'trainee_id'})
    trainee : Trainee

    @ManyToOne(type => CourseDetail, {primary: true})
    @JoinColumn(
        [
            {name: 'course_id', referencedColumnName: 'course_id'},
            {name: 'topic_id', referencedColumnName:  'topic_id'},
            {name: 'trainer_id',  referencedColumnName: 'trainer_id'}
        ]
    )
    course_detail : CourseDetail

    @PrimaryColumn()
    trainee_id: number

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
