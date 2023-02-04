import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Wallet> {
    return this.walletService.findById(id);
  }
}
