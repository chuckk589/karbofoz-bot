import { Dictionary, EntityManager, FilterQuery, Loaded } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Exchange } from '../entities/Exchange';
import { Language } from '../entities/Language';
import { Template } from '../entities/Template';
import { Theme } from '../entities/Theme';
import { Input } from '../entities/Input';
import { HtmlInputType, InputAlias } from '../entities/InputAlias';

type selectValue = { value: string; alias: string };
type field = { [key: string]: string } | { type: HtmlInputType; name: string; optional?: boolean; values?: selectValue[]; alias?: string };
type data = { name: string; languages: string[]; themes: { alias: string; name: string }[]; fields: Set<field> };
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
    const exodus = em.create(Exchange, { alias: 'exodus', name: 'Exodus' });
    const safepal = em.create(Exchange, { alias: 'safepal', name: 'Safepal' });
    //шаблоны
    em.create(Template, { exchange: exchange });
    em.create(Template, { exchange: trust });
    em.create(Template, { exchange: exodus });
    em.create(Template, { exchange: safepal });

    await GenerateThemesForExchange.call({ em: em }, _trust);
    await GenerateThemesForExchange.call({ em: em }, _binance);
    await GenerateThemesForExchange.call({ em: em }, _exodus);
    await GenerateThemesForExchange.call({ em: em }, _safepal);
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
  fields: new Set()
    .add({ en: 'Deposit Details', es: 'Detalles de depósito' })
    .add({ en: 'Amount', es: 'Cantidad' })
    .add({ en: 'Completed', es: 'Completed' })
    .add({
      en: 'Crypto has arrived in your Binance account. View your spot account balance for more details.',
      es: 'La criptomoneda ha llegado a tu cuenta de Binance. Comprueba el saldo de tu cuenta spot para obtener más información.',
    })
    .add({ en: 'Confirmations', es: 'Confirmaciones' })
    .add({ en: 'Network', es: 'Red' })
    .add({ en: 'Deposit Wallet', es: 'Billetera de depósito' })
    .add({ en: 'Address', es: 'Dirección' })
    .add({ en: 'Txid', es: 'Txid' })
    .add({ en: 'Date', es: 'Fecha' })
    .add({ en: 'Receive', es: 'Simple Earn' })
    .add({ en: 'Receive Crypto With Zero Fee', es: 'USDT APR de hasta 4.06%' })
    .add({ en: 'Discover Now', es: 'Descubrir ahora' })
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма' })
    .add({ type: HtmlInputType.TEXT, name: 'Подтверждения' })
    .add({ type: HtmlInputType.TEXT, name: 'Сеть' })
    .add({ type: HtmlInputType.TEXT, name: 'Имя кошелька' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес' })
    .add({ type: HtmlInputType.TEXT, name: 'TXID' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции' })
    .add({
      type: HtmlInputType.SELECT,
      name: 'Направление',
      values: [
        { value: 'Отправка', alias: 'out' },
        { value: 'Прием', alias: 'in' },
      ],
      alias: 'direction',
    }),
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
  fields: new Set()
    .add({ type: HtmlInputType.TEXT, name: 'Сумма' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции' })
    .add({ type: HtmlInputType.TEXT, name: 'Статус транзакции' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес' })
    .add({ type: HtmlInputType.TEXT, name: 'Сетевой сбор' })
    .add({ type: HtmlInputType.TEXT, name: 'Nonce' })
    .add({
      type: HtmlInputType.SELECT,
      name: 'Направление',
      values: [
        { value: 'Отправка', alias: 'out' },
        { value: 'Прием', alias: 'in' },
      ],
      alias: 'direction',
    })
    .add({ en: 'Transfer' })
    .add({ en: 'Date' })
    .add({ en: 'Status' })
    .add({ en: 'Network Fee' })
    .add({ en: 'MORE DETAILS' })
    .add({ en: 'Nonce' })
    .add({ en: 'Sender', alias: 'in' })
    .add({ en: 'Recipient', alias: 'out' }),
};
const _exodus = {
  name: 'exodus',
  languages: ['en'],
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Mobile Dark',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.TEXT, name: 'Сумма' })
    .add({ type: HtmlInputType.TEXT, name: 'Дата создания' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес' })
    .add({ type: HtmlInputType.TEXT, name: 'TXID' })
    .add({ type: HtmlInputType.NUMBER, name: 'Текущий баланс' })
    .add({
      type: HtmlInputType.SELECT,
      name: 'Направление',
      values: [
        { value: 'Отправка', alias: 'out' },
        { value: 'Прием', alias: 'in' },
      ],
      alias: 'direction',
    })
    .add({ type: HtmlInputType.TEXT, name: 'Комиссия' })
    .add({ en: 'TRANSACTION DETAILS' })
    .add({ en: 'Personal Note' })
    .add({ en: 'Add Note' })
    .add({ en: 'Created' })
    .add({ en: 'Transaction ID' })
    .add({ en: 'Now' })
    .add({ en: 'Need help?' })
    .add({ en: 'Fee' })
    .add({ en: 'Received from', alias: 'ind' })
    .add({ en: 'Sent to', alias: 'outd' })
    .add({ en: 'Received', alias: 'inf' })
    .add({ en: 'Sent', alias: 'outf' }),
};
const _safepal = {
  name: 'safepal ',
  languages: ['ru'],
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
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма' })
    .add({ type: HtmlInputType.TEXT, name: 'Комиссия' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата' })
    .add({ type: HtmlInputType.TEXT, name: 'От' })
    .add({ type: HtmlInputType.TEXT, name: 'На' })
    .add({ type: HtmlInputType.TEXT, name: 'TxID' })
    .add({ type: HtmlInputType.NUMBER, name: 'Высота' })
    .add({ type: HtmlInputType.NUMBER, name: 'Block' })
    .add({ type: HtmlInputType.NUMBER, name: 'Nonce' })
    .add({
      type: HtmlInputType.SELECT,
      name: 'Направление',
      values: [
        { value: 'Отправка', alias: 'out' },
        { value: 'Прием', alias: 'in' },
      ],
      alias: 'direction',
    })
    .add({ ru: 'Детали транзакции' })
    .add({ ru: 'Статус' })
    .add({ ru: 'Комиссия сети' })
    .add({ ru: 'Время' })
    .add({ ru: 'От' })
    .add({ ru: 'На' })
    .add({ ru: 'Transaction Hash' })
    .add({ ru: 'Block' })
    .add({ ru: 'Nonce' })
    .add({ ru: 'Получить', alias: 'in' })
    .add({ ru: 'Отправить', alias: 'out' }),
};
async function GenerateThemesForExchange(this: { em: EntityManager }, data: data) {
  const languages = await this.em.find(Language, { alias: { $in: data.languages } });
  const exchange = await this.em.findOneOrFail(Exchange, { alias: data.name });
  const template = await this.em.findOneOrFail(Template, { exchange });
  const count = { input: 0, text: 0 };
  const inputs: Input[] = [];
  for await (const field of data.fields) {
    const inputalias = await this.em.findOne(InputAlias, { name: field.name });
    inputs.push(
      this.em.create(Input, {
        alias: field.type ? field.alias || `input${++count.input}` : field.alias || `text${++count.text}`,
        ...(field.type
          ? {
              inputAlias: inputalias || {
                type: field.type as HtmlInputType,
                name: field.name,
                optional: !!field.optional,
                ...(field.values
                  ? {
                      aliasVariants: field.values as selectValue[],
                    }
                  : {}),
              },
            }
          : { inputValues: data.languages.map((language: string) => ({ value: (field as any)[language], language: languages.find((lan) => lan.alias == language) })) }),
      }),
    );
  }

  await this.em.flush();
  data.themes.map((theme: any) =>
    this.em.create(Theme, {
      ...theme,
      template,
      themeLanguages: [...Array(languages.length).keys()].map((i) => ({ language: languages[i] })),
      themeInputs: [...Array(inputs.length).keys()].map((i) => ({ input: inputs[i] })),
    }),
  );
}
