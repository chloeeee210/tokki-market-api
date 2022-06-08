import { UserDto } from "../dto/user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

export class User {
  private id : number;
  private name : string;
  private email : string;
  private password : string;

  constructor(fields : {id: number, name: string, email: string, password: string}){
    Object.assign(this, fields) // TODO: 암호화!
  }

  public isId(id: number): boolean {
    return this.id === id
  }

  public setEmail(newEmail : string): void {
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)){          
      throw Error(newEmail+'은 올바른 이메일이 아닙니다.')
    }
    this.email = newEmail
  }

  public update(updateUserDto: UpdateUserDto): User{
    return Object.assign(new User({
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password
    }), updateUserDto)
  }

  public toDto(): UserDto {
    return new UserDto({
      id: this.id,
      name: this.name,
      email: this.email,
    })
  }
}