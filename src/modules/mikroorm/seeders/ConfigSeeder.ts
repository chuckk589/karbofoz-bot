import { Dictionary, EntityManager, FilterQuery, Loaded } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Exchange } from '../entities/Exchange';
import { Language } from '../entities/Language';
import { Template } from '../entities/Template';
import { Theme } from '../entities/Theme';
import { Input } from '../entities/Input';
import { HtmlInputType, InputAlias } from '../entities/InputAlias';
import { InputTheme } from '../entities/InputTheme';
import { ThemeLanguage } from '../entities/ThemeLanguage';

type field = { [key: string]: string } | { type: HtmlInputType; name: string; optional?: boolean; values?: string[] };

export class ConfigSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // //языки
    em.create(Language, { alias: 'en', name: 'Английский' });
    em.create(Language, { alias: 'es', name: 'Испанский' });
    em.create(Language, { alias: 'ru', name: 'Русский' });
    em.create(Language, { alias: 'ua', name: 'Украинский' });
    // //биржи
    const exchange = em.create(Exchange, { alias: 'binance', name: 'Binance' });
    const trust = em.create(Exchange, { alias: 'trust', name: 'Trust' });
    //шаблоны
    em.create(Template, { exchange: exchange });
    em.create(Template, { exchange: trust });

    await GenerateThemesForExchange.call({ em: em }, _trust);
    await GenerateThemesForExchange.call({ em: em }, _binance);
  }
}
const _binance = {
  name: 'binance',
  languages: ['en', 'es'],
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Mobile Dark',
    },
    {
      alias: 'mobile-light',
      name: 'Mobile Light',
    },
  ],
  fields: [
    { en: 'Deposit Details', es: 'Detalles de depósito' },
    { en: 'Amount', es: 'Cantidad' },
    { en: 'Completed', es: 'Completed' },
    {
      en: 'Crypto has arrived in your Binance account. View your spot account balance for more details.',
      es: 'La criptomoneda ha llegado a tu cuenta de Binance. Comprueba el saldo de tu cuenta spot para obtener más información.',
    },
    { en: 'Confirmations', es: 'Confirmaciones' },
    { en: 'Network', es: 'Red' },
    { en: 'Deposit Wallet', es: 'Billetera de depósito' },
    { en: 'Address', es: 'Dirección' },
    { en: 'Txid', es: 'Txid' },
    { en: 'Date', es: 'Fecha' },
    { en: 'Receive', es: 'Simple Earn' },
    { en: 'Receive Crypto With Zero Fee', es: 'USDT APR de hasta 4.06%' },
    { en: 'Discover Now', es: 'Descubrir ahora' },
    { type: HtmlInputType.NUMBER, name: 'Сумма' },
    { type: HtmlInputType.TEXT, name: 'Подтверждения' },
    { type: HtmlInputType.TEXT, name: 'Сеть' },
    { type: HtmlInputType.TEXT, name: 'Имя кошелька' },
    { type: HtmlInputType.TEXT, name: 'Адрес' },
    { type: HtmlInputType.TEXT, name: 'TXID' },
    { type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции' },
    { type: HtmlInputType.SELECT, name: 'Направление', values: ['Отправка', 'Прием'] },
  ],
};
const _trust = {
  name: 'trust',
  languages: ['en'],
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Mobile Dark',
    },
    {
      alias: 'mobile-light',
      name: 'Mobile Light',
    },
  ],
  fields: [
    { type: HtmlInputType.TEXT, name: 'Сумма' },
    { type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции' },
    { type: HtmlInputType.TEXT, name: 'Статус транзакции' },
    { type: HtmlInputType.TEXT, name: 'Адрес' },
    { type: HtmlInputType.TEXT, name: 'Сетевой сбор' },
    { type: HtmlInputType.TEXT, name: 'Nonce' },
    { type: HtmlInputType.SELECT, name: 'Направление', values: ['Отправка', 'Прием'] },
    { en: 'Transfer' },
    { en: 'Date' },
    { en: 'Status' },
    { en: 'Sender' },
    { en: 'Network Fee' },
    { en: 'MORE DETAILS' },
  ],
};
async function GenerateThemesForExchange(this: { em: EntityManager }, data: any) {
  const languages = await this.em.find(Language, { alias: { $in: data.languages } });
  const exchange = await this.em.findOneOrFail(Exchange, { alias: data.name });
  const template = await this.em.findOneOrFail(Template, { exchange });
  const count = { input: 0, text: 0 };
  const inputs = data.fields.map((field: field) =>
    this.em.create(Input, {
      alias: field.type ? `input${++count.input}` : `text${++count.text}`,
      ...(field.type
        ? {
            inputAlias: {
              type: field.type as HtmlInputType,
              name: field.name,
              optional: !!field.optional,
              ...(field.values
                ? {
                    aliasVariants: (field.values as string[]).map((value) => ({
                      value,
                    })),
                  }
                : {}),
            },
          }
        : { inputValues: data.languages.map((language: string) => ({ value: (field as any)[language], language: languages.find((lan) => lan.alias == language) })) }),
    }),
  );
  data.themes.map((theme: any) =>
    this.em.create(Theme, {
      ...theme,
      template,
      themeLanguages: [...Array(languages.length).keys()].map((i) => ({ language: languages[i] })),
      themeInputs: [...Array(inputs.length).keys()].map((i) => ({ input: inputs[i] })),
    }),
  );
}
