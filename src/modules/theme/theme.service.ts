import { EntityManager, LoadStrategy, PopulateHint } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Theme } from '../mikroorm/entities/Theme';
import { RetrieveInputValuesDto } from './dto/retrieve-input-values.dto';

@Injectable()
export class ThemeService {
  constructor(private readonly em: EntityManager) {}
  async getTheme(id: number, language: string) {
    const theme = await this.em.findOne(
      Theme,
      { id, themeInputs: { input: { inputValues: { $ne: null } } } },
      {
        populate: ['exchange', 'themeInputs.input.inputValues.language'],
        strategy: LoadStrategy.JOINED,
      },
    );
    return {
      theme: new RetrieveInputValuesDto(theme, language),
      path: `${theme.exchange.alias}/${theme.alias}`,
    };
  }
}
