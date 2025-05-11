import {Request, Response, NextFunction} from 'express';
import {User} from '../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET) {
throw new Error('JWT_SECRET is not defined in environment variables');
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Signup request received:', req.body);
  try {
    const {
      email,
      phoneNo,
      name,
      password,
      role,
      departmendId,
      permissionsId,
    } = req.body;

    const existingUser = await User.findOne({email});
    if(existingUser) {
      res.status(409).json({ error: 'Email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      phoneNo,
      name,
      role,
      passwordHash,
      departmendId,
      permissionsId,
      roleHistory: [{role, dateAssigned: new Date()}],
    });

    await newUser.save();

    const token = jwt.sign(
      {userId: newUser._id, role: newUser.role},
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({message: 'User created successfully'});
  } 
  catch (error) 
  {
    console.error('Error during signup:', error);
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({error: 'Invalid credentials'});
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch) {
      res.status(401).json({error: 'Invalid credentials'});
      return;
    }

    const token = jwt.sign(
      {userId: user._id, role: user.role},
      JWT_SECRET,
      {expiresIn: '7d'}
    );

    res.status(200).json({token});
  } catch (error) {
    next(error);
  }
};