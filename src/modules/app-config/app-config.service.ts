import { Controller, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG_OPTIONS } from 'src/constants';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService, @Inject(CONFIG_OPTIONS) any: any) {}
  get<T>(key: string, options?: any) {
    return this.configService.get<T>(key, options) || this.configService.get<T>(key.toUpperCase(), options);
  }
  get exchanges(): string[] {
    return Reflect.getMetadata('exchanges', AppConfigService);
  }
}
