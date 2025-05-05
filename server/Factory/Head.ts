import User from './User';
class Head extends User{

    constructor(name: string, email: string, password: string, id: string , createdAt:Date) {
        super(name, email, password, id  , createdAt); // Call the parent class constructor
    }
    public DoCall():void{
        //
    }
    public DoTraining():void{
        //
    }
    public DoEvent():void{
        //
    }
    public ApplyForElections():void{
        //
    }
}
export default Head;