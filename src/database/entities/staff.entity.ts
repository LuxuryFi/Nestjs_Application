import { Resolver } from "dns";
import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity()
export class Staff extends Base {
    @Column()
    staff_firstname: string

    @Column()
    staff_lastname: string

    @Column()
    staff_email: string

    @Column()
    staff_phone: string
    
    @Column()
    staff_address: string

    @Column()
    avatar: string

    @Column()
    password: string

    @Column({default:'staff'})
    role_id: string
}
