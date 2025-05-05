import User from './User';
class Volunteer extends User{
    constructor(name: string, email: string, password: string, id: string , createdAt:Date) {
        super(name, email, password, id  , createdAt); // Call the parent class constructor
    }
    public ApplyForElection():void{
        //
    }
}
export default Volunteer;