import User from "./User";
class Outsider extends User{

    constructor(name: string, email: string, password: string, id: string , createdAt:Date) {
        super(name, email, password, id  , createdAt); // Call the parent class constructor
    }
    public Call():void{
        //
    }
} 
export default Outsider;