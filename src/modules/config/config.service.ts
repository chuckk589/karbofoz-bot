import { RetrieveExchangeConfigDto } from './dto/retrieve-exchange-config.dto';
import { EntityManager, PopulateHint } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Exchange } from '../mikroorm/entities/Exchange';

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
    return {
      exchanges: exchanges.map((exchange) => new RetrieveExchangeConfigDto(exchange)),
    };
  }
}
