import { EntityManager, PopulateHint } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Theme } from '../mikroorm/entities/Theme';
import { RetrieveThemeDto } from './dto/retrieve-theme.dto';

@Injectable()
export class ThemeService {
  constructor(private readonly em: EntityManager) {}
  async getTheme(id: number, language: number) {
    const theme = await this.em.findOne(Theme, { id }, { populate: ['template.exchange', 'themeInputs.input.inputValues.themeLanguage.language'] });
    const themeDto = new RetrieveThemeDto(theme);
    themeDto.inputs = themeDto.inputs.map((input) => {
      input.values = Array.isArray(input.values) && input.values.find((value) => +value.language === language)?.value;
      return input;
    });
    return {
      theme: themeDto,
      path: `${theme.template.exchange.alias}/${theme.alias}`,
    };
  }
}
