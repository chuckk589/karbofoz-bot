import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config.service';

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
}
