// import { UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';

abstract class User {
  protected id?: string;
  private password: string;
  protected name: string;
  protected email: string;
  protected phoneNo: string;
  protected warnings: number;
  protected enrollDate: Date;
  protected leaveDate?: Date | null;
  protected department: string;
  protected permissions: string;
  protected roleHistory: { role: string; dateAssigned: Date }[];
  // protected userDoc?: UserDocument;

  constructor(
    name: string,
    email: string,
    phoneNo: string,
    password: string,
    warnings: number,
    enrollDate: Date,
    department: string,
    permissions: string,
    roleHistory: { role: string; dateAssigned: Date }[],
    leaveDate?: Date | null,
    // userDoc?: UserDocument
  ) {
    this.name = name;
    this.email = email;
    this.phoneNo = phoneNo;
    this.password = password;
    this.warnings = warnings;
    this.enrollDate = enrollDate;
    this.department = department;
    this.permissions = permissions;
    this.roleHistory = roleHistory;
    this.leaveDate = leaveDate;
    // this.userDoc = userDoc;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhoneNo(): string {
    return this.phoneNo;
  }

  public getWarnings(): number {
    return this.warnings;
  }

  public getEnrollDate(): Date {
    return this.enrollDate;
  }

  public getDepartment(): string {
    return this.department;
  }

  public getPermissions(): string {
    return this.permissions;
  }

  public getRoleHistory(): { role: string; dateAssigned: Date }[] {
    return this.roleHistory;
  }

  public getLeaveDate(): Date | null | undefined {
    return this.leaveDate;
  }

  public getRole(): string {
    return this.roleHistory[this.roleHistory.length - 1].role;
  }

  public getPassword(): string {
    return this.password;
  }
  public getId(): string | undefined {
    return this.id;
}
  /*public async validatePassword(password: string): Promise<boolean> {
    if (this.userDoc && typeof this.userDoc.comparePassword === 'function') {
      return await this.userDoc.comparePassword(password);
    }
    throw new Error('user not available for password validation.');
  }*/

  /*public async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 8);
  }*/
}

export default User;