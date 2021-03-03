import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { Base } from './base.entity';

@Entity()
export class Topic extends Base {
    @Column()
    topic_name: string

    @Column()
    topic_description: string

    @Column()
    topic_summary: string

    @Column()
    slot: number
}
