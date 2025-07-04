import UserModel from '../models/user.model';
import Outsider from '../Factory/Outsider';
import Volunteer from '../Factory/Volunteer';
import Head from '../Factory/Head';
import Chairman from '../Factory/Chairman';
import User from './User';

export type Role = 'Outsider' | 'Volunteer' | 'Head' | 'Chairman';

class UserFactory {
  public async createUser(
    name: string,
    email: string,
    phoneNo: string,
    password: string,
    warnings: number,
    role: Role,
    enrollDate: Date,
    department: string,
    permissions: string,
    roleHistory: { role: string; dateAssigned: Date }[] = [],
    leaveDate?: Date | null
  ): Promise<User> {
    let user: User;

    switch (role) {
      case 'Chairman':
        user = new Chairman(name, email, phoneNo, password, warnings, enrollDate, department, permissions, roleHistory, leaveDate);
        break;
      case 'Head':
        user = new Head(name, email, phoneNo, password, warnings, enrollDate, department, permissions, roleHistory, leaveDate);
        break;
      case 'Volunteer':
        user = new Volunteer(name, email, phoneNo, password, warnings, enrollDate, department, permissions, roleHistory, leaveDate);
        break;
      case 'Outsider':
        user = new Outsider(name, email, phoneNo, password, warnings, enrollDate, department, permissions, roleHistory, leaveDate);
        break;
      default:
        throw new Error('Invalid user type');
    }

    // save to db
    const newUser = new UserModel({
      email: user.getEmail(),
      phoneNo: user.getPhoneNo(),
      warnings: user.getWarnings(),
      name: user.getName(),
      role: user.getRole(),
      enrollDate: user.getEnrollDate(),
      password: user.getPassword(),
      department: user.getDepartment(),
      permissions: user.getPermissions(),
      roleHistory: user.getRoleHistory(),
      leaveDate: user.getLeaveDate() ?? null,
    });

    await newUser.save();
    return user;
  }

  public fromDocument(userDoc: any): User {
    const {
      name,
      email,
      phoneNo,
      password,
      warnings,
      enrollDate,
      department,
      permissions,
      roleHistory,
      leaveDate,
      role
    } = userDoc;

    switch (role) {
      case 'Chairman':
        return new Chairman(name, email, phoneNo, password, warnings, enrollDate, department, permissions, roleHistory, leaveDate);
      case 'Head':
        return new Head(name, email, phoneNo, password, warnings, enrollDate, department, permissions, roleHistory, leaveDate);
      case 'Volunteer':
        return new Volunteer(name, email, phoneNo, password, warnings, enrollDate, department, permissions, roleHistory, leaveDate);
      case 'Outsider':
        return new Outsider(name, email, phoneNo, password, warnings, enrollDate, department, permissions, roleHistory, leaveDate);
      default:
        throw new Error('Invalid user type');
    }
  }
}

export default UserFactory;