import { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Exchange } from '../entities/Exchange';
import { Language } from '../entities/Language';
import { Template } from '../entities/Template';
import { Theme } from '../entities/Theme';
import { Input } from '../entities/Input';
import { HtmlInputType, InputAlias } from '../entities/InputAlias';
import { InputTheme } from '../entities/InputTheme';
import { ThemeLanguage } from '../entities/ThemeLanguage';

export class ConfigSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // //языки
    const en = em.create(Language, { alias: 'en', name: 'Английски' });
    const es = em.create(Language, { alias: 'es', name: 'Испанский' });

    // //биржи
    const exchange = em.create(Exchange, { alias: 'binance', name: 'Binance' });
    //шаблоны
    const template = em.create(Template, { exchange: exchange });

    // темы
    const theme = em.create(Theme, { alias: 'mobile-dark', name: 'Mobile Dark', template: template });
    const theme2 = em.create(Theme, { alias: 'mobile-light', name: 'Mobile Light', template: template});

    // //темы к языку
    const themeLanguage_en = em.create(ThemeLanguage, { language: en, theme: theme });
    const themeLanguage_es = em.create(ThemeLanguage, { language: es, theme: theme });
    const themeLanguage_en2 = em.create(ThemeLanguage, { language: en, theme: theme2 });
    const themeLanguage_es2 = em.create(ThemeLanguage, { language: es, theme: theme2 });

    theme.themeLanguages.add([themeLanguage_en, themeLanguage_es]);
    theme2.themeLanguages.add([themeLanguage_en2, themeLanguage_es2]);

    //вводы
    const alias1 = em.create(InputAlias, { type: HtmlInputType.NUMBER, name: 'Сумма' });
    const alias2 = em.create(InputAlias, { type: HtmlInputType.TEXT, name: 'Подтверждения' });
    const alias3 = em.create(InputAlias, { type: HtmlInputType.TEXT, name: 'Сеть' });
    const alias4 = em.create(InputAlias, { type: HtmlInputType.TEXT, name: 'Имя кошелька' });
    const alias5 = em.create(InputAlias, { type: HtmlInputType.TEXT, name: 'Адрес' });
    const alias6 = em.create(InputAlias, { type: HtmlInputType.TEXT, name: 'TXID' });
    const alias7 = em.create(InputAlias, { type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции' });

    //инпуты
    const inp1 = em.create(Input, { alias: 'text1', inputValues: [{ value: 'Deposit Details', themeLanguage: themeLanguage_en }, { value: 'Detalles de depósito', themeLanguage: themeLanguage_es }] })
    const inp2 = em.create(Input, { alias: 'text2', inputValues: [{ value: 'Amount', themeLanguage: themeLanguage_en }, { value: 'Cantidad', themeLanguage: themeLanguage_es }] });
    const inp3 = em.create(Input, { alias: 'text3', inputValues: [{ value: 'Completed', themeLanguage: themeLanguage_en }, { value: 'Completed', themeLanguage: themeLanguage_es }] });
    const inp4 = em.create(Input, { alias: 'text4', inputValues: [{ value: 'Crypto has arrived in your Binance account. View your spot account balance for more details.', themeLanguage: themeLanguage_en }, { value: 'La criptomoneda ha llegado a tu cuenta de Binance. Comprueba el saldo de tu cuenta spot para obtener más información.', themeLanguage: themeLanguage_es }] });
    const inp5 = em.create(Input, { alias: 'text5', inputValues: [{ value: 'Confirmations', themeLanguage: themeLanguage_en }, { value: 'Confirmaciones', themeLanguage: themeLanguage_es }] });
    const inp6 = em.create(Input, { alias: 'text6', inputValues: [{ value: 'Network', themeLanguage: themeLanguage_en }, { value: 'Red', themeLanguage: themeLanguage_es }] });
    const inp7 = em.create(Input, { alias: 'text7', inputValues: [{ value: 'Deposit Wallet', themeLanguage: themeLanguage_en }, { value: 'Billetera de depósito', themeLanguage: themeLanguage_es }] });
    const inp8 = em.create(Input, { alias: 'text8', inputValues: [{ value: 'Address', themeLanguage: themeLanguage_en }, { value: 'Dirección', themeLanguage: themeLanguage_es }] });
    const inp9 = em.create(Input, { alias: 'text9', inputValues: [{ value: 'Txid', themeLanguage: themeLanguage_en }, { value: 'Txid', themeLanguage: themeLanguage_es }] });
    const inp10 = em.create(Input, { alias: 'text10', inputValues: [{ value: 'Date', themeLanguage: themeLanguage_en }, { value: 'Fecha', themeLanguage: themeLanguage_es }] });
    const inp11 = em.create(Input, { alias: 'text11', inputValues: [{ value: 'Receive', themeLanguage: themeLanguage_en }, { value: 'Simple Earn', themeLanguage: themeLanguage_es }] });
    const inp12 = em.create(Input, { alias: 'text12', inputValues: [{ value: 'Receive Crypto With Zero Fee', themeLanguage: themeLanguage_en }, { value: 'USDT APR de hasta 4.06%', themeLanguage: themeLanguage_es }] })
    const inp13 = em.create(Input, { alias: 'text13', inputValues: [{ value: 'Discover Now', themeLanguage: themeLanguage_en }, { value: 'Descubrir ahora', themeLanguage: themeLanguage_es }] })
    const inp14 = em.create(Input, { alias: 'input1', inputValues: null, inputAlias: alias1 })
    const inp15 = em.create(Input, { alias: 'input2', inputValues: null, inputAlias: alias2 })
    const inp16 = em.create(Input, { alias: 'input3', inputValues: null, inputAlias: alias3 })
    const inp17 = em.create(Input, { alias: 'input4', inputValues: null, inputAlias: alias4 })
    const inp18 = em.create(Input, { alias: 'input5', inputValues: null, inputAlias: alias5 })
    const inp19 = em.create(Input, { alias: 'input6', inputValues: null, inputAlias: alias6 })
    const inp20 = em.create(Input, { alias: 'input7', inputValues: null, inputAlias: alias7 })

    //инпуты к темам
    em.create(InputTheme, { theme: theme, input: inp1 });
    em.create(InputTheme, { theme: theme, input: inp2 });
    em.create(InputTheme, { theme: theme, input: inp3 });
    em.create(InputTheme, { theme: theme, input: inp4 });
    em.create(InputTheme, { theme: theme, input: inp5 });
    em.create(InputTheme, { theme: theme, input: inp6 });
    em.create(InputTheme, { theme: theme, input: inp7 });
    em.create(InputTheme, { theme: theme, input: inp8 });
    em.create(InputTheme, { theme: theme, input: inp9 });
    em.create(InputTheme, { theme: theme, input: inp10 });
    em.create(InputTheme, { theme: theme, input: inp11 });
    em.create(InputTheme, { theme: theme, input: inp12 });
    em.create(InputTheme, { theme: theme, input: inp13 });
    em.create(InputTheme, { theme: theme, input: inp14 });
    em.create(InputTheme, { theme: theme, input: inp15 });
    em.create(InputTheme, { theme: theme, input: inp16 });
    em.create(InputTheme, { theme: theme, input: inp17 });
    em.create(InputTheme, { theme: theme, input: inp18 });
    em.create(InputTheme, { theme: theme, input: inp19 });
    em.create(InputTheme, { theme: theme, input: inp20 });

    em.create(InputTheme, { theme: theme2, input: inp1 });
    em.create(InputTheme, { theme: theme2, input: inp2 });
    em.create(InputTheme, { theme: theme2, input: inp3 });
    em.create(InputTheme, { theme: theme2, input: inp4 });
    em.create(InputTheme, { theme: theme2, input: inp5 });
    em.create(InputTheme, { theme: theme2, input: inp6 });
    em.create(InputTheme, { theme: theme2, input: inp7 });
    em.create(InputTheme, { theme: theme2, input: inp8 });
    em.create(InputTheme, { theme: theme2, input: inp9 });
    em.create(InputTheme, { theme: theme2, input: inp10 });
    em.create(InputTheme, { theme: theme2, input: inp11 });
    em.create(InputTheme, { theme: theme2, input: inp12 });
    em.create(InputTheme, { theme: theme2, input: inp13 });
    em.create(InputTheme, { theme: theme2, input: inp14 });
    em.create(InputTheme, { theme: theme2, input: inp15 });
    em.create(InputTheme, { theme: theme2, input: inp16 });
    em.create(InputTheme, { theme: theme2, input: inp17 });
    em.create(InputTheme, { theme: theme2, input: inp18 });
    em.create(InputTheme, { theme: theme2, input: inp19 });
    em.create(InputTheme, { theme: theme2, input: inp20 });

  }
}

const data = {
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
    }
  ],
  fields: {
    en: [
      'Deposit Details',
      'Amount',
      'Completed',
      'Crypto has arrived in your Binance account. View your spot account balance for more details.',
      'Confirmations',
    ],
    es: [
      'Detalles de depósito',
      'Cantidad',
      'Completed',
      'La criptomoneda ha llegado a tu cuenta de Binance. Comprueba el saldo de tu cuenta spot para obtener más información.',
      'Confirmaciones',
    ]
  },
  inputs: [
    { type: HtmlInputType.NUMBER, name: 'Сумма' },
    { type: HtmlInputType.NUMBER, name: 'Сумма' },
    { type: HtmlInputType.NUMBER, name: 'Сумма' },
  ]
}