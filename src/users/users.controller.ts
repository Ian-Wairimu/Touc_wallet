import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import { WalletService } from '../wallet/wallet.service';
import { CreateWalletDto } from '../wallet/dto/wallet.dto';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly walletService: WalletService,
  ) {}
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('wallet')
  createWallet(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }
  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }
}
