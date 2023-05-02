import { RetrieveConfigDto } from './dto/retrieve-config.dto';
import { EntityManager, PopulateHint } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Exchange } from '../mikroorm/entities/Exchange';
import { Template } from '../mikroorm/entities/Template';
import { RetrieveConfigTemplateDto } from './dto/retrieve-config-template.dto';
import { Currency } from '../mikroorm/entities/Currency';
import { Network } from '../mikroorm/entities/Network';

@Injectable()
export class ConfigService {
  constructor(private readonly em: EntityManager) {}
  async getAll() {
    const exchanges = await this.em.find(Exchange, {});
    const currencies = await this.em.find(Currency, {});
    const networks = await this.em.find(Network, {});
    const templates = await this.em.find(
      Template,
      { themes: { themeInputs: { input: { inputAlias: { $ne: null } } } } },
      { populate: ['exchange', 'themes.themeInputs.input.inputAlias.aliasVariants', 'themes.themeLanguages.language'], populateWhere: PopulateHint.INFER },
    );
    return {
      exchanges: exchanges.map((exchange) => new RetrieveConfigDto({ title: exchange.name, value: exchange.id.toString() })),
      currencies: currencies.map((currency) => new RetrieveConfigDto({ title: currency.name, value: currency.alias })),
      networks: networks.map((network) => new RetrieveConfigDto({ title: network.name, value: network.alias })),
      templates: templates.map((template) => new RetrieveConfigTemplateDto(template)),
    };
  }
}
