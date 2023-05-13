import { Dictionary, EntityManager, FilterQuery, Loaded } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Exchange } from '../entities/Exchange';
import { Language } from '../entities/Language';
import { Theme } from '../entities/Theme';
import { Input } from '../entities/Input';
import { HtmlInputType, InputAlias } from '../entities/InputAlias';
import { Network } from '../entities/Network';
import { Currency } from '../entities/Currency';
import { Device } from '../entities/Device';
import { BarInput } from '../entities/BarInput';
import { BarInputVariant } from '../entities/BarInputVariant';
import { DeviceBarInput } from '../entities/DeviceBarInput';

type selectValue = { value: string; alias: string };
type field = { [key: string]: string } | { type: HtmlInputType; name: string; optional?: boolean; values?: selectValue[]; alias?: string };
type data = { name: string; statusbar?: boolean; languages: string[]; themes: { alias: string; name: string }[]; fields: Set<field> };

type deviceData = { name: string; fields: field[] };
export class ConfigSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // сети
    const bsc = em.create(Network, { alias: 'bep20', name: 'BSC' });
    const eth = em.create(Network, { alias: 'erc20', name: 'ETH' });
    const trx = em.create(Network, { alias: 'trc20', name: 'TRX' });
    //валюты
    const usdt = em.create(Currency, { alias: 'usdt', name: 'USDT' });
    //языки
    em.create(Language, { alias: 'en', name: 'Английский' });
    em.create(Language, { alias: 'es', name: 'Испанский' });
    em.create(Language, { alias: 'ru', name: 'Русский' });
    em.create(Language, { alias: 'ua', name: 'Украинский' });
    //биржи
    em.create(Exchange, {
      alias: 'binance',
      name: 'Binance',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'trust',
      name: 'Trust',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'exodus',
      name: 'Exodus',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'safepal',
      name: 'Safepal',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
        },
      ],
    });
    //devices
    em.create(Device, { alias: 'samsung', name: 'Samsung' });
    em.create(Device, { alias: 'iphone', name: 'Iphone' });
    em.create(Device, { alias: 'xiaomi', name: 'Xiaomi' });

    await GenerateDeviceInputs.call({ em: em }, _xiaomi);
    await GenerateDeviceInputs.call({ em: em }, _samsung);
    await GenerateDeviceInputs.call({ em: em }, _iphone);

    await GenerateThemesForExchange.call({ em: em }, _binance);
    await GenerateThemesForExchange.call({ em: em }, _trust);
    await GenerateThemesForExchange.call({ em: em }, _exodus);
    await GenerateThemesForExchange.call({ em: em }, _safepal);
  }
}
const _binance = {
  name: 'binance',
  languages: ['en', 'es'],
  statusbar: true,
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
    .add({ type: HtmlInputType.NUMBER, name: 'Подтверждения' })
    .add({ type: HtmlInputType.TEXT, name: 'Имя кошелька' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
    .add({ type: HtmlInputType.TEXT, name: 'TXID', alias: 'txid' })
    .add({
      type: HtmlInputType.DATETIME_LOCAL,
      name: 'Дата транзакции',
      alias: 'date',
      values: [
        { value: 'Текущее время ', alias: '0' },
        { value: '2 минуты назад ', alias: '120' },
        { value: '5 минут назад ', alias: '300' },
        { value: '10 минут назад ', alias: '600' },
        { value: '30 минут назад ', alias: '1800' },
        { value: '1 час назад ', alias: '3600' },
        { value: '2 часа назад ', alias: '7200' },
        { value: '3 часа назад  ', alias: '10800' },
        { value: '6 часов назад ', alias: '21600' },
        { value: '12 часов назад ', alias: '43200' },
        { value: '1 день назад ', alias: '86400' },
      ],
    })
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
  statusbar: true,
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
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
    .add({ type: HtmlInputType.NUMBER, name: 'Сетевой сбор' })
    .add({ type: HtmlInputType.TEXT, name: 'Nonce', optional: true })
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
    .add({ en: 'Completed' })
    .add({ en: 'Sender', alias: 'in' })
    .add({ en: 'Recipient', alias: 'out' }),
};
const _exodus = {
  name: 'exodus',
  languages: ['en'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Mobile Dark',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
    .add({ type: HtmlInputType.TEXT, name: 'TXID', alias: 'txid' })
    .add({ type: HtmlInputType.NUMBER, name: 'Текущий баланс', optional: true })
    .add({ type: HtmlInputType.NUMBER, name: 'Комиссия', optional: true })
    .add({
      type: HtmlInputType.SELECT,
      name: 'Направление',
      values: [
        { value: 'Отправка', alias: 'out' },
        { value: 'Прием', alias: 'in' },
      ],
      alias: 'direction',
    })
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
    .add({ en: 'Sent', alias: 'outf' })
    .add({ en: 'Contact Support' }),
};
const _safepal = {
  name: 'safepal',
  languages: ['ru'],
  statusbar: true,
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
    .add({ type: HtmlInputType.NUMBER, name: 'Комиссия', optional: true })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date' })
    .add({ type: HtmlInputType.TEXT, name: 'От' })
    .add({ type: HtmlInputType.TEXT, name: 'На' })
    .add({ type: HtmlInputType.TEXT, name: 'TxID', optional: true, alias: 'txid' })
    .add({ type: HtmlInputType.TEXT, name: 'Transaction Hash', optional: true })
    .add({ type: HtmlInputType.NUMBER, name: 'Высота', optional: true })
    .add({ type: HtmlInputType.NUMBER, name: 'Block', optional: true })
    .add({ type: HtmlInputType.NUMBER, name: 'Nonce', optional: true })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
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
    .add({ ru: 'Успех' })
    .add({ ru: 'Получить', alias: 'in' })
    .add({ ru: 'Отправить', alias: 'out' })
    .add({ ru: 'Block' })
    .add({ ru: 'Nonce' })
    .add({ ru: 'TxID' })
    .add({ ru: 'Высота' })
    .add({ ru: 'Посмотреть в обозревателе блокчейна' }),
};

const _xiaomi = {
  name: 'xiaomi',
  fields: [
    { alias: 'wifiAPS', name: 'Wi-Fi AP signal', type: HtmlInputType.NUMBER, dependsOn: 'wifiAP' },
    { alias: 'wifiS', name: 'Wi-Fi signal', type: HtmlInputType.NUMBER, hint: 'Значения 1-5' },
    { alias: '4g', name: '4g signal', type: HtmlInputType.NUMBER, hint: 'Значения 1-5' },
    { alias: 'bluetooth', name: 'Bluetooth' },
    { alias: 'charge', name: 'Battery charge %', type: HtmlInputType.NUMBER },
    { alias: 'time', name: 'Время', type: HtmlInputType.TIME },
    { alias: 'moon', name: 'moon' },
    { alias: 'vibro', name: 'vibro' },
    { alias: 'alarm', name: 'alarm' },
    { alias: 'nfc', name: 'NFC' },
    { alias: 'vpn', name: 'VPN' },
    { alias: 'cog', name: 'Cog' },
    { alias: 'volte', name: 'voLTE' },
    { alias: 'wifiAP', name: 'Wi-Fi access point' },
  ],
};

const _iphone = {
  name: 'iphone',
  fields: [
    { alias: 'geoloc', name: 'Geolocation' },
    {
      alias: 'network',
      name: 'WiFi/LTE',
      type: HtmlInputType.SELECT,
      values: [
        {
          value: 'LTE',
          alias: 'lte',
        },
        {
          value: 'WiFi',
          alias: 'wifi',
        },
      ],
    },

    { alias: 'wifiS', name: 'Wi-Fi signal', type: HtmlInputType.NUMBER, hint: 'Значения 1-3' },
    {
      alias: 'simnum',
      name: 'SIM',
      type: HtmlInputType.SELECT,
      values: [
        { value: '1 SIM', alias: 'sim1' },
        { value: 'Dual SIM', alias: 'sim2' },
      ],
    },
    { alias: '4g', name: '4g signal', type: HtmlInputType.NUMBER, hint: 'Значения 1-4' },
    { alias: 'charge', name: 'Battery charge %', type: HtmlInputType.NUMBER },
    { alias: 'time', name: 'Время', type: HtmlInputType.TIME },
  ],
};

const _samsung = {
  name: 'samsung',
  fields: [
    { alias: 'time', name: 'Время', type: HtmlInputType.TIME },
    {
      alias: 'simnum',
      name: 'SIM',
      type: HtmlInputType.SELECT,
      values: [
        { value: '1 SIM', alias: 'sim1' },
        { value: 'Dual SIM', alias: 'sim2' },
      ],
    },
    { alias: 'wifiS1', name: 'Wi-Fi 1 signal', type: HtmlInputType.NUMBER, hint: 'Значения 1-4' },
    { alias: 'wifiS2', name: 'Wi-Fi 2 signal', type: HtmlInputType.NUMBER, hint: 'Значения 1-4', dependsOn: 'simnum', dependsValue: 'sim2' },
    {
      alias: 'sound',
      name: 'Sound',
      type: HtmlInputType.SELECT,
      values: [
        {
          value: 'None',
          alias: 'null',
        },
        {
          value: 'No sound',
          alias: 'nosound',
        },
        {
          value: 'No vibro',
          alias: 'novibro',
        },
      ],
    },
    {
      alias: 'wifiShare',
      name: 'Wi-Fi share',
      type: HtmlInputType.SELECT,
      values: [
        { value: 'Раздача', alias: 'out' },
        { value: 'Прием', alias: 'in' },
      ],
    },
    { alias: 'wifiS', name: 'Wi-Fi signal', type: HtmlInputType.NUMBER, hint: 'Значения 1-4', dependsOn: 'wifiShare', dependsValue: 'in' },
    { alias: 'volte', name: 'voLTE', dependsOn: 'wifiShare', dependsValue: 'in' },
    {
      alias: 'wifiMode',
      name: 'H+ / Volte',
      type: HtmlInputType.SELECT,
      values: [
        { value: 'H+', alias: 'h' },
        { value: 'Volte', alias: 'volte' },
      ],
      dependsOn: 'wifiShare',
      dependsValue: 'out',
    },
    { alias: 'charge', name: 'Battery charge %', type: HtmlInputType.NUMBER },
    { alias: 'geoloc', name: 'Geolocation' },
    { alias: 'geoloc2', name: 'Geolocation2' },
    { alias: 'vpn', name: 'VPN' },
  ],
};

async function GenerateThemesForExchange(this: { em: EntityManager }, data: data) {
  const languages = await this.em.find(Language, { alias: { $in: data.languages } });
  const exchange = await this.em.findOneOrFail(Exchange, { alias: data.name });
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
      exchange,
      statusbar: data.statusbar,
      themeLanguages: [...Array(languages.length).keys()].map((i) => ({ language: languages[i] })),
      themeInputs: [...Array(inputs.length).keys()].map((i) => ({ input: inputs[i] })),
    }),
  );
}

async function GenerateDeviceInputs(this: { em: EntityManager }, data: deviceData) {
  const device = await this.em.findOneOrFail(Device, { alias: data.name });
  const barinputs = await this.em.find(BarInput, { alias: { $in: data.fields.map((field) => field.alias) } });
  data.fields.map((field: field & { hint?: string; dependsOn?: string; dependsValue?: string }) => {
    let existing = barinputs.find((barinput) => barinput.alias == field.alias);
    if (!existing) {
      existing = this.em.create(BarInput, {
        alias: field.alias,
        name: field.name,
        type: field.type as HtmlInputType,
        ...(field.values ? { variants: (field.values as any).map((value: any) => this.em.create(BarInputVariant, { name: value.value, alias: value.alias })) } : {}),
      });
    }
    return this.em.create(DeviceBarInput, {
      device,
      input: existing,
      hint: field.hint,
      dependsOn: field.dependsOn,
      dependsValue: field.dependsValue,
    });
  });
  await this.em.flush();
}
