import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm'

import { Base } from './base.entity';
import { Category } from './category.entity';

@Entity()
export class Course extends Base {
    @Column()
    course_name: string

    @Column()
    course_description: string

    @ManyToOne(type => Category)
    @JoinColumn({name: "category_id"})
    category: Category

    @Column()
    category_id: number
}
