import { EntityManager } from '@mikro-orm/core';
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
    //языки
    const en = em.create(Language, { alias: 'en', name: 'Английский' });
    const es = em.create(Language, { alias: 'es', name: 'Испанский' });

    //биржи
    const exchange = em.create(Exchange, { alias: 'binance', name: 'Binance' });

    //шаблоны
    const template = em.create(Template, { exchange: exchange });

    // темы
    const theme = em.create(Theme, { alias: 'mobile-dark', name: 'Mobile Dark', template: template });
    const theme2 = em.create(Theme, { alias: 'mobile-light', name: 'Mobile Light', template: template });

    //темы к языку
    const themeLanguage_en = em.create(ThemeLanguage, { language: en, theme: theme });
    const themeLanguage_es = em.create(ThemeLanguage, { language: es, theme: theme });
    const themeLanguage_en2 = em.create(ThemeLanguage, { language: en, theme: theme2 });
    const themeLanguage_es2 = em.create(ThemeLanguage, { language: es, theme: theme2 });

    theme.themeLanguages.add([themeLanguage_en, themeLanguage_es]);
    theme2.themeLanguages.add([themeLanguage_en2, themeLanguage_es2]);

    //вводы
    const alias1 = em.create(InputAlias, { type: HtmlInputType.NUMBER, name: 'Сумма' });
    const alias2 = em.create(InputAlias, { type: HtmlInputType.TEXT, name: 'Сеть' });
    const alias3 = em.create(InputAlias, { type: HtmlInputType.DATETIME_LOCAL, name: 'Дата транзакции' });
    const alias4 = em.create(InputAlias, { type: HtmlInputType.TEXT, name: 'Адрес' });
    const alias5 = em.create(InputAlias, { type: HtmlInputType.TEXT, name: 'ID транзакции' });
    const alias6 = em.create(InputAlias, { type: HtmlInputType.TEXT, name: 'Имя кошелька' });

    //инпуты
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text1', inputValues: [{ value: 'Deposit Details', themeLanguage: themeLanguage_en }, { value: 'Detalles de depósito', themeLanguage: themeLanguage_es }] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text2', inputValues: [{ value: 'Amount', themeLanguage: themeLanguage_en }, { value: 'Cantidad', themeLanguage: themeLanguage_es }] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'sum', inputValues: null, inputAlias: alias1 }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text3', inputValues: [{ value: 'Completed', themeLanguage: themeLanguage_en }, { value: 'Completed', themeLanguage: themeLanguage_es }] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text4', inputValues: [{ value: 'Crypto has arrived in your Binance account. View your spot account balance for details.', themeLanguage: themeLanguage_en }, { value: 'La criptomoneda ha llegado a tu cuenta de Binance. Comprueba el saldo de tu cuenta spot para obtener más información.', themeLanguage: themeLanguage_es }] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text5', inputValues: [{ value: 'Confirmations', themeLanguage: themeLanguage_en }, { value: 'Confirmaciones', themeLanguage: themeLanguage_es }] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text6', inputValues: [{ value: 'Network', themeLanguage: themeLanguage_en }, { value: 'Red', themeLanguage: themeLanguage_es }] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'network', inputValues: null, inputAlias: alias2 }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text7', inputValues: [{ value: 'Deposit Wallet', themeLanguage: themeLanguage_en }, { value: 'Billetera de depósito', themeLanguage: themeLanguage_es}] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'dpwallet', inputValues: null, inputAlias: alias6 }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text8', inputValues: [{ value: 'Address', themeLanguage: themeLanguage_en }, { value: 'Dirección', themeLanguage: themeLanguage_es}] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'address', inputValues: null, inputAlias: alias3 }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text9', inputValues: [{ value: 'Txid', themeLanguage: themeLanguage_en }, { value: 'Txid', themeLanguage: themeLanguage_es }] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'tranTime', inputValues: null, inputAlias: alias4 }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text10', inputValues: [{ value: 'Date', themeLanguage: themeLanguage_en }, { value: 'Fecha', themeLanguage: themeLanguage_es }] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'tranTime', inputValues: null, inputAlias: alias5 }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text11', inputValues: [{ value: 'Receive', themeLanguage: themeLanguage_en }, { value: 'Simple Earn', themeLanguage: themeLanguage_es }] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text12', inputValues: [{ value: 'Receive Crypto With Zero Fee', themeLanguage: themeLanguage_en }, { value: 'USDT APR de hasta 4.06%', themeLanguage: themeLanguage_es }] }) });
    em.create(InputTheme, { theme: theme, input: em.create(Input, { alias: 'text13', inputValues: [{ value: 'Discover now', themeLanguage: themeLanguage_en }, { value: 'Descubrir ahora', themeLanguage: themeLanguage_es }] }) });
  }
}
