import { ExchangeNetwork } from 'src/modules/mikroorm/entities/ExchangeNetwork';
import { RetrieveConfigDto } from './retrieve-config.dto';

export class RetrieveConfigNetworkDto {
  constructor(exchangeNetwork: ExchangeNetwork) {
    this.title = exchangeNetwork.network.name;
    this.value = exchangeNetwork.network.alias;
    this.currencies = exchangeNetwork.networkCurrencies.getItems().map((networkCurrency) => new RetrieveConfigDto({ title: networkCurrency.currency.name, value: networkCurrency.currency.alias }));
  }
  title: string;
  value: string;
  currencies: RetrieveConfigDto[];
}
