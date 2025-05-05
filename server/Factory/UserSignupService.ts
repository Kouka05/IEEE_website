import { Db, MongoError, ObjectId } from 'mongodb';
import UserFactory from './UserFactory';
import { getDb } from '@db';
import bcrypt from 'bcrypt';
//for user creation (input side)
interface UserData{
    email:string;
    name:string;
    password:string ;
    isActive:boolean;
    role:string; // Assuming role is passed in userData
    [key: string]: any; //called index signature (for any extra fields in future)

}
interface IUserDocument extends UserData {
  _id: ObjectId;    // MongoDB's default ID type
  createdAt: Date;
}

interface SignupResult {
    success: boolean;
    userId?: string; //optional if success is false no id , email ,..
    email?: string;
    role?: string;
    error?: string;
  }

  class UserSignupService{
    private userFactory : UserFactory; 
    private db: Db;

    constructor() {
        this.userFactory = new UserFactory();
        this.db = getDb();
        if (!this.db) {
          throw new Error('Database not connected. Call connectToDb() first.');
        }
      }

    async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
  
  
    async createUser(userData: UserData): Promise<SignupResult> {
        const { email, name, password, isActive } = userData;
        const userType = userData.role; // Assuming role is passed in userData
        const encryptedPassword = await this.encryptPassword(password);
    
        let role: string;
        switch (userType) { 
            case 'Chairman':
                role = 'Chairman';
                break;
            case 'head':
                role = 'Head';
                break;
            case 'volunteer':
                role = 'Volunteer';
                break;
            case 'outsider':
                role = 'Outsider';
                break;
            default:
                return { success: false, error: 'Invalid user type' };
            }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email validation
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Invalid email format' };
        }
        const existingUser = await this.db.collection('users').findOne({ email });
        if(existingUser){
            return{ success:false , error:'email already exist'};
        }
        const newUser= this.userFactory.createUser( 
          name,
          email,
          encryptedPassword,
          new ObjectId().toString(), // MongoDB will generate this automatically
          new Date(), // Set the createdAt field to the current date
          role,
          isActive //ex. pervious chairman 
        );
    
       
        try {
          const result = await this.db.collection('users').insertOne(newUser);
          return {
            success: true,
            userId: result.insertedId.toString(),
            email: newUser.getEmail(),
            role: role, // Return the role of the created user
          };
        } catch (error) {
          console.error('Error creating user:', error);
          return { success: false, error: 'Failed to create user' };
        }
      }
     

  }