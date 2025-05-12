import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
    const user = await UserModel.findOne({ email });
    if (!user) {
      return { success: false, error: 'Invalid email' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: 'Invalid password' };
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '7d' }
    );

    return {
      success: true,
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      token,
    };
  }
}

export default UserLoginService;