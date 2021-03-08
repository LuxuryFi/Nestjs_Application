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

    @Column({default: '123456789'})
    trainer_phone: string
    
    @Column({default: '123456789'})
    trainer_address: string

    @Column()
    avatar: string

    @Column({default: '123456789'})
    password: string

    @Column({default:'trainer'})
    role_id:string
}
