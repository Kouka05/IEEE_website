import bcrypt from 'bcrypt';

abstract class User{
    protected id:string;
    private password:string;
    protected name :string ;
    protected email :string ;
    protected isActive ?:boolean ;
    protected createdAt :Date ;
    //protected Inbox ?:string[] ; //in uml but i donot remember why we need it
    constructor(name :string , email :string , password:string  , id:string  , createdAt:Date  ,isActive?:boolean){
        this.createdAt = createdAt ;
        this.id = id ;
        this.password = password ;
        this.name = name ;
        this.email = email ;
        this.isActive = isActive ;
    }
    public getId():string{
        return this.id ;
    }
    public getName():string{
        return this.name ;
    }
    public getEmail():string{
        return this.email ;
    }
    // maybe helful during login
    public async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    

}
export default User ;