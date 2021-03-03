
export class CreateStaffDto  {

    staff_firstname: string

    staff_lastname: string

    staff_email: string

    staff_phone: string

    staff_address: string

    password: string

    avatar: string

    setAvatar(avatar: string){
        this.avatar = avatar;
    }

    constructor(firstname:string, lastname:string, email:string, phone:string, address:string, password:string, avatar:string){
        this.staff_address = address;
        this.staff_email = email;
        this.staff_lastname = lastname;
        this.staff_firstname = firstname;
        this.avatar = avatar;
        this.staff_phone = phone;
        this.password = password;
    }
}
