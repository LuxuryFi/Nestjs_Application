export class CreateTraineeDto {
    
    trainee_firstname: string

    trainee_lastname: string

    trainee_email: string

    trainee_phone: string
    
    trainee_address: string

    avatar: string

    password: string

    role: number

    constructor(firstname:string, lastname:string, email:string, phone:string, address:string, password:string, avatar:string){
        this.trainee_address = address;
        this.trainee_email = email;
        this.trainee_lastname = lastname;
        this.trainee_firstname = firstname;
        this.avatar = avatar;
        this.trainee_phone = phone;
        this.password = password;
    }

}


