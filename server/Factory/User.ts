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
  protected departmendId: string;
  protected permissionsId: string;
  protected roleHistory: { role: string; dateAssigned: Date }[];

  constructor(
    name: string,
    email: string,
    phoneNo: string,
    password: string,
    warnings: number,
    enrollDate: Date,
    departmendId: string,
    permissionsId: string,
    roleHistory: { role: string; dateAssigned: Date }[],
    leaveDate?: Date | null
  ) {
    this.name = name;
    this.email = email;
    this.phoneNo = phoneNo;
    this.password = password;
    this.warnings = warnings;
    this.enrollDate = enrollDate;
    this.departmendId = departmendId;
    this.permissionsId = permissionsId;
    this.roleHistory = roleHistory;
    this.leaveDate = leaveDate;
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

  public getDepartmendId(): string {
    return this.departmendId;
  }

  public getPermissionsId(): string {
    return this.permissionsId;
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

  public async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  public async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 8);
  }
}

export default User;