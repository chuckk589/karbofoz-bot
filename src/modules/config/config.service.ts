import { RetrieveDeviceConfigDto } from './dto/retrieve-device-config.dto';
import { RetrieveExchangeConfigDto } from './dto/retrieve-exchange-config.dto';
import { EntityManager, PopulateHint } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Exchange } from '../mikroorm/entities/Exchange';
import { Device } from '../mikroorm/entities/Device';

@Injectable()
export class ConfigService {
  constructor(private readonly em: EntityManager) {}
  async getAll() {
    const exchanges = await this.em.find(
      Exchange,
      { themes: { themeInputs: { input: { inputAlias: { $ne: null } } } } },
      {
        populate: ['exchangeNetworks.networkCurrencies.currency', 'exchangeNetworks.network', 'themes.themeInputs.input.inputAlias.aliasVariants', 'themes.themeLanguages.language'],
        populateWhere: PopulateHint.INFER,
      },
    );
    const devices = await this.em.find(Device, {}, { populate: ['deviceBarInputs.input.variants'] });
    return {
      exchanges: exchanges.map((exchange) => new RetrieveExchangeConfigDto(exchange)),
      devices: devices.map((device) => new RetrieveDeviceConfigDto(device)),
    };
  }
}
