import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from './config.service';
import { RetrieveWalletDto } from '../wallet/dto/retrieve-wallet.dto';
import { RetrieveSavedPresetDto } from './dto/retrieve-saved-preset.dto';

@Controller({
  version: '1',
  path: 'config',
})
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getAll() {
    return this.configService.getAll();
  }

  @Get('userdata')
  getUserData() {
    return this.configService.getUserData();
  }
  @Post('userdata')
  async loadUserData(@Body() userData: { wallets: RetrieveWalletDto[]; presets: RetrieveSavedPresetDto[] }) {
    return this.configService.loadUserData(userData);
  }
}
