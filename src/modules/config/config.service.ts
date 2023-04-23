import { RetrieveConfigDto } from './dto/retrieve-config.dto';
import { EntityManager, PopulateHint } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Exchange } from '../mikroorm/entities/Exchange';
import { Template } from '../mikroorm/entities/Template';
import { RetrieveTemplateDto } from '../theme/dto/retrieve-template.dto';

@Injectable()
export class ConfigService {
  constructor(private readonly em: EntityManager) {}
  async getAll() {
    const exchanges = await this.em.find(Exchange, {});
    const templates = await this.em.find(
      Template,
      { themes: { themeInputs: { input: { inputAlias: { $ne: null } } } } },
      { populate: ['exchange', 'themes.themeInputs.input.inputAlias', 'themes.themeLanguages.language'], populateWhere: PopulateHint.INFER },
    );
    return {
      exchanges: exchanges.map((exchange) => new RetrieveConfigDto({ title: exchange.name, value: exchange.id.toString() })),
      templates: templates.map((template) => new RetrieveTemplateDto(template)),
    };
  }
}
