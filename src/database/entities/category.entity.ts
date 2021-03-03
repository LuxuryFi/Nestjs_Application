import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { Base } from './base.entity';

@Entity()
export class Category extends Base {
    @Column()
    category_name: string

    @Column()
    category_description: string
}
