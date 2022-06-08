import { Injectable } from '@nestjs/common';
import { targetModulesByContainer } from '@nestjs/core/router/router-module';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

let fakeDB: User[] = [];
let nowMaxId = 0;

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    // fakeDB에 input으로 들어온 createUserDto에 맞춰서
    // name,email,password를 생성(?)해서 넣어줌
    const newUser = new User({
      id : nowMaxId++,
      ...createUserDto
    });

    fakeDB.push(newUser);
  }

  findAll(): UserDto[] {
    return fakeDB.map(user => user.toDto());
  }

  findOne(id: number) {
    return fakeDB.find((user) => user.isId(id));
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const targetUser = this.findOne(id);
    fakeDB = fakeDB.map(user => user !== targetUser ? user : targetUser.update(updateUserDto))
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
