import { CreateWalletDto } from './dto/create-wallet.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller({
  path: 'wallet',
  version: '1',
})
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
