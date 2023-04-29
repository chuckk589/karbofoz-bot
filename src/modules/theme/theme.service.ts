import { EntityManager, LoadStrategy, PopulateHint } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Theme } from '../mikroorm/entities/Theme';
import { RetrieveInputValuesDto } from './dto/retrieve-input-values.dto';

@Injectable()
export class ThemeService {
  constructor(private readonly em: EntityManager) {}
  async getTheme(id: number, language: number) {
    // const theme = await this.em.findOne(
    //   Theme,
    //   { id, themeInputs: { input: { inputValues: { language } } } },
    //   {
    //     populate: ['template.exchange', 'themeInputs.input.inputValues.language'],
    //     strategy: LoadStrategy.JOINED,
    //   },
    // );
    const theme = await this.em.findOne(
      Theme,
      { id, themeInputs: { input: { inputValues: { language } } } },
      {
        populate: ['template.exchange', 'themeInputs.input.inputValues.language'],
        strategy: LoadStrategy.JOINED,
      },
    );
    console.log(theme);
    return {
      theme: new RetrieveInputValuesDto(theme),
      path: `${theme.template.exchange.alias}/${theme.alias}`,
    };
  }
}
