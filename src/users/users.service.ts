import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/users.dto';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly walletService: WalletService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
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
  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        wallets: true,
      },
    });
  }
  // async findById(id: number) {
  //   return await this.userRepository.findOne({
  //     where: {
  //       userId: id,
  //     },
  //   });
  // }
}
