import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { Base } from './base.entity';

@Entity()
export class Topic extends Base {
    @Column()
    topic_name: string

    @Column({default: 'TOPUP and BTEC'})
    topic_description: string
    
    @Column()
    topic_code: string

    @Column({default: 'TOPUP and BTEC'})
    topic_summary: string

    @Column({default:40})
    slot: number

    @Column({default:15})
    credit: number

    @Column()
    semester: string
}
