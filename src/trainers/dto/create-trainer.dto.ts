
export class CreateTrainerDto  {

    trainer_firstname: string

    trainer_lastname: string

    trainer_email: string

    trainer_phone: string

    trainer_address: string

    password: string

    avatar: string

    setAvatar(avatar: string){
        this.avatar = avatar;
    }

    constructor(firstname:string, lastname:string, email:string, phone:string, address:string, password:string, avatar:string){
        this.trainer_address = address;
        this.trainer_email = email;
        this.trainer_lastname = lastname;
        this.trainer_firstname = firstname;
        this.avatar = avatar;
        this.trainer_phone = phone;
        this.password = password;
    }
}
