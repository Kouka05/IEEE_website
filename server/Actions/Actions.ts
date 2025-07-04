import User from '../Factory/User';
abstract class Actions{
    protected title:string;
    protected description:string ;
    protected createdBy:User ;
    protected date: Date;
    constructor(title:string , description:string , createdBy:User , date:Date){
        this.title = title ;
        this.description = description ;
        this.createdBy = createdBy ;
        this.date = date ;
    }
   
    public setDate(date: Date): void {
        this.date = date;
    }
    public setTitle(title: string): void {
        this.title = title;
    }
    public setDescription(description: string): void {
        this.description = description;
    }
    public getTitle(): string {
        return this.title;
    }
    public getDescription(): string {
        return this.description;
    }
    public getDate(): Date {
        return this.date;
    }

}
export default Actions;