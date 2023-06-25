import { Dictionary, EntityManager, FilterQuery, Loaded, t } from '@mikro-orm/core';
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
type field = { type: HtmlInputType; name: string; optional?: boolean; hint?: string; values?: selectValue[]; alias: string; dependsOn?: dependsOnField[] };
type data = { name: string; statusbar?: boolean; languages: string[]; themes: { alias: string; name: string }[]; fields: Set<field> };
type deviceData = { name: string; fields: field[] };

export type dependsOnField = { field: string; value?: string[] };
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
    em.create(Language, { alias: 'uk', name: 'Украинский' });
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
            { alias: 'cs_com', value: '0.21 0.29 8' },
          ],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_confirm', value: '65 / 64' },
            { alias: 'cs_com', value: '4.5 5.9 8' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_confirm', value: '50 / 1' },
            { alias: 'cs_com', value: '1.00000000' },
          ],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'trust',
      name: 'Trust Wallet',
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
      name: 'SafePal',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_step', value: '22197612 1 2023-04-05,21:00:00' },
            { alias: 'cs_noncein', value: '4236183' },
            { alias: 'cs_nonceout', value: '9' },
            { alias: 'cs_comin', value: '0.0005 0.0008 8' },
            { alias: 'cs_comout', value: '0.0002 0.0004 8' },
            { alias: 'cs_network', value: '0x55d...97955' },
          ],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_step', value: '16984270 1 2023-04-05,21:00:00' },
            { alias: 'cs_noncein', value: '6374408' },
            { alias: 'cs_nonceout', value: '0' },
            { alias: 'cs_com', value: '0.0002 0.0004 8' },
            { alias: 'cs_network', value: '0xdac...31ec7' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_step', value: '50035377 1 2023-04-05,21:00:00' },
            { alias: 'cs_network', value: 'TR7NH...jLj6t' },
          ],
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
          constants: [
            { alias: 'cs_com', value: '1' },
            { alias: 'cs_stepin', value: '140861850 5' },
            { alias: 'cs_stepout', value: '34264669 5' },
          ],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_com', value: '7.7' },
            { alias: 'cs_stepin', value: '140861850 5' },
            { alias: 'cs_stepout', value: '34264669 5' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_com', value: '1' },
            { alias: 'cs_stepin', value: '140861850 5' },
            { alias: 'cs_stepout', value: '34264669 5' },
          ],
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
            { alias: 'cs_stepin', value: '20210896 5 2023-04-23,11:30:00' },
            { alias: 'cs_stepout', value: '20279138 5 2023-04-23,11:30:00' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_stepin', value: '20210896 5 2023-04-23,11:30:00' },
            { alias: 'cs_stepout', value: '20279138 5 2023-04-23,11:30:00' },
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
            { alias: 'cs_comin', value: '0' },
            { alias: 'cs_comout', value: '1' },
            { alias: 'cs_step', value: '16953075 5 2023-04-07,18:00:00' },
            { alias: 'cs_pair', value: 'BSC' },
          ],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_proc', value: '25/25' },
            { alias: 'cs_comin', value: '0' },
            { alias: 'cs_comout', value: '11' },
            { alias: 'cs_step', value: '16953075 5 2023-04-07,18:00:00' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_proc', value: '50/50' },
            { alias: 'cs_comin', value: '0' },
            { alias: 'cs_comout', value: '1' },
            { alias: 'cs_step', value: '16953075 5 2023-04-07,18:00:00' },
          ],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'cryptocom',
      name: 'Crypto.com',
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
          constants: [{ alias: 'cs_com', value: '3 7 7' }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '1' }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'ledger',
      name: 'Ledger',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_comin', value: '0.0001 0.0002 8' },
            { alias: 'cs_comout', value: '0.0002 0.0003 8' },
            { alias: 'cs_acc', value: 'Binance-Peg' },
          ],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_step', value: '232126 0.21' },
            {
              alias: 'cs_comin',
              value: '0.002 0.003 8',
            },
            { alias: 'cs_comout', value: '0.001 0.002 8' },
            { alias: 'cs_acc', value: 'Tether' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_step', value: '945497 0.05' },
            {
              alias: 'cs_comin',
              value: '18 28 4',
            },
            { alias: 'cs_comout', value: '12 18 4' },
            { alias: 'cs_acc', value: 'Tether' },
          ],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'metamask',
      name: 'MetaMask',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_net', value: 'Binance Smart Chain BEP-20' },
            { alias: 'cs_com', value: '0.00005 0.00007 5' },
          ],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_net', value: 'Ethereum Main Network' },
            { alias: 'cs_com', value: '0.004 0.014 5' },
          ],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'mexc',
      name: 'MEXC',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '1' }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_com', value: '4' },
            { alias: 'cs_tx', value: ':0' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '1' }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'payeer',
      name: 'PAYEER',
      exchangeNetworks: [
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_com', value: '5' },
            { alias: 'cs_stepin', value: '1862877778 5 04.05.2023,23:50' },
            { alias: 'cs_stepout', value: '1862892926 5 04.05.2023,23:50' },
            { alias: 'cs_sys', value: 'Tether' },
            { alias: 'cs_sys2', value: 'tether_erc_20' },
            { alias: 'cs_appr', value: '43' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_com', value: '2.5' },
            { alias: 'cs_stepin', value: '1862877778 5 04.05.2023,23:50' },
            { alias: 'cs_sys', value: 'USDT TRC-20' },
            { alias: 'cs_stepout', value: '1862892926 5 04.05.2023,23:50' },
            { alias: 'cs_appr', value: '49' },
            { alias: 'cs_sys2', value: 'tether_trc_20' },
          ],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'bitget',
      name: 'Bitget',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_comout', value: '3 6 8' }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_comout', value: '3 6 8' }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_comout', value: '1' }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'kraken',
      name: 'Kraken',
      exchangeNetworks: [
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_comout', value: '2.50' },
            { alias: 'cs_comin', value: '0.00' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_comout', value: '1.00' },
            { alias: 'cs_comin', value: '0.00' },
          ],
        },
      ],
    });

    em.create(Exchange, {
      alias: 'coinbase',
      name: 'Coinbase',
      exchangeNetworks: [
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_com', value: '2 8 6' },
            { alias: 'cs_step', value: '231900 13' },
          ],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'bitpapa',
      name: 'Bitpapa',
      exchangeNetworks: [
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '3' }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'exmo',
      name: 'EXMO',
      exchangeNetworks: [
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_stepin', value: '31816126 1 04.05.2023,00:30' },
            { alias: 'cs_stepout', value: '11862389 1 04.05.2023,00:30' },
          ],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [
            { alias: 'cs_stepin', value: '31813729 1 04.05.2023,00:30' },
            { alias: 'cs_stepout', value: '11861663 1 04.05.2023,00:30' },
          ],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'garantex',
      name: 'Garantex',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_comout', value: '0.5' }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_comout', value: '5' }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_comout', value: '1' }],
        },
      ],
    });
    em.create(Exchange, {
      alias: 'cexio',
      name: 'CEX.IO',
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
      alias: 'bybit',
      name: 'Bybit',
      exchangeNetworks: [
        {
          network: bsc,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '0.3' }],
        },
        {
          network: eth,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '5.5' }],
        },
        {
          network: trx,
          networkCurrencies: [{ currency: usdt }],
          constants: [{ alias: 'cs_com', value: '1 2 0' }],
        },
      ],
    });
    //devices
    em.create(Device, { alias: 'samsung', name: 'Samsung' });
    em.create(Device, { alias: 'iphone', name: 'iPhone' });
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
    await GenerateThemesForExchange.call({ em: em }, _ledger);
    await GenerateThemesForExchange.call({ em: em }, _metamask);
    await GenerateThemesForExchange.call({ em: em }, _mexc);
    await GenerateThemesForExchange.call({ em: em }, _payeer);
    await GenerateThemesForExchange.call({ em: em }, _bitget);
    await GenerateThemesForExchange.call({ em: em }, _kraken);
    await GenerateThemesForExchange.call({ em: em }, _coinbase);
    await GenerateThemesForExchange.call({ em: em }, _bitpapa);
    await GenerateThemesForExchange.call({ em: em }, _exmo);
    await GenerateThemesForExchange.call({ em: em }, _garantex);
    await GenerateThemesForExchange.call({ em: em }, _cexio);
    await GenerateThemesForExchange.call({ em: em }, _bybit);
  }
}
/////////////////////////////////////////
const _binance = {
  name: 'binance',
  languages: ['en', 'ru', 'es', 'uk'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
    .add({ type: HtmlInputType.TEXT, name: 'Txid', alias: 'txid' })
    .add({
      type: HtmlInputType.DATETIME_LOCAL,
      name: 'Дата транзакции',
      alias: 'date',
      hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ',
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

    .add({ uk: 'Деталі депозиту', ru: 'Подробнее', en: 'Deposit Details', es: 'Detalles de depósito', alias: 't1in' })
    .add({ uk: 'Деталі зняття коштів', ru: 'Детали вывода средств', en: 'Withdrawal Details', alias: 't1out' })
    .add({ uk: 'Сума', ru: 'Количество', en: 'Amount', es: 'Cantidad', alias: 't2' })
    .add({ uk: 'Completed', ru: 'Completed', en: 'Completed', es: 'Completed', alias: 't3' })
    .add({
      uk: 'Криптовалюта доставлена на ваш акаунт Binance. Для отримання більш докладної інформаціі перегляньте баланс свого спотового акаунта.',
      ru: 'Криптовалюта поступила на ваш аккаунт Binance. Проверьте баланс на спотовом аккаунте.',
      en: 'Crypto has arrived in your Binance account. View your spot account balance for more details.',
      es: 'La criptomoneda ha llegado a tu cuenta de Binance. Comprueba el saldo de tu cuenta spot para obtener más información.',
      alias: 't4in',
    })
    .add({
      uk: "Криптовалюта переказана із Binance. Будь ласка, зв'яжіться з платформою одержувача для отримання квитанції npo транзакцію.",
      ru: 'Криптовалюта была отправлена с Binance. Свяжитесь с платформой получателя для получения квитанции о транзакции.',
      en: 'Crypto transferred out of Binance. Please contact the recipient platform for your transaction receipt.',
      alias: 't4out',
    })
    .add({ uk: 'Підтвердження', ru: 'Подтверждения', en: 'Confirmations', es: 'Confirmaciones', alias: 't5' })
    .add({ uk: 'Мережа', ru: 'Сеть', en: 'Network', es: 'Red', alias: 't6' })
    .add({ uk: 'Гаманець депозиту', ru: 'Кошелек для ввода', en: 'Deposit Wallet', es: 'Billetera de depósito', alias: 't7in' })
    .add({ uk: 'Гаманець зняття', ru: 'Кошелек для вывода', en: 'Withdrawal Wallet', alias: 't7out' })
    .add({ uk: 'Адреса', ru: 'Адрес', en: 'Address', es: 'Dirección', alias: 't8' })
    .add({ uk: 'Txid', ru: 'Txid', en: 'Txid', es: 'Txid', alias: 't9' })
    .add({ uk: 'Дата', ru: 'Дата', en: 'Date', es: 'Fecha', alias: 't10' })
    .add({ uk: 'Simple Earn', ru: 'Simple Earn', en: 'Receive', es: 'Simple Earn', alias: 't11' })
    .add({ uk: 'APR до USDT 4.06%', ru: 'APR до USDT 4.06%', en: 'Receive Crypto With Zero Fee', es: 'USDT APR de hasta 4.06%', alias: 't12' })
    .add({ uk: 'Спробувати зараз', ru: 'Начать', en: 'Discover Now', es: 'Descubrir ahora', alias: 't13' })
    .add({ uk: 'Спотовий гаманець', ru: 'Спотовый кошелек', en: 'Spot Wallet', es: 'Billetera Spot', alias: 't14' })
    .add({ uk: 'Чому мої зняті кошти не надійшли?', ru: 'Почему выведенные средства еще не поступили?', en: "Why hasn't my withdrawal arrived?", alias: 't15' })
    .add({ uk: 'Зберегти адресу', ru: 'Сохранить адрес', en: 'Save address', alias: 't16' })
    .add({ uk: 'Комісія мережі', ru: 'Комиссия сети', en: 'Network fee', alias: 't17' })
    .add({ uk: 'Потрібна допомога? Перевірити FAQ', ru: 'Нужна помощь? Читать FAQ', en: 'Need help? Check FAQs', alias: 't18' })
    .add({ uk: 'Звіт про шахрайство', ru: 'Отчет о мошенничестве', en: 'Scam Report', alias: 't19' }),
};

const _trust = {
  name: 'trust',
  languages: ['en', 'ru', 'uk', 'es'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXT, name: 'Отправитель/получатель', alias: 'address' })
    .add({ type: HtmlInputType.TEXT, name: 'Nonce', optional: true, alias: 'nonce', dependsOn: [{ field: 'network', value: ['bep20', 'erc20'] }] })

    .add({ es: 'Transferencia', uk: 'Переказ', ru: 'Перевод', en: 'Transfer', alias: 't1' })
    .add({ es: 'Fecha', uk: 'Дата', ru: 'Дата', en: 'Date', alias: 't2' })
    .add({ es: 'Estatus', uk: 'Статус', ru: 'Статус', en: 'Status', alias: 't3' })
    .add({ es: 'Tarifa de red', uk: 'Комісія мережі', ru: 'Сетевой сбор', en: 'Network Fee', alias: 't4' })
    .add({ es: 'MÁS DETALLES', uk: 'ДЕТАЛЬНІШЕ', ru: 'ПОДРОБНЕЕ', en: 'MORE DETAILS', alias: 't5' })
    .add({ es: 'Nonce', uk: 'Nonce', ru: 'Nonce', en: 'Nonce', alias: 't6' })
    .add({ es: 'Completado', uk: 'Завершено', ru: 'Завершено', en: 'Completed', alias: 't7' })
    .add({ es: 'Remitente', uk: 'Відправник', ru: 'Отправитель', en: 'Sender', alias: 't8in' })
    .add({ es: 'Destinatario', uk: 'Одержувач', ru: 'Получатель', en: 'Recipient', alias: 't8out' }),
};

const _exodus = {
  name: 'exodus',
  languages: ['en'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address', dependsOn: [{ field: 'network', value: ['bep20', 'erc20'] }] })
    .add({ type: HtmlInputType.TEXT, name: 'ID транзакции', alias: 'txid' })
    .add({ en: 'TRANSACTION DETAILS', alias: 't1' })
    .add({ en: 'Personal Note', alias: 't2' })
    .add({ en: 'Add Note', alias: 't3' })
    .add({ en: 'Created', alias: 't4' })
    .add({ en: 'Timestamp', alias: 't5' })
    .add({ en: 'Transaction ID', alias: 't6' })
    .add({ en: 'Now', alias: 't7' })
    .add({ en: 'Need help?', alias: 't8' })
    .add({ en: 'Fee', alias: 't9' })
    .add({ en: 'Received from', alias: 't10in' })
    .add({ en: 'Sent to', alias: 't10out' })
    .add({ en: 'Received', alias: 't11in' })
    .add({ en: 'Sent', alias: 't11out' })
    .add({ en: 'Contact Support', alias: 't12' }),
};

const _safepal = {
  name: 'safepal',
  languages: ['ru', 'en', 'es'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXT, name: 'От', alias: 'address' })
    .add({ type: HtmlInputType.TEXT, name: 'На', alias: 'address2' })
    .add({ type: HtmlInputType.TEXT, name: 'TxID', alias: 'txid' })
    .add({ type: HtmlInputType.TEXT, name: 'Высота', optional: true, alias: 'height' })

    .add({ en: 'Transaction Details', es: 'Detalles de la transacción', ru: 'Детали транзакции', alias: 't1' })
    .add({ en: 'Status', es: 'Estado', ru: 'Статус', alias: 't2' })
    .add({ en: 'Network Fee', es: 'Tarifa', ru: 'Комиссия сети', alias: 't3' })
    .add({ en: 'Time', es: 'Hora', ru: 'Время', alias: 't4' })
    .add({ en: 'From', es: 'Desde', ru: 'От', alias: 't5' })
    .add({ en: 'To', es: 'A', ru: 'На', alias: 't6' })
    .add({ en: 'Transaction Hash', es: 'Transaction Hash', ru: 'Transaction Hash', alias: 't7' })
    .add({ en: 'Success', es: 'Éxito', ru: 'Успех', alias: 't8' })
    .add({ en: 'Receive', es: 'Enviar', ru: 'Получить', alias: 't9in' })
    .add({ en: 'Send', es: 'Recibir', ru: 'Отправить', alias: 't9out' })
    .add({ en: 'Nonce', es: 'Nonce', ru: 'Nonce', alias: 't10' })
    .add({ en: 'TxID', es: 'TxID', ru: 'TxID', alias: 't11' })
    .add({ en: 'Height', es: 'Altura', ru: 'Высота', alias: 't12' })
    .add({ en: 'View on Blockchain Explorer', es: 'Ver en el explorador de cadena', ru: 'Посмотреть в обозревателе блокчейна', alias: 't13' })
    .add({ en: 'Block', es: 'Block', ru: 'Block', alias: 't14' }),
};

const _gate = {
  name: 'gate',
  languages: ['en', 'ru', 'es', 'uk'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.NUMBER, name: 'ID Ордера', optional: true, alias: 'order' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
    .add({ type: HtmlInputType.TEXT, name: 'TXID', alias: 'txid' })

    .add({ ru: 'Сведения о депозите', uk: 'Данi депозиту', es: 'Detalles del depósito', en: 'Deposit Details', alias: 't1in' })
    .add({ ru: 'Сведения о выводе средств', uk: 'Данi виведення коштiв', es: 'Detalles de la retirada', en: 'Withdrawal Details', alias: 't1out' })
    .add({ ru: 'Количество', uk: 'Кiлькiсть', es: 'Cantidad', en: 'Quantity', alias: 't2' })
    .add({ ru: 'Success', uk: 'Success', es: 'Success', en: 'Success', alias: 't3' })
    .add({ ru: 'Метод депозита', uk: 'Метод внесяння депозиту', es: 'Modo de depósito', en: 'Deposit Method', alias: 't4in' })
    .add({ ru: 'Метод вывода средств', uk: 'Спосiб виведення коштiв', es: 'Modo de retirada', en: 'Withdrawal Method', alias: 't4out' })
    .add({ ru: 'Депозит ончейн', uk: 'Депозит ончейн', es: 'Depósito onchain', en: 'Onchain Deposit', alias: 't5in' })
    .add({ ru: 'Вывод средств ончейн', uk: 'Виведення коштiв ончейн', es: 'Retirada de onchain', en: 'Onchain Withdrawal', alias: 't5out' })
    .add({ ru: 'Время', uk: 'Час', es: 'Hora', en: 'Time', alias: 't6' })
    .add({ ru: 'Сеть', uk: 'Мережа', es: 'Red', en: 'Network', alias: 't7' })
    .add({ ru: 'ID Ордера', uk: 'ID Ордера', es: 'ID de la orden', en: 'Order ID', alias: 't8' })
    .add({ ru: 'Адрес депозита', uk: 'Адреса депозиту', es: 'Dirección de depósito', en: 'Deposit Address', alias: 't9in' })
    .add({ ru: 'Адрес', uk: 'Адреса', es: 'Dirección', en: 'Address', alias: 't9out' })
    .add({ ru: 'TXID', uk: 'TXID', es: 'TXID', en: 'TXID', alias: 't10' })
    .add({ ru: 'Оплата', uk: 'Оплата', es: 'Tarifa', en: 'Fee', alias: 't11' }),
};

const _huobi = {
  name: 'huobi',
  languages: ['en', 'ru', 'es', 'uk'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес вывода', alias: 'address', dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({
      type: HtmlInputType.TEXT,
      name: 'Комиссия',
      alias: 'com',
      optional: true,
      dependsOn: [
        { field: 'network', value: ['erc20', 'bep20'] },
        { field: 'direction', value: ['out'] },
      ],
    })
    .add({ type: HtmlInputType.TEXT, name: 'TxID', alias: 'txid' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })

    .add({ uk: 'Тип', es: 'Tipo', ru: 'Тип', en: 'Type', alias: 't1' })
    .add({ uk: 'Звичайние внесення коштів', es: 'Depósito Normal', ru: 'Обычный депозит', en: 'Ordinary Deposit', alias: 't2in' })
    .add({ uk: 'Звичайние виведення', es: 'Retiro Normal', ru: 'Обычный вывод', en: 'General Withdrawal', alias: 't2out' })
    .add({ uk: 'Статус', es: 'Estado', ru: 'Статус', en: 'Status', alias: 't3' })
    .add({ uk: 'Завершено', es: 'Hecho', ru: 'Готово', en: 'Completed', alias: 't4' })
    .add({ uk: 'Копіювати', es: 'Copiar', ru: 'Скопировать', en: 'Copy', alias: 't5' })
    .add({ uk: 'Час', es: 'Fecha', ru: 'Время', en: 'Time', alias: 't6' })
    .add({ uk: 'Адреса виведення', es: 'Dirección de retiro', ru: 'Адрес вывода', en: 'Withdrawal Address', alias: 't7' })
    .add({ uk: 'Виберіть ланцюг', es: 'Red de retiro', ru: 'Выбрать цепочку', en: 'Withdrawal Network', alias: 't8' })
    .add({ uk: 'Комісія', es: 'Comisión', ru: 'Комиссия', en: 'Fees', alias: 't9' })
    .add({ uk: 'TxID', es: 'TxID', ru: 'TxID', en: 'TxID', alias: 't10' }),
};

const _kucoin = {
  name: 'kucoin',
  languages: ['en', 'ru', 'es'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.TEXT, name: 'Block(s)', alias: 'block', optional: true, dependsOn: [{ field: 'direction', value: ['in'] }] })
    .add({ type: HtmlInputType.NUMBER, name: 'Комиссия', alias: 'com', optional: true, dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXTAREA, name: 'Сообщение', alias: 'msg', optional: true, dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес/Аккаунт', alias: 'address' })
    .add({ type: HtmlInputType.TEXT, name: 'TxHash', alias: 'txid' })

    .add({ es: 'Detalles del depósito', ru: 'Детали Депозита', en: 'Deposit Details', alias: 't1in' })
    .add({ es: 'Detalles de retirada', ru: 'Детали Вывода', en: 'Withdrawal Details', alias: 't1out' })
    .add({ es: 'Completado', ru: 'Завершено', en: 'Completed', alias: 't2' })
    .add({ es: 'Depósito completado. Mira los detalles en tu cuenta.', ru: 'Депозит завершен. Посмотрите детали в своем аккаунте.', en: 'Deposit completed. View details in your account', alias: 't3' })
    .add({ es: 'bloque(s)', ru: 'блок(ов)', en: 'Block(s)', alias: 't4' })
    .add({ es: 'Hora', ru: 'Время', en: 'Time', alias: 't5' })
    .add({ es: 'Red', ru: 'Сеть', en: 'Network', alias: 't6' })
    .add({ es: 'Cuenta de depósito', ru: 'Депозитный аккаунт', en: 'Deposit Account', alias: 't7in' })
    .add({ es: 'Cuenta de retirada', ru: 'Аккаунт для вывода средств', en: 'Withdrawal Account', alias: 't7out' })
    .add({ es: 'Cuenta principal', ru: 'Основной Аккаунт', en: 'Main Account', alias: 't8' })
    .add({ es: 'Observaciones', ru: 'Сообщение:', en: 'Remarks', alias: 't9' })
    .add({ es: 'Dirección/cuenta', ru: 'Адрес/Аккаунт', en: 'Address/Account', alias: 't10' })
    .add({ es: 'TxHash', ru: 'TxHash', en: 'TxHash', alias: 't11' })
    .add({ es: 'Comisión', ru: 'Комиссия', en: 'Fee', alias: 't12' })
    .add({ es: 'Deposit', ru: 'Deposit', en: 'Deposit', alias: 't13' }),
};

const _bitfinex = {
  name: 'bitfinex',
  languages: ['en', 'ru', 'es'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'ID', alias: 'id', optional: true })
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Создано', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
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
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
    .add({ type: HtmlInputType.TEXT, name: 'Txid', alias: 'txid' })

    .add({ ru: 'Пополнение средств', es: 'Deposito', en: 'Deposit', alias: 't1in' })
    .add({ ru: 'Вывод', es: 'Retiro', en: 'Withdraw', alias: 't1out' })
    .add({ ru: 'ID', es: 'ID', en: 'ID', alias: 't2' })
    .add({ ru: 'Статус', es: 'Estado', en: 'Status', alias: 't3' })
    .add({ ru: 'Завершено', es: 'Completado', en: 'Completed', alias: 't4' })
    .add({ ru: 'Сумма', es: 'Monto', en: 'Amount', alias: 't5' })
    .add({ ru: 'Кошелек', es: 'Cartera', en: 'Wallet', alias: 't6' })
    .add({ ru: 'Обменный', es: 'Exchange', en: 'Exchange', alias: 't7' })
    .add({ ru: 'Создано', es: 'Creado', en: 'Created', alias: 't8' })
    .add({ ru: 'Обновлено', es: 'Actualizado', en: 'Updated', alias: 't9' })
    .add({ ru: 'Адрес', es: 'Dirección', en: 'Address', alias: 't10' })
    .add({ ru: 'Txid', es: 'Txid', en: 'Txid', alias: 't11' })
    .add({ ru: 'Ссылка', es: 'Enlace Permanente', en: 'Permalink', alias: 't12' })
    .add({ ru: '/deposit/', es: '/deposit/', en: '/deposit/', alias: 't13in' })
    .add({ ru: '/withdraw/', es: '/withdraw/', en: '/withdraw/', alias: 't13out' })
    .add({
      ru: 'Если вы не выводили средства, то возможно ваш аккаунт был взломан. Чтобы предотвратить дальнейшие действия с аккаунтом,',
      es: 'Si no realizaste este retiro y crees que tu cuenta pudo haber sido comprometida. Para evitar acciones adicionales en tu cuenta,',
      en: "If you didn't make this withdrawal then it's possible your account has been compromised. To prevent further account actions, ",
      alias: 't14',
    })
    .add({ ru: 'заблокируйте аккаунт.', es: 'congela tu cuenta.', en: 'freeze your account.', alias: 't15' }),
};

const _bitmart = {
  name: 'bitmart',
  languages: ['en', 'ru', 'es'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.NUMBER, name: 'ID транзакции', alias: 'id', optional: true })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address', dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.TEXT, name: 'TXID', alias: 'txid' })

    .add({ es: 'Detalles', ru: 'Подробнее', en: 'Detail', alias: 't1' })
    .add({ es: 'Crear', ru: 'Создать', en: 'Create', alias: 't2' })
    .add({ es: 'Procesando', ru: 'Обработка', en: 'Processing', alias: 't3' })
    .add({ es: 'Completar', ru: 'Завершить', en: 'Complete', alias: 't4' })
    .add({ es: 'Cantidad recibida', ru: 'Полученное количество', en: 'Received Qty', alias: 't5' })
    .add({ es: 'Comisión', ru: 'Комиссия', en: 'Fee', alias: 't6' })
    .add({ es: 'Numero de transacción', ru: 'ID транзакции', en: 'Transaction ID', alias: 't7' })
    .add({ es: 'Creado', ru: 'Создано', en: 'Created', alias: 't8' })
    .add({ es: 'Finalizado', ru: 'Завершено', en: 'Finished', alias: 't9' })
    .add({ es: 'TXID', ru: 'TXID', en: 'TXID', alias: 't10' })
    .add({ es: 'Copiar TXID', ru: 'Копировать TXID', en: 'Copy TXID', alias: 't11' })
    .add({ es: 'Comprobar TXID', ru: 'Проверить TXID', en: 'Check TXID', alias: 't12' })
    .add({ es: 'Notificarme por SMS cuando se realice depósitos y retiradas', ru: 'Уведомлять меня с помощью SMS о вводе и выводе средств', en: 'Notify me with SMS when deposit and withdrawal get done', alias: 't13' })
    .add({ es: 'Activar', ru: 'Включить сейчас', en: 'Enable now', alias: 't14' })
    .add({ es: 'Dirección', ru: 'Адрес', en: 'Address', alias: 't15' }),
};

const _cryptocom = {
  name: 'cryptocom',
  languages: ['en', 'ru', 'es'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.NUMBER, name: 'Эквивалент $', alias: 'eqv', optional: true })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
    .add({ type: HtmlInputType.NUMBER, name: 'Комиссия', alias: 'com', optional: true, dependsOn: [{ field: 'direction', value: ['out'] }] })

    .add({ es: 'Withdraw', ru: 'Withdraw', en: 'Withdraw', alias: 't1out' })
    .add({ es: 'Deposit', ru: 'Deposit', en: 'Deposit', alias: 't1in' })
    .add({ es: 'Completado', ru: 'Завершено', en: 'Completed', alias: 't2' })
    .add({ es: 'Detalles de retiro', ru: 'Подробности вывода', en: 'Withdrawal details', alias: 't3out' })
    .add({ es: 'Detalles de depósito', ru: 'Детали перевода', en: 'Deposit details', alias: 't3in' })
    .add({ es: 'Enviando', ru: 'Отправка', en: 'Sending', alias: 't4' })
    .add({ es: 'Retirar a', ru: 'Вывести на', en: 'Withdraw to', alias: 't5out' })
    .add({ es: 'Depositar desde', ru: 'Перевести от', en: 'Deposit from', alias: 't5in' })
    .add({ es: 'Tipo de red', ru: 'Тип сети', en: 'Network Type', alias: 't6' })
    .add({ es: 'Comisión', ru: 'Комиссия', en: 'Fee', alias: 't7' })
    .add({ es: 'Total', ru: 'Итого', en: 'Total', alias: 't8' }),
};

const _okx = {
  name: 'okx',
  languages: ['en', 'ru', 'es', 'uk'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.NUMBER, name: 'Комиссия', alias: 'com', optional: true, dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXT, name: 'Кому', alias: 'address' })
    .add({ type: HtmlInputType.TEXT, name: 'ID транзакции', alias: 'txid' })

    .add({ es: 'Detalles de transacción', uk: 'Відомості про транзакцію', ru: 'Детали транзакции', en: 'Transaction details', alias: 't1' })
    .add({ es: 'depositado', uk: 'внесено', ru: 'внесено', en: 'deposited', alias: 't2in' })
    .add({ es: 'retiro', uk: 'виведено', ru: 'выведено', en: 'withdrawn', alias: 't2out' })
    .add({ es: 'Estado', uk: 'Стан', ru: 'Статус', en: 'Status', alias: 't3' })
    .add({ es: 'Completado', uk: 'Завершено', ru: 'Выполнено', en: 'Completed', alias: 't4' })
    .add({ es: 'Fecha', uk: 'Дата', ru: 'Дата', en: 'Date', alias: 't5' })
    .add({ es: 'De', uk: 'Звідки', ru: 'От', en: 'From', alias: 't6' })
    .add({ es: 'Para', uk: 'На адресу', ru: 'Кому', en: 'To', alias: 't7' })
    .add({ es: 'Red', uk: 'Мережа', ru: 'Сеть', en: 'Network', alias: 't8' })
    .add({ es: 'ID de transacción', uk: 'ID транзакції', ru: 'ID транзакции', en: 'Transaction ID', alias: 't9' })
    .add({ es: 'Comisión', uk: 'Комісія', ru: 'Комиссия', en: 'Fee', alias: 't10' })
    .add({ es: 'Wallet del remitente ', uk: 'Гаманець відправника', ru: 'Кошелек отправителя ', en: "Sender's wallet", alias: 't11' }),
};

const _ledger = {
  name: 'ledger',
  languages: ['en', 'ru', 'es'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.TEXT, name: 'Эквивалент $', alias: 'eqv', optional: true })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXT, name: 'ID транзакции', alias: 'txid' })
    .add({ type: HtmlInputType.TEXT, name: 'Откуда', alias: 'address' })

    .add({ ru: 'Детали транзакции', es: 'Detalles de las transacciones', en: 'Transaction details', alias: 't1' })
    .add({ ru: 'Получение', es: 'Recibido', en: 'Received', alias: 't2in' })
    .add({ ru: 'Отправка', es: 'Enviado', en: 'Sent', alias: 't2out' })
    .add({ ru: 'Подтверждена', es: 'Confirmada', en: 'Confirmed', alias: 't3' })
    .add({ ru: 'Счёт', es: 'Cuenta', en: 'Account', alias: 't4' })
    .add({ ru: 'Дата', es: 'Fecha', en: 'Date', alias: 't5' })
    .add({ ru: 'Комиссия сети', es: 'Tarifas de red', en: 'Network fees', alias: 't6' })
    .add({ ru: 'Куда', es: 'A', en: 'To', alias: 't7' })
    .add({ ru: 'Откуда', es: 'De', en: 'From', alias: 't8' })
    .add({ ru: 'ID транзакции', es: 'ID de transacción', en: 'Transaction ID', alias: 't9' })
    .add({ ru: 'Посмотреть в обозревателе', es: 'Ver en el explorador', en: 'View in explorer', alias: 't10' }),
};

const _metamask = {
  name: 'metamask',
  languages: ['en', 'ru', 'es'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXT, name: 'От', alias: 'address' })
    .add({ type: HtmlInputType.TEXT, name: 'В адрес', alias: 'address2' })
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.NUMBER, name: 'Примерная плата за газ', alias: 'com', optional: true, dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.NUMBER, name: 'Эквивалент $', alias: 'eqv', optional: true })

    .add({ ru: 'Отправлен', es: 'Enviado', en: 'Sent', alias: 't1out' })
    .add({ ru: 'Получен', es: 'Recibido', en: 'Received', alias: 't1in' })
    .add({ ru: 'Статус', es: 'Estado', en: 'Status', alias: 't2' })
    .add({ ru: 'Дата', es: 'Fecha', en: 'Date', alias: 't3' })
    .add({ ru: 'От', es: 'De', en: 'From', alias: 't4' })
    .add({ ru: 'В адрес', es: 'Para', en: 'To', alias: 't5' })
    .add({ ru: 'ОДНОРАЗОВЫЙ КОД', es: 'MIENTRAS TANTO', en: 'NONCE', alias: 't6' })
    .add({ ru: 'Сумма', es: 'Importe', en: 'Amount', alias: 't7' })
    .add({ ru: 'Примерная плата за газ', es: 'Tarifas estimada de gas', en: 'Estimated gas fee', alias: 't8' })
    .add({ ru: 'Общая сумма', es: 'Importe total', en: 'Total amount', alias: 't9' })
    .add({ ru: 'Посмотреть на Etherscan', es: 'Ver en Etherscan', en: 'View on Etherscan', alias: 't10erc20' })
    .add({ ru: 'Посмотреть на Bscscan', es: 'Ver en Bscscan', en: 'View on Bscscan', alias: 't10bep20' })
    .add({ ru: 'Посмотреть полную историю на Etherscan', es: 'Vea el historial completo en Etherscan', en: 'View full history on Etherscan', alias: 't11erc20' })
    .add({ ru: 'Посмотреть полную историю на Bscscan', es: 'Vea el historial completo en Bscscan', en: 'View full history on Bscscan', alias: 't11bep20' })
    .add({ ru: 'Подтверждено', es: 'Confirmado', en: 'Confirmed', alias: 't12' })
    .add({ ru: 'в', es: 'en', en: 'at', alias: 't13' }),
};

const _mexc = {
  name: 'mexc',
  languages: ['en', 'es', 'ru'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address', dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.TEXT, name: 'TxID', alias: 'txid' })
    .add({ type: HtmlInputType.TEXT, name: 'Комиссия', alias: 'com', optional: true, dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })

    .add({ en: 'Withdrawal details', es: 'Detalles de retiro', ru: 'Детали вывода средств', alias: 't1out' })
    .add({ en: 'Deposit Details', es: 'Detalles del Depósito', ru: 'Информация о депозите', alias: 't1in' })
    .add({ en: 'Amount', es: 'Monto', ru: 'Сумма', alias: 't2' })
    .add({ en: 'Completed', es: 'Completado', ru: 'Завершено', alias: 't3' })
    .add({
      en: 'Your crypto is transferred out of MEXC. Please check whether it has arrived on the recipient platform.',
      es: 'Su cripto se transfiere fuera de MEXC. Compruebe si ha llegado a la plataforma del destinatario.',
      ru: 'Криптовалюта переведена с МЕХС. Пожалуйста, свяжитесь с платформой получателя для получения подтверждения транзакции.',
      alias: 't4out',
    })
    .add({
      en: 'Crypto has arrived in your MEXC account. View your spot account balance for more details.',
      es: 'Cripto ha llegado a su cuenta MEXC. Consulte el saldo de su cuenta de Spot para obtener más detalles.',
      ru: 'Криптовалюта поступила на ваш счет МЕХС. Просмотрите баланс своего спотового счета для получения более подробной информации.',
      alias: 't4in',
    })
    .add({ en: 'Network', es: 'Red', ru: 'Сеть', alias: 't5' })
    .add({ en: 'Address', es: 'Dirección', ru: 'Адрес', alias: 't6' })
    .add({ en: 'TxID', es: 'TxID', ru: 'TxID', alias: 't7' })
    .add({ en: 'Fee', es: 'Comisión', ru: 'Комиссия', alias: 't8' })
    .add({ en: 'Time', es: 'Tiempo', ru: 'Дата', alias: 't9' })
    .add({ en: 'Query Blockchain', ru: 'Блокчейн запроса', es: 'Consulta blockchain', alias: 't10' })
    .add({ en: 'Blockchain explorer', es: 'Explorador blockchain', ru: 'Обозреватель блокчейна', alias: 't11' })
    .add({ en: 'Need help? View FAQs', ru: 'Нужна помощь? Просмотр FАQ', es: '¿Necesitas ayuda? Ver preguntas frecuentes', alias: 't12' })
    .add({ en: 'Save Address', ru: 'Сохранить адрес', es: 'Guardar dirección', alias: 't13' })
    .add({ en: 'Type', es: 'Tipo', ru: 'Тип', alias: 't14' })
    .add({ en: 'Common deposit', ru: 'Обычный депозит', es: 'Depósito común', alias: 't15' })
    .add({ en: "Why hasn't my withdrawal arrived?", es: '¿Por qué no ha llegado mi retiro?', ru: 'Почему мой вывод средств не поступил?', alias: 't16' }),
};

const _payeer = {
  name: 'payeer',
  languages: ['en', 'ru'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.TEXT, name: 'Операция №', alias: 'txnum', optional: true })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address', dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.TEXT, name: 'ID транзакции', alias: 'txid', dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.TEXT, name: 'Подтверждений', alias: 'conf', optional: true, dependsOn: [{ field: 'direction', value: ['in'] }] })

    .add({ ru: 'Детали операции', en: 'Operation details', alias: 't1' })
    .add({ ru: 'Операция N°', en: 'Operation N°', alias: 't2' })
    .add({ ru: 'Платежная система', en: 'Payment system', alias: 't3' })
    .add({ ru: 'Статус', en: 'Status', alias: 't4' })
    .add({ ru: 'Сумма с комиссией', en: 'Amount with commission', alias: 't5' })
    .add({ ru: 'ID транзакции', en: 'Transaction ID', alias: 't6' })
    .add({ ru: 'КОПИРОВАТЬ', en: 'COPY', alias: 't7' })
    .add({ ru: 'Выполнено', en: 'Success', alias: 't8' })
    .add({ ru: 'ПОВТОРИТЬ ПЕРЕВОД', en: 'REPEAT PAYMENT', alias: 't9' })
    .add({ ru: 'Баланс', en: 'Balance', alias: 't10' })
    .add({ ru: 'Перевести', en: 'Transfer', alias: 't11' })
    .add({ ru: 'Биржа', en: 'Trade', alias: 't12' })
    .add({ ru: 'Обменять', en: 'Exchange', alias: 't13' })
    .add({ ru: 'История', en: 'History', alias: 't14' })
    .add({ ru: 'Подтверждений', en: 'Confirmations', alias: 't15' }),
};

const _bitget = {
  name: 'bitget',
  languages: ['en', 'es', 'ru', 'uk'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({
      type: HtmlInputType.NUMBER,
      name: 'Комиссия',
      alias: 'com',
      optional: true,
      dependsOn: [
        { field: 'network', value: ['erc20'] },
        { field: 'direction', value: ['out'] },
      ],
    })
    .add({ type: HtmlInputType.NUMBER, name: 'Баланс', alias: 'balance' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })

    .add({ ru: 'История', uk: 'Інформація про рахунок', es: 'Detalles de la factura', en: 'Bill details', alias: 't1' })
    .add({ ru: 'Тип', uk: 'Тип', es: 'Tipo', en: 'Type', alias: 't2' })
    .add({ ru: 'Вывод', uk: 'Виведення коштів', es: 'Retirar', en: 'Withdrawal', alias: 't3out' })
    .add({ ru: 'Депозит', uk: 'Депозит', es: 'Depositar', en: 'Deposit', alias: 't3in' })
    .add({ ru: 'Комиссия', uk: 'Збір', es: 'Tarifa', en: 'Fee', alias: 't4' })
    .add({ ru: 'Баланс', uk: 'Баланс рахунку', es: 'Saldo de la cuenta', en: 'Account Balance', alias: 't5' })
    .add({ ru: 'Время', uk: 'Час', es: 'Hora', en: 'Time', alias: 't6' }),
};

const _kraken = {
  name: 'kraken',
  languages: ['en', 'es'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXT, name: 'ID', alias: 'krakenid', optional: true })

    .add({ es: 'Retiro', en: 'Withdraw', alias: 't1out' })
    .add({ es: 'Deposito', en: 'Deposit', alias: 't1in' })
    .add({ es: 'Tether', en: 'Tether', alias: 't2' })
    .add({ es: 'Tarifa', en: 'Fee', alias: 't3' })
    .add({ es: 'Cantidad', en: 'Amount', alias: 't4' })
    .add({ es: 'Has recibido', en: 'You received', alias: 't5' })
    .add({ es: 'Tiempo', en: 'Time', alias: 't6' })
    .add({ es: 'ID', en: 'ID', alias: 't7' })
    .add({ es: 'Gracias por elegir Kraken', en: 'Thank you for choosing Kraken', alias: 't8' }),
};

const _coinbase = {
  name: 'coinbase',
  languages: ['en', 'es', 'ru'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.NUMBER, name: 'Эквивалент $', alias: 'eqv', optional: true })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес (В)', alias: 'address', optional: true, dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.NUMBER, name: 'Комиссия сети', alias: 'com', optional: true, dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.TEXT, name: 'Хэш транзакции', alias: 'txid' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })

    .add({ es: 'Ha enviado Tether', ru: 'Отправка Tether', en: 'Sent Tether', alias: 't1out' })
    .add({ es: 'Ha recibido Tether', ru: 'Получение Tether', en: 'Received Tether', alias: 't1in' })
    .add({ es: 'A', ru: 'В', en: 'To', alias: 't2' })
    .add({ es: 'Precio por moneda', ru: 'Цена за коин', en: 'Price per coin', alias: 't3' })
    .add({ es: 'Red', ru: 'Сеть', en: 'Network', alias: 't4' })
    .add({ es: 'Ethereum', ru: 'Ethereum', en: 'Ethereum', alias: 't5' })
    .add({ es: 'Comisión de red', ru: 'Комиссия сети', en: 'Network fee', alias: 't6' })
    .add({ es: 'Confirmaciones', ru: 'Подтверждения', en: 'Confirmations', alias: 't7' })
    .add({ es: 'Hash de la transacción', ru: 'Хэш транзакции', en: 'Transaction hash', alias: 't8' })
    .add({ es: 'Fecha', ru: 'Дата', en: 'Date', alias: 't9' })
    .add({ es: 'Estado', ru: 'Статус', en: 'Status', alias: 't10' })
    .add({ es: 'Completada', ru: 'Завершено', en: 'Completed ', alias: 't11' })
    .add({ es: 'Ver en explorador de bloques', ru: 'Посмотреть в обозревател...', en: 'View on block explorer ', alias: 't12' })
    .add({ es: 'Inicio', ru: 'Домашнаяя страница', en: 'Home', alias: 't13' })
    .add({ es: 'Mis activos', ru: 'Мои активы', en: 'My assets ', alias: 't14' })
    .add({ es: 'Operar', ru: 'Торговля', en: 'Trade ', alias: 't15' })
    .add({ es: 'Ganar', ru: 'Заработок', en: 'Earn', alias: 't16' })
    .add({ es: 'Web3', ru: 'Web3', en: 'Web3', alias: 't17' }),
};

const _bitpapa = {
  name: 'bitpapa',
  languages: ['en', 'ru'],
  statusbar: false,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXT, name: 'Txid', alias: 'txid', dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.NUMBER, name: 'Комиссия сети и процессинга', alias: 'com', optional: true, dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address', dependsOn: [{ field: 'direction', value: ['out'] }] })

    .add({ ru: 'Исходящая транзакция', en: 'Withdrawal transaction', alias: 't1out' })
    .add({ ru: 'Входящая транзакция', en: 'Deposit transaction', alias: 't1in' })
    .add({ ru: 'txid:', en: 'txid:', alias: 't2' })
    .add({ ru: 'Комиссия сети и процессинга:', en: 'Network fee & handling:', alias: 't3' })
    .add({ ru: 'Адрес:', en: 'Address:', alias: 't4' })
    .add({ ru: 'В', en: 'AT', alias: 't5' }),
};

const _exmo = {
  name: 'exmo',
  languages: ['en', 'ru', 'uk'],
  statusbar: false,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address', dependsOn: [{ field: 'direction', value: ['out'] }] })
    .add({ type: HtmlInputType.TEXT, name: 'Txid', alias: 'txid' })
    .add({ type: HtmlInputType.TEXT, name: 'Номер транзакции', alias: 'txnum', optional: true })

    .add({ uk: 'Виведення', ru: 'Вывод', en: 'Withdrawal', alias: 't1out' })
    .add({ uk: 'Поповнити', ru: 'Пополнить', en: 'Deposit', alias: 't1in' })
    .add({ uk: 'Txid:', ru: 'Txid:', en: 'Txid:', alias: 't2' })
    .add({ uk: 'Статус', ru: 'Статус', en: 'Status', alias: 't3' })
    .add({ uk: 'Виплачено', ru: 'Выплачено', en: 'Paid', alias: 't4out' })
    .add({ uk: 'Переказано', ru: 'Переведено', en: 'Transferred', alias: 't4in' })
    .add({ uk: 'Платіжний провайдер', ru: 'Платежная система', en: 'Payment System', alias: 't5' })
    .add({ uk: 'ID transaction:', ru: 'Номер транзакции:', en: 'ID transaction:', alias: 't6' })
    .add({ uk: 'Адреса:', ru: 'Адрес:', en: 'Address:', alias: 't7' }),
};

const _garantex = {
  name: 'garantex',
  languages: ['en', 'ru'],
  statusbar: false,
  themes: [
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.TEXT, name: 'Txid', alias: 'txid' })
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.NUMBER, name: 'Комиссия', alias: 'com', optional: true, dependsOn: [{ field: 'direction', value: ['out'] }] })

    .add({ ru: 'Withdrawal history', en: 'Withdrawal history', alias: 't1' })
    .add({ ru: 'Валюта', en: 'Currency', alias: 't2' })
    .add({ ru: 'Сумма', en: 'Amount', alias: 't3' })
    .add({ ru: 'Комиссия', en: 'Commision', alias: 't4' })
    .add({ ru: 'Статус', en: 'Status', alias: 't5' })
    .add({ ru: 'Успешно', en: 'Succeed', alias: 't6out' })
    .add({ ru: 'Принят', en: 'Accepted', alias: 't6in' }),
};

const _cexio = {
  name: 'cexio',
  languages: ['en'],
  statusbar: false,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })
    .add({ type: HtmlInputType.NUMBER, name: 'Баланс', alias: 'balance' })
    .add({ type: HtmlInputType.TEXT, name: 'ID транзакции', alias: 'txid' })

    .add({ en: 'Deposit', alias: 't1in' })
    .add({ en: 'Withdraw', alias: 't1out' })
    .add({ en: 'Completed', alias: 't2' })
    .add({ en: 'Balance:', alias: 't3' })
    .add({ en: 'Transaction ID:', alias: 't4' }),
};
const _bybit = {
  name: 'bybit',
  languages: ['en', 'ru', 'uk', 'es'],
  statusbar: true,
  themes: [
    {
      alias: 'mobile-dark',
      name: 'Тёмная',
    },
    {
      alias: 'mobile-light',
      name: 'Светлая',
    },
  ],
  fields: new Set()
    .add({ type: HtmlInputType.NUMBER, name: 'Сумма', alias: 'sum' })
    .add({ type: HtmlInputType.TEXT, name: 'Хэш транзакции', alias: 'txid' })
    .add({ type: HtmlInputType.TEXT, name: 'Адрес', alias: 'address' })
    .add({ type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции', alias: 'date', hint: 'Формат: ДД.ММ.ГГГГ ЧЧ:ММ' })

    .add({ es: 'Tipo', en: 'Type', uk: 'Тип', ru: 'Тип', alias: 't1' })
    .add({ es: 'Depositar', en: 'Deposit', uk: 'Поповнення', ru: 'Депозит', alias: 't2in' })
    .add({ es: 'Retirar', en: 'Withdraw', uk: 'Вивести', ru: 'Вывод средств', alias: 't2out' })
    .add({ es: 'Cant.', en: 'Quantity', uk: 'Кількість', ru: 'Кол-во', alias: 't3' })
    .add({ es: 'Cadena', en: 'Chain type', uk: 'Тип чейну', ru: 'Вид сети', alias: 't4' })
    .add({ es: 'Estatus', en: 'Status', uk: 'Статус', ru: 'Статус', alias: 't5' })
    .add({ es: 'Correcto', en: 'Succeeded', uk: 'Виконано успішно', ru: 'Успешно', alias: 't6in' })
    .add({ es: 'Retiro completado', en: 'Withdrawal completed', uk: 'Виведення завершено', ru: 'Вывод завершён', alias: 't6out' })
    .add({ es: 'Hash de la transacción (TXID)', en: 'Transaction hash', uk: 'Хеш транзакції (TXID)', ru: 'Хэш транзакции (TXID)', alias: 't7' })
    .add({ es: 'Dirección del depósito', en: 'Deposit Address', uk: 'Адреса депозиту', ru: 'Адрес депозита', alias: 't8in' })
    .add({ es: 'Dirección de Billetera', en: 'Withdrawal Address', uk: 'Адреса для виведення', ru: 'Адрес кошелька', alias: 't8out' })
    .add({ es: 'Hora', en: 'Time', uk: 'Час', ru: 'Время', alias: 't9' })
    .add({ es: 'Tarifas', en: 'Fees', uk: 'Комiсії', ru: 'Комиссии', alias: 't10' }),
};
/////////////////////////////////////////
const _xiaomi = {
  name: 'xiaomi',
  fields: [
    { alias: 'wifiAP', name: 'Раздача Wi-Fi', optional: true },
    { alias: 'wifiAPS', name: 'Уровень сигнала раздачи Wi-Fi', type: HtmlInputType.RADIO, dependsOn: [{ field: 'wifiAP' }], range: [1, 5], alwaysRandom: true },
    { alias: 'wifi', name: 'Приём Wi-Fi', optional: true },
    { alias: 'wifiS', name: 'Уровень сигнала приёма Wi-Fi', type: HtmlInputType.RADIO, range: [1, 5], dependsOn: [{ field: 'wifi' }], alwaysRandom: true },
    { alias: '4g', name: 'Уровень сигнала LTE', type: HtmlInputType.RADIO, range: [1, 5], alwaysRandom: true },
    { alias: 'bluetooth', name: 'Bluetooth', optional: true },
    { alias: 'charge', name: 'Уровень заряда батареи (в %)', type: HtmlInputType.SLIDER, range: [1, 100], alwaysRandom: true },
    { alias: 'time', name: 'Время', type: HtmlInputType.TIME, alwaysRandom: true },
    { alias: 'moon', name: 'Луна', optional: true },
    { alias: 'vibro', name: 'Вибрация', optional: true },
    { alias: 'alarm', name: 'Будильник', optional: true },
    { alias: 'nfc', name: 'NFC', optional: true },
    { alias: 'vpn', name: 'VPN', optional: true },
    { alias: 'cog', name: 'Шестерня', optional: true },
    { alias: 'volte', name: 'VoLTE', optional: true },
  ],
};

const _iphone = {
  name: 'iphone',
  fields: [
    { alias: 'geoloc', name: 'Активен навигатор', optional: true },
    {
      alias: 'network',
      name: 'LTE или Wi-Fi',
      type: HtmlInputType.SELECT,
      alwaysRandom: true,
      values: [
        {
          value: 'LTE',
          alias: 'lte',
        },
        {
          value: 'Wi-Fi',
          alias: 'wifi',
        },
      ],
    },

    { alias: 'wifiS', name: 'Уровень сигнала приёма Wi-Fi', type: HtmlInputType.RADIO, range: [1, 3], dependsOn: [{ field: 'network', value: ['wifi'] }], alwaysRandom: true },
    {
      alias: 'simnum',
      name: 'Количество SIM-карт',
      type: HtmlInputType.SELECT,
      values: [
        { value: 'Одна SIM-карта', alias: 'sim1' },
        { value: 'Две SIM-карты', alias: 'sim2' },
      ],
    },
    { alias: '4g', name: 'Уровень сигнала LTE', type: HtmlInputType.RADIO, range: [1, 4], alwaysRandom: true },
    { alias: 'charge', name: 'Уровень заряда батареи (в %)', type: HtmlInputType.SLIDER, range: [1, 100], alwaysRandom: true },
    { alias: 'time', name: 'Время', type: HtmlInputType.TIME, alwaysRandom: true },
  ],
};

const _samsung = {
  name: 'samsung',
  fields: [
    { alias: 'time', name: 'Время', type: HtmlInputType.TIME, alwaysRandom: true },
    {
      alias: 'simnum',
      name: 'Количество SIM-карт',
      type: HtmlInputType.SELECT,
      values: [
        { value: 'Одна SIM-карта', alias: 'sim1' },
        { value: 'Две SIM-карты', alias: 'sim2' },
      ],
    },
    //should be bar1 \ bar2
    { alias: 'wifiS1', name: 'Уровень сигнала 1-ой SIM-карты', type: HtmlInputType.RADIO, range: [1, 4], alwaysRandom: true },
    { alias: 'wifiS2', name: 'Уровень сигнала 2-ой SIM-карты', type: HtmlInputType.RADIO, dependsOn: [{ field: 'simnum', value: ['sim2'] }], range: [1, 4], alwaysRandom: true },
    {
      alias: 'sound',
      name: 'Звук вкл./Вибрация/Без звука',
      type: HtmlInputType.SELECT,
      values: [
        {
          value: 'Звук вкл. (то есть без значка)',
          alias: 'null',
        },
        {
          value: 'Без звука',
          alias: 'nosound',
        },
        {
          value: 'Вибрация',
          alias: 'novibro',
        },
      ],
    },
    {
      alias: 'wifiMode',
      name: 'H+ или VoLTE',
      type: HtmlInputType.SELECT,
      values: [
        { value: 'H+', alias: 'h' },
        { value: 'VoLTE', alias: 'volte' },
      ],
    },
    { alias: 'wifiS', name: 'Уровень сигнала приёма Wi-Fi', type: HtmlInputType.RADIO, dependsOn: [{ field: 'wifiMode', value: ['volte'] }], range: [1, 4], alwaysRandom: true },
    { alias: 'charge', name: 'Уровень заряда батареи (в %)', type: HtmlInputType.SLIDER, range: [1, 100], alwaysRandom: true },
    { alias: 'geoloc2', name: 'GPS', optional: true },
    { alias: 'geoloc', name: 'Активен навигатор', optional: true, dependsOn: [{ field: 'geoloc2' }] },
    { alias: 'vpn', name: 'VPN', optional: true },
  ],
};
const _realme = {
  name: 'realme',
  fields: [
    { alias: 'time', name: 'Время', type: HtmlInputType.TIME, alwaysRandom: true },
    { alias: 'nfc', name: 'NFC', optional: true },
    { alias: 'alarm', name: 'alarm', optional: true },
    { alias: 'bluetooth', name: 'Bluetooth', optional: true },
    { alias: 'speed', name: 'Speed', type: HtmlInputType.NUMBER, range: [50, 99], alwaysRandom: true },
    { alias: 'volte', name: 'VoLTE', optional: true },
    {
      alias: 'simnum',
      name: 'Количество SIM-карт',
      type: HtmlInputType.SELECT,
      values: [
        { value: 'Одна SIM-карта', alias: 'sim1' },
        { value: 'Две SIM-карты', alias: 'sim2' },
      ],
    },
    { alias: 'bar1', name: 'Уровень сигнала 1-ой SIM-карты', type: HtmlInputType.RADIO, range: [1, 4], alwaysRandom: true },
    { alias: 'bar2', name: 'Уровень сигнала 2-ой SIM-карты', type: HtmlInputType.RADIO, range: [1, 4], dependsOn: [{ field: 'simnum', value: ['sim2'] }], alwaysRandom: true },
    { alias: 'wifi', name: 'Приём Wi-Fi', optional: true, alwaysRandom: true },
    { alias: 'wifiS', name: 'Уровень сигнала приёма Wi-Fi', type: HtmlInputType.RADIO, dependsOn: [{ field: 'wifi' }], range: [1, 4], alwaysRandom: true },
    { alias: 'charge', name: 'Уровень заряда батареи (в %)', type: HtmlInputType.SLIDER, range: [1, 100], alwaysRandom: true },
  ],
};
async function GenerateThemesForExchange(this: { em: EntityManager }, data: data) {
  const languages = await this.em.find(Language, { alias: { $in: data.languages } });
  const exchange = await this.em.findOneOrFail(Exchange, { alias: data.name });
  const inputs: any[] = [];
  for await (const field of data.fields) {
    let inputalias = await this.em.findOne(InputAlias, { alias: field.alias });
    if (!inputalias && field.type) {
      inputalias = this.em.create(InputAlias, {
        type: field.type as HtmlInputType,
        alias: field.alias,
        ...(field.values
          ? {
              aliasVariants: field.values as selectValue[],
            }
          : {}),
      });
    }
    inputs.push({
      alias: field.alias,
      optional: !!field.optional,
      hint: field.hint,
      name: field.name,
      dependsOn: JSON.stringify(field.dependsOn),
      ...(field.type ? { inputAlias: inputalias } : { inputValues: data.languages.map((language: string) => ({ value: (field as any)[language], language: languages.find((lan) => lan.alias == language) })) }),
    });
  }

  let tzInputAlias = await this.em.findOne(InputAlias, { alias: 'tz' });
  if (!tzInputAlias) {
    tzInputAlias = this.em.create(InputAlias, {
      alias: 'tz',
      type: HtmlInputType.SELECT,
      aliasVariants: [
        { value: '(GMT-12:00) International Date Line West', alias: '-12' },
        { value: '(GMT-11:00) Midway Island, Samoa', alias: '-11' },
        { value: '(GMT-10:00) Hawaii', alias: '-10' },
        { value: '(GMT-09:00) Alaska', alias: '-9' },
        { value: '(GMT-08:00) Pacific Time (US & Canada)', alias: '-8' },
        { value: '(GMT-07:00) Arizona', alias: '-7' },
        { value: '(GMT-06:00) Central Time (US & Canada)', alias: '-6' },
        { value: '(GMT-05:00) Eastern Time (US & Canada)', alias: '-5' },
        { value: '(GMT-04:00) Atlantic Time (Canada)', alias: '-4' },
        { value: '(GMT-03:00) Buenos Aires, Georgetown', alias: '-3' },
        { value: '(GMT-02:00) Mid-Atlantic', alias: '-2' },
        { value: '(GMT-01:00) Cape Verde Is.', alias: '-1' },
        { value: '(GMT) Greenwich Mean Time : London', alias: '0' },
        { value: '(GMT+01:00) Rome, Stockholm, Vienna', alias: '1' },
        { value: '(GMT+02:00)  Istanbul, Minsk', alias: '2' },
        { value: '(GMT+03:00) Moscow, St. Petersburg', alias: '3' },
        { value: '(GMT+04:00) Abu Dhabi, Muscat', alias: '4' },
        { value: '(GMT+05:00) Islamabad, Karachi, Tashkent', alias: '5' },
        { value: '(GMT+06:00) Almaty, Novosibirsk', alias: '6' },
        { value: '(GMT+07:00) Bangkok, Hanoi, Jakarta', alias: '7' },
        { value: '(GMT+08:00) Beijing, Hong Kong, Perth', alias: '8' },
        { value: '(GMT+09:00) Osaka, Sapporo, Tokyo', alias: '9' },
        { value: '(GMT+10:00) Canberra, Melbourne, Sydney', alias: '10' },
        { value: '(GMT+11:00) Magadan, Solomon Is., New Caledonia', alias: '11' },
        { value: '(GMT+12:00) Auckland, Wellington', alias: '12' },
        { value: "(GMT+13:00) Nuku'alofa", alias: '13' },
        { value: '(GMT+14:00) Kiritimati', alias: '14' },
      ],
    });
  }

  data.themes.map((theme: any) =>
    this.em.create(Theme, {
      ...theme,
      exchange,
      statusbar: data.statusbar,
      themeLanguages: [...Array(languages.length).keys()].map((i) => ({ language: languages[i] })),
      themeInputs: [this.em.create(Input, { alias: 'tz', name: 'Часовая зона', hidden: true, inputAlias: tzInputAlias }), ...inputs.map((input) => this.em.create(Input, input))],
    }),
  );
  await this.em.flush();
}

async function GenerateDeviceInputs(this: { em: EntityManager }, data: deviceData) {
  const device = await this.em.findOneOrFail(Device, { alias: data.name });
  const barinputs = await this.em.find(BarInput, { alias: { $in: data.fields.map((field) => field.alias) } });
  data.fields.map((field: field & { hint?: string; dependsOn?: string; range?: [number, number]; alwaysRandom?: boolean }) => {
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
      range: field.range,
      hint: field.hint,
      optional: !!field.optional,
      alwaysRandom: !!field.alwaysRandom,
      dependsOn: JSON.stringify(field.dependsOn),
    });
  });
  await this.em.flush();
}
