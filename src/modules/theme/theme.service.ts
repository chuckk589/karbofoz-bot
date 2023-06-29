import { EntityManager, LoadStrategy } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Theme } from '../mikroorm/entities/Theme';
import { RetrieveInputValuesDto } from './dto/retrieve-input-values.dto';
import { RetriveThemeQueryDto } from './dto/retrive-theme-query.dto';
import axios from 'axios';

@Injectable()
export class ThemeService {
  constructor(private readonly em: EntityManager) {}
  async getTheme(id: number, query: RetriveThemeQueryDto) {
    const theme = await this.em.findOne(
      Theme,
      { id, themeInputs: { inputValues: { $ne: null } } },
      {
        populate: ['exchange.exchangeNetworks.constants', 'exchange.exchangeNetworks.network', 'exchange.exchangeNetworks.networkCurrencies.currency', 'themeInputs.inputValues.language'],
        strategy: LoadStrategy.JOINED,
      },
    );
    const network = theme.exchange.exchangeNetworks.getItems().find((exchangeNetwork) => exchangeNetwork.network.alias == query.network);
    const currency = network.networkCurrencies.getItems().find((networkCurrency) => networkCurrency.currency.alias == query.currency);
    const course = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${network.network.coin}USDT`);
    return {
      theme: new RetrieveInputValuesDto(theme, query),
      path: `${theme.exchange.alias}/${theme.alias}`,
      network: { ...network.network, course: course.data.price },
      currency: currency.currency,
    };
  }
}
