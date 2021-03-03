import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { Base } from './base.entity';

@Entity()
export class Trainee extends Base {
    @Column()
    trainee_firstname: string

    @Column()
    trainee_lastname: string

    @Column()
    trainee_email: string

    @Column()
    trainee_phone: string
    
    @Column()
    trainee_address: string

    @Column()
    avatar: string

    @Column()
    password: string

    @Column()
    semester: number

    @Column({default:'trainee'})
    role_id: string
}
