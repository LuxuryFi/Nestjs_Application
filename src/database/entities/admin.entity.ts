import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class Admin extends Base {
    @Column()
    admin_firstname: string

    @Column()
    admin_lastname: string

    @Column()
    admin_email: string

    @Column()
    admin_phone: string
    
    @Column()
    admin_address: string

    @Column()
    avatar: string

    @Column()
    password: string

    @Column({default: 'admin'})
    role_id: string
}
