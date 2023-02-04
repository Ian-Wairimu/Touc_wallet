import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/wallet.dto';
import { Wallet } from './wallet.entity';

@Controller('api/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Post()
  createWallet(
    @Body() createWalletDto: CreateWalletDto,
  ): Promise<CreateWalletDto> {
    return this.walletService.createWallet(createWalletDto);
  }
  @Put(':id/deposit')
  deposit(
    @Param('id', ParseIntPipe) id: number,
    @Body() walletDto: CreateWalletDto,
  ) {
    return this.walletService.deposit(id, walletDto);
  }
  @Get(':walletId')
  findById(
    @Param('walletId', ParseIntPipe) walletsId: number,
  ): Promise<Wallet> {
    return this.walletService.findById(walletsId);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.walletService.remove(id);
  }
}
