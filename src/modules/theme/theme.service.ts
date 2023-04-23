import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Theme } from '../mikroorm/entities/Theme';
import { RetrieveThemeDto } from './dto/retrieve-theme.dto';

@Injectable()
export class ThemeService {
  constructor(private readonly em: EntityManager) {}
  async getTheme(id: number, exchange: number) {
    // const theme = await this.em.findOne(Theme, { id, template: { exchange } }, { populate: ['themeInputs.input.inputValues', 'themeInputs.input.inputValues.language', 'themeInputs.styles'] });
    // return new RetrieveThemeDto(theme);
  }
}
