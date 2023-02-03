import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/users.dto';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new Error('failed while validating users..');
    } else {
      await this.userRepository.save(user);
      delete user.password;
    }
    return user;
  }
  async showById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId: id });
    delete user.password;
    return user;
  }
  // async findById(id: number) {
  //   return await this.userRepository.findOne({
  //     where: {
  //       userId: id,
  //     },
  //   });
  // }
}
