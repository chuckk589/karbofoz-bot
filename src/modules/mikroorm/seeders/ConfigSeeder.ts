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
    const bsc = em.create(Network, { alias: 'bep20', name: 'BSC', coin: 'BNB' });
    const eth = em.create(Network, { alias: 'erc20', name: 'ETH', coin: 'ETH' });
    const trx = em.create(Network, { alias: 'trc20', name: 'TRX', coin: 'TRX' });
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
          constants: [
            { alias: 'cs_confirm', value: '20 / 15' },
            { alias: 'cs_com', value: '0.21 0.29 1' },
          ],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_confirm', value: '65 / 64' },
            { alias: 'cs_com', value: '4.5 5.9 1' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_confirm', value: '50 / 1' },
            { alias: 'cs_com', value: '1' },
          ],
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
          constants: [{ alias: 'cs_com', value: '0.0001 0.00025 9' }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '0.003 0.004 18' }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '0' }],
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
          constants: [{ alias: 'cs_com', value: '0.0002 0.0003 8' }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '0.01 0.03 8' }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '12 28 4' }],
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
          constants: [
            { alias: 'cs_height', value: '22197612' },
            { alias: 'cs_noncein', value: '4236183' },
            { alias: 'cs_nonceout', value: '9' },
            { alias: 'cs_comin', value: '0.0005 0.0008 8' },
            { alias: 'cs_comout', value: '0.0002 0.0004 8' },
          ],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_height', value: '16984270' },
            { alias: 'cs_noncein', value: '6374408' },
            { alias: 'cs_nonceout', value: '0' },
            { alias: 'cs_com', value: '0.0002 0.0004 8' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'gate',
      name: 'Gate.io',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '1' }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '7.7' }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '1' }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'huobi',
      name: 'Huobi',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '4 8 8' }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '4 8 8' }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '1.00000000' }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'kucoin',
      name: 'KuCoin',
      exchangeNetworks: [
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_com', value: '20.00' },
            { alias: 'cs_block', value: '12/64' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_com', value: '1.00' },
            { alias: 'cs_block', value: '3/3' },
          ],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'bitfinex',
      name: 'Bitfinex',
      exchangeNetworks: [
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_idin', value: '20210896' },
            { alias: 'cs_idout', value: '20279138' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_idin', value: '20210896' },
            { alias: 'cs_idout', value: '20279138' },
          ],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'bitmart',
      name: 'BitMart',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_proc', value: '25/25' },
            { alias: 'cs_com', value: '1' },
            { alias: 'cs_id', value: '16953075' },
          ],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_proc', value: '25/25' },
            { alias: 'cs_com', value: '11' },
            { alias: 'cs_id', value: '16953075' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_proc', value: '50/50' },
            { alias: 'cs_com', value: '1' },
            { alias: 'cs_id', value: '16953075' },
          ],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'cryptocom',
      name: 'Cryptocom',
      exchangeNetworks: [
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '10' }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'okx',
      name: 'OKX',
      exchangeNetworks: [
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '3 7' }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '1' }],
        },
      ],
    });
    //devices
    em.create(Device, { alias: 'samsung', name: 'Samsung' });
    em.create(Device, { alias: 'iphone', name: 'Iphone' });
    em.create(Device, { alias: 'xiaomi', name: 'Xiaomi' });
    em.create(Device, { alias: 'realme', name: 'Realme' });

    await GenerateDeviceInputs.call({ em: em }, _xiaomi);
    await GenerateDeviceInputs.call({ em: em }, _samsung);
    await GenerateDeviceInputs.call({ em: em }, _iphone);
    await GenerateDeviceInputs.call({ em: em }, _realme);

    await GenerateThemesForExchange.call({ em: em }, _binance);
    await GenerateThemesForExchange.call({ em: em }, _trust);
    await GenerateThemesForExchange.call({ em: em }, _exodus);
    await GenerateThemesForExchange.call({ em: em }, _safepal);
    await GenerateThemesForExchange.call({ em: em }, _gate);
    await GenerateThemesForExchange.call({ em: em }, _huobi);
    await GenerateThemesForExchange.call({ em: em }, _kucoin);
    await GenerateThemesForExchange.call({ em: em }, _bitfinex);
    await GenerateThemesForExchange.call({ em: em }, _bitmart);
    await GenerateThemesForExchange.call({ em: em }, _cryptocom);
    await GenerateThemesForExchange.call({ em: em }, _okx);
  }
}
/////////////////////////////////////////
const _binance = {
  name: 'binance',
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
    .add({ en: 'Deposit Details', es: 'Detalles de depósito', alias: 'indep' })
    .add({ en: 'Amount', es: 'Cantidad' })
    .add({ en: 'Completed', es: 'Completed' })
    .add({
      en: 'Crypto has arrived in your Binance account. View your spot account balance for more details.',
      es: 'La criptomoneda ha llegado a tu cuenta de Binance. Comprueba el saldo de tu cuenta spot para obtener más información.',
      alias: 'inmsg',
    })
    .add({ en: 'Confirmations', es: 'Confirmaciones' })
    .add({ en: 'Network', es: 'Red' })
    .add({ en: 'Deposit Wallet', es: 'Billetera de depósito', alias: 'inwlt' })
    .add({ en: 'Address', es: 'Dirección' })
    .add({ en: 'Txid', es: 'Txid' })
    .add({ en: 'Date', es: 'Fecha' })
    .add({ en: 'Receive', es: 'Simple Earn' })
    .add({ en: 'Receive Crypto With Zero Fee', es: 'USDT APR de hasta 4.06%' })
    .add({ en: 'Discover Now', es: 'Descubrir ahora' })
    .add({ en: 'Spot Wallet', es: 'Billetera Spot' })
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма' })
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
    })
    .add({ en: 'Withdrawal Details', alias: 'outdep' })
    .add({ en: 'Crypto transferred out of Binance. Please contact the recipient platform for your transaction receipt.', alias: 'outmsg' })
    .add({ en: "Why hasn't my withdrawal arrived?" })
    .add({ en: 'Withdrawal Wallet', alias: 'outwlt' })
    .add({ en: 'Save address' })
    .add({ en: 'Network fee' })
    .add({ en: 'Need help? Check FAQs' })
    .add({ en: 'Scam Report' }),
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
    .add({ en: 'Recipient', alias: 'out' })
    .add({ en: 'Today' }),
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
    .add({ en: 'Timestamp' })
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
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date' })
    .add({ type: HtmlInputType.TEXT, name: 'От' })
    .add({ type: HtmlInputType.TEXT, name: 'На' })
    .add({ type: HtmlInputType.TEXT, name: 'TxID', optional: true, alias: 'txid' })
    .add({ type: HtmlInputType.TEXT, name: 'Transaction Hash', optional: true })
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
    .add({ ru: 'Nonce' })
    .add({ ru: 'TxID' })
    .add({ ru: 'Высота' })
    .add({ ru: 'Посмотреть в обозревателе блокчейна' }),
};
const _gate = {
  name: 'gate',
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
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date' })
    .add({ type: HtmlInputType.TEXT, name: 'TxID', alias: 'txid' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
    .add({ type: HtmlInputType.NUMBER, name: 'ID Ордера', optional: true, alias: 'order' })
    .add({
      type: HtmlInputType.SELECT,
      name: 'Направление',
      values: [
        { value: 'Отправка', alias: 'out' },
        { value: 'Прием', alias: 'in' },
      ],
      alias: 'direction',
    })
    .add({ en: 'Deposit Details', alias: 't1in' })
    .add({ en: 'Withdrawal Details', alias: 't1out' })
    .add({ en: 'Quantity', alias: 't2' })
    .add({ en: 'Success', alias: 't3' })
    .add({ en: 'Deposit Method', alias: 't4in' })
    .add({ en: 'Withdrawal Method', alias: 't4out' })
    .add({ en: 'Onchain Deposit', alias: 't5in' })
    .add({ en: 'Onchain Withdrawal', alias: 't5out' })
    .add({ en: 'Time', alias: 't6' })
    .add({ en: 'Network', alias: 't7' })
    .add({ en: 'Order ID', alias: 't8' })
    .add({ en: 'Deposit Address', alias: 't9in' })
    .add({ en: 'Address', alias: 't9out' })
    .add({ en: 'TXID', alias: 't10' })
    .add({ en: 'Fee', alias: 't11' }),
};
const _huobi = {
  name: 'huobi',
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
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date' })
    .add({ type: HtmlInputType.TEXT, name: 'TxID', alias: 'txid' })
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
    .add({ en: 'Type', alias: 't1' })
    .add({ en: 'Ordinary Deposit', alias: 't2in' })
    .add({ en: 'General Withdrawal', alias: 't2out' })
    .add({ en: 'Status', alias: 't3' })
    .add({ en: 'Completed', alias: 't4' })
    .add({ en: 'Copy', alias: 't5' })
    .add({ en: 'Time', alias: 't6' })
    .add({ en: 'Withdrawal Address', alias: 't7' })
    .add({ en: 'Withdrawal Network', alias: 't8' })
    .add({ en: 'Fees', alias: 't9' })
    .add({ en: 'TxID', alias: 't10' }),
};
const _kucoin = {
  name: 'kucoin',
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
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date' })
    .add({ type: HtmlInputType.TEXT, name: 'TxID', alias: 'txid' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
    .add({ type: HtmlInputType.TEXT, name: 'TxHash', alias: 'thash' })
    .add({ type: HtmlInputType.TEXTAREA, name: 'Сообщение', alias: 'msg', optional: true })
    .add({
      type: HtmlInputType.SELECT,
      name: 'Направление',
      values: [
        { value: 'Отправка', alias: 'out' },
        { value: 'Прием', alias: 'in' },
      ],
      alias: 'direction',
    })
    .add({ en: 'Deposit Details', alias: 't1in' })
    .add({ en: 'Withdrawal Details', alias: 't1out' })
    .add({ en: 'Completed', alias: 't2' })
    .add({ en: 'Deposit completed. View details in your account', alias: 't3' })
    .add({ en: 'Block(s)', alias: 't4' })
    .add({ en: 'Time', alias: 't5' })
    .add({ en: 'Network', alias: 't6' })
    .add({ en: 'Deposit Account', alias: 't7in' })
    .add({ en: 'Withdrawal Account', alias: 't7out' })
    .add({ en: 'Main Account', alias: 't8' })
    .add({ en: 'Remarks', alias: 't9' })
    .add({ en: 'Address/Account', alias: 't10' })
    .add({ en: 'TxHash', alias: 't11' })
    .add({ en: 'Fee', alias: 't12' }),
};
const _bitfinex = {
  name: 'bitfinex',
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
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date' })
    .add({ type: HtmlInputType.TEXT, name: 'TxID', alias: 'txid' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
    .add({
      type: HtmlInputType.DATETIME_LOCAL,
      name: 'Обновлено',
      alias: 'dateup',
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
      optional: true,
    })
    .add({
      type: HtmlInputType.SELECT,
      name: 'Направление',
      values: [
        { value: 'Отправка', alias: 'out' },
        { value: 'Прием', alias: 'in' },
      ],
      alias: 'direction',
    })
    .add({ en: 'Deposit', alias: 't1in' })
    .add({ en: 'Withdraw', alias: 't1out' })
    .add({ en: 'ID', alias: 't2' })
    .add({ en: 'Status', alias: 't3' })
    .add({ en: 'Completed', alias: 't4' })
    .add({ en: 'Amount', alias: 't5' })
    .add({ en: 'Wallet', alias: 't6' })
    .add({ en: 'Exchange', alias: 't7' })
    .add({ en: 'Created', alias: 't8' })
    .add({ en: 'Updated', alias: 't9' })
    .add({ en: 'Address', alias: 't10' })
    .add({ en: 'Txid', alias: 't11' })
    .add({ en: 'Permalink', alias: 't12' })
    .add({ en: '/deposit/', alias: 't13in' })
    .add({ en: '/withdraw/', alias: 't13out' })
    .add({ en: "If you didn't make this withdrawal then its possible your Account has been compromised. To prevent further account actions, ", alias: 't14' })
    .add({ en: 'freeze your account.', alias: 't15' }),
};
const _bitmart = {
  name: 'bitmart',
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
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date' })
    .add({ type: HtmlInputType.TEXT, name: 'TxID', alias: 'txid' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address', optional: true })
    .add({
      type: HtmlInputType.SELECT,
      name: 'Направление',
      values: [
        { value: 'Отправка', alias: 'out' },
        { value: 'Прием', alias: 'in' },
      ],
      alias: 'direction',
    })
    .add({ en: 'Detail', alias: 't1' })
    .add({ en: 'Create', alias: 't2' })
    .add({ en: 'Processing', alias: 't3' })
    .add({ en: 'Complete', alias: 't4' })
    .add({ en: 'Received Qty', alias: 't5' })
    .add({ en: 'Fee', alias: 't6' })
    .add({ en: 'Transaction ID', alias: 't7' })
    .add({ en: 'Created', alias: 't8' })
    .add({ en: 'Finished', alias: 't9' })
    .add({ en: 'TXID', alias: 't10' })
    .add({ en: 'Copy TXID', alias: 't11' })
    .add({ en: 'Check TXID', alias: 't12' })
    .add({ en: 'Notify me with SMS when deposit and withdrawal get done', alias: 't13' })
    .add({ en: 'Enable now', alias: 't14' })
    .add({ en: 'Address', alias: 't15' }),
};
const _cryptocom = {
  name: 'cryptocom',
  languages: ['en'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Mobile Light',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date' })
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
    .add({ en: 'Withdraw', alias: 't1out' })
    .add({ en: 'Deposit', alias: 't1in' })
    .add({ en: 'Completed', alias: 't2' })
    .add({ en: 'Withdrawal details', alias: 't3out' })
    .add({ en: 'Deposit details', alias: 't3in' })
    .add({ en: 'Sending', alias: 't4' })
    .add({ en: 'Withdraw to', alias: 't5out' })
    .add({ en: 'Deposit from', alias: 't5in' })
    .add({ en: 'Network Type', alias: 't6' })
    .add({ en: 'Fee', alias: 't7' })
    .add({ en: 'Total', alias: 't8' }),
};
const _okx = {
  name: 'okx',
  languages: ['en'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Mobile Light',
    },
    {
      alias: 'mobile-dark',
      name: 'Mobile Dark',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date' })
    .add({ type: HtmlInputType.TEXT, name: 'TxID', alias: 'txid' })
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
    .add({ en: 'Transaction details', alias: 't1' })
    .add({ en: 'deposited', alias: 't2in' })
    .add({ en: 'withdrawn', alias: 't2out' })
    .add({ en: 'Status', alias: 't3' })
    .add({ en: 'Completed', alias: 't4' })
    .add({ en: 'Date', alias: 't5' })
    .add({ en: 'From', alias: 't6' })
    .add({ en: 'To', alias: 't7' })
    .add({ en: 'Network', alias: 't8' })
    .add({ en: 'Transaction ID', alias: 't9' })
    .add({ en: 'Fee', alias: 't10' })
    .add({ en: "Sender's wallet", alias: 't11' }),
};

/////////////////////////////////////////
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
const _realme = {
  name: 'realme',
  fields: [
    { alias: 'time', name: 'Время', type: HtmlInputType.TIME },
    { alias: 'nfc', name: 'NFC' },
    { alias: 'alarm', name: 'alarm' },
    { alias: 'bluetooth', name: 'Bluetooth' },
    { alias: 'speed', name: 'Speed', type: HtmlInputType.NUMBER },
    { alias: 'volte', name: 'voLTE' },
    {
      alias: 'simnum',
      name: 'SIM',
      type: HtmlInputType.SELECT,
      values: [
        { value: '1 SIM', alias: 'sim1' },
        { value: 'Dual SIM', alias: 'sim2' },
      ],
    },
    { alias: 'bar1', name: 'Sim 1 signal', type: HtmlInputType.NUMBER, hint: 'Значения 1-4' },
    { alias: 'bar2', name: 'Sim2 signal', type: HtmlInputType.NUMBER, hint: 'Значения 1-4', dependsOn: 'simnum', dependsValue: 'sim2' },
    { alias: 'wifiAP', name: 'Wi-Fi access point' },
    { alias: 'wifiAPS', name: 'Wi-Fi AP signal', type: HtmlInputType.NUMBER, dependsOn: 'wifiAP' },
    { alias: 'charge', name: 'Battery charge %', type: HtmlInputType.NUMBER },
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
