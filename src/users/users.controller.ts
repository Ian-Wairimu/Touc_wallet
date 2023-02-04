import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { WalletService } from '../wallet/wallet.service';
import { CreateWalletDto } from '../wallet/dto/wallet.dto';
// import { WalletInterface } from './wallet.interface';
import { User } from './users.entity';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly walletService: WalletService,
  ) {}
  // walletInterface: Promise<CreateWalletDto>;
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(createUserDto);
  }
  @Post('wallet')
  createWallet(
    @Body() createWalletDto: CreateWalletDto,
  ): Promise<CreateWalletDto> {
    return this.walletService.createWallet(createWalletDto);
  }
  // @Get(':id')
  // show(@Param('id') id: string) {
  //   return this.usersService.showById(+id);
  // }
  @Get('all')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
