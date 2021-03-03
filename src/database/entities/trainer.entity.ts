import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { Base } from './base.entity';

@Entity()
export class Trainer extends Base {
    @Column()
    trainer_firstname: string

    @Column()
    trainer_lastname: string

    @Column()
    trainer_email: string

    @Column()
    trainer_phone: string
    
    @Column()
    trainer_address: string

    @Column()
    avatar: string

    @Column()
    password: string

    @Column({default:'trainer'})
    role_id:string
}
