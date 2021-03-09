import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { Base } from './base.entity';

@Entity()
export class Trainee extends Base {
    @Column({charset: "utf8mb4", collation: "utf8mb4_unicode_ci"})
    trainee_firstname: string

    @Column({charset: "utf8mb4", collation: "utf8mb4_unicode_ci"})
    trainee_lastname: string

    @Column()
    trainee_email: string

    @Column({default: '123456789'})
    trainee_phone: string
    
    @Column({default: '123456789'})
    trainee_address: string

    @Column()
    avatar: string

    @Column({default: '123456789'})
    password: string

    @Column({default:'trainee'})
    role_id: string
}
