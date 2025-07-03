import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

interface LoginResult {
  success: boolean;
  userId?: string;
  email?: string;
  role?: string;
  token?: string;
  error?: string;
}

class UserLoginService {
  constructor() {}

  async login(email: string, password: string): Promise<LoginResult> {

    try {
      const user = await UserModel.findOne({ email });
      // Check if user exists
      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }
      console.log('comparing password:', password, user.password);
      const isMatch = await user.comparePassword(password);
      console.log('password match:', isMatch);
      
      if (!isMatch) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id.toString(), role: user.role },
        process.env.JWT_SECRET || 'changeme',  // It’s important to use a strong secret in production
        { expiresIn: '7d' }
      );

      return {
        success: true,
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
        token,
      };
    } catch (error) {
      console.error(error);
      return { success: false, error: 'An error occurred during login.' };
    }
  }
}

export default UserLoginService;