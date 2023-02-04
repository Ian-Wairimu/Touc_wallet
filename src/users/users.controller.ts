import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { User } from './users.entity';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // walletInterface: Promise<CreateWalletDto>;
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(createUserDto);
  }
  @Get('all')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: string): Promise<User> {
    return this.usersService.findById(+id);
  }
}
