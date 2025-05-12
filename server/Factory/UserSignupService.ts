import UserFactory, { Role } from './UserFactory';
import UserModel, { UserDocument } from '../models/user.model'; 
import jwt from 'jsonwebtoken';

interface UserData {
  email: string;
  name: string;
  phoneNo: string;
  password: string;
  warnings?: number;
  role: string;
  enrollDate?: Date;
  departmendId: string;
  permissionsId: string;
  roleHistory?: { role: string; dateAssigned: Date }[];
  leaveDate?: Date | null;
}

interface SignupResult {
  success: boolean;
  userId?: string;
  email?: string;
  role?: string;
  token?: string;
  error?: string;
}

class UserSignupService {
  private userFactory: UserFactory;

  constructor() {
    this.userFactory = new UserFactory();
  }

  async createUser(userData: UserData): Promise<SignupResult> {
    const {
      email,
      name,
      phoneNo,
      password,
      warnings = 0,
      role,
      enrollDate = new Date(),
      departmendId,
      permissionsId,
      roleHistory = [{ role, dateAssigned: new Date() }],
      leaveDate = null,
    } = userData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    // check for existing user by email or phoneNo
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { phoneNo }]
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return { success: false, error: 'email already exists' };
      }
    }

    const user = await this.userFactory.createUser(
      name,
      email,
      phoneNo,
      password,
      warnings,
      role as Role,
      enrollDate,
      departmendId,
      permissionsId,
      roleHistory,
      leaveDate
    );

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
    };

    try {
      const createdUser = await UserModel.create(userDoc) as UserDocument; 
      const token = jwt.sign(
        { userId: createdUser._id.toString(), role: user.getRole() },
        process.env.JWT_SECRET || 'changeme',
        { expiresIn: '7d' }
      );
      return {
        success: true,
        userId: createdUser._id.toString(),
        email: user.getEmail(),
        role: user.getRole(),
        token
      };
    } catch (error: any) {
        console.error('Error creating user:', error);
        return { success: false, error: 'Failed to create user' };
    }
  }
}

export default UserSignupService;