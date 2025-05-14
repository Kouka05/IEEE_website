import UserFactory, { Role } from './UserFactory';
import UserModel from '../models/user.model'; 
import jwt from 'jsonwebtoken';

const ROLE_PERMISSIONS: Record<Role, string[]> = {
  Outsider: ['view_public_content'],
  Volunteer: ['view_public_content', 'access_volunteer_portal'],
  Head: ['view_public_content', 'access_volunteer_portal', 'manage_team'],
  Chairman: ['view_public_content', 'access_volunteer_portal', 'manage_team', 'admin_panel'],
};

interface UserData {
  email: string;
  name: string;
  phoneNo: string;
  password: string;
  warnings?: number;
  role: string;
  department: string;
  enrollDate?: Date;
  roleHistory?: { role: string; dateAssigned: Date }[];
  leaveDate?: Date | null;
}

interface SignupResult {
  success: boolean;
  userId?: string;
  email?: string;
  role?: Role;
  token?: string;
  error?: string;
}

class UserSignupService {
  private userFactory: UserFactory;

  constructor() {
    this.userFactory = new UserFactory();
  }

  async createUser(userData: UserData): Promise<SignupResult> {
    try {
      console.log('Starting user creation process...');
      
      const {
        email,
        name,
        phoneNo,
        password,
        warnings = 0,
        role,
        department,
        enrollDate = new Date(),
        roleHistory = [{ role, dateAssigned: new Date() }],
        leaveDate = null,
      } = userData;

      console.log('Validating email format...');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { success: false, error: 'Invalid email format' };
      }
         
      // check for existing user by email or phoneNo
      console.log('Checking for existing user...');
      const existingUser = await UserModel.findOne({
        $or: [{ email }, { phoneNo }]
      });
      
      if (existingUser) {
        console.log('Existing user found:', existingUser.email);
        if (existingUser.email === email) {
          return { success: false, error: 'Email already exists' };
        }
        if (existingUser.phoneNo === phoneNo) {
          return { success: false, error: 'Phone number already exists' };
        }
      }

      const permissionsArr = ROLE_PERMISSIONS[role as Role] || [];
      const permissions = permissionsArr.join(',');
      
      console.log('Creating user via factory...');
      const user = await this.userFactory.createUser(
        name,
        email,
        phoneNo,
        password,
        warnings,
        role as Role,
        enrollDate,
        department,
        permissions,
        roleHistory,
        leaveDate
      );

      /*console.log('Preparing user document...');
      const userDoc = {
        email: user.getEmail(),
        name: user.getName(),
        phoneNo: user.getPhoneNo(),
        warnings: user.getWarnings(),
        role: user.getRole(),
        enrollDate: user.getEnrollDate(),
        departmendId: user.getDepartmendId(),
        permissionsId: user.getPermissionsId(),
        roleHistory: user.getRoleHistory(),
        leaveDate: user.getLeaveDate() ?? null,
        password: user.getPassword(),
        createdAt: new Date(),
      };*/

      // REMOVE THIS LINE - This is creating the user TWICE
      // await UserModel.create(userDoc);

      const createdUser = await UserModel.findOne({ email });
      if (!createdUser) {
        return { success: false, error: 'User creation failed' };
      }
      
      console.log('Generating JWT token...');
      const token = jwt.sign(
        { userId: createdUser!._id.toString(), role: user.getRole() },
        process.env.JWT_SECRET || 'changeme',
        { expiresIn: '7d' }
      );
      
      return {
        success: true,
        userId: createdUser!._id.toString(),
        email: user.getEmail(),
        role: user.getRole() as Role,
        token
      };
    } catch (error: any) {
      console.error('Error creating user:', error);
      console.error('Error stack:', error.stack);
      
      // More detailed error reporting
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors)
          .map((err: any) => err.message)
          .join(', ');
        return { success: false, error: `Validation error: ${validationErrors}` };
      }
      
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return { success: false, error: `Duplicate ${field} error` };
      }
      
      return { success: false, error: `Failed to create user: ${error.message}` };
    }
  }
}

export default UserSignupService;