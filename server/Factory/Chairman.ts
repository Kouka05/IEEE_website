import User from '../Factory/User';

class Chairman extends User {
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
    super(
      name,
      email,
      phoneNo,
      password,
      warnings,         
      enrollDate,
      departmendId,
      permissionsId,
      roleHistory,
      leaveDate
    );
  }
}

export default Chairman;