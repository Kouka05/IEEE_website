import User from './User';

class Head extends User {
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

  public DoCall(): void {
    // 
  }
  public DoTraining(): void {
    //
  }
  public DoEvent(): void {
    // 
  }
  public ApplyForElections(): void {
    //  
  }
}

export default Head;