import User from './User'; // Import the base User class
import Chairman from './Chairman'; // Import the Chairman subclass
import Head from './Head'; // Import the Head subclass
import Volunteer from './Volunteer'; // Import the Volunteer subclass
import Outsider from './Outsider';
class UserFactory{
    public createUser (name :string , email :string , password:string  , id:string , createdAt:Date, userType:string ,isActive?:boolean ): User {   
        switch (userType) {
            case 'Chairman':
                return new Chairman(name  , email  , password  , id , createdAt);
            case 'Head':
                return new Head(name  , email  , password  , id , createdAt);
            case 'Volunteer':
                return new Volunteer(name  , email  , password  , id , createdAt);
            case 'Outsider':
                return new Outsider(name  , email  , password  , id , createdAt); 
            default:
                throw new Error('Invalid user type');
        }
    }


}
export default UserFactory;