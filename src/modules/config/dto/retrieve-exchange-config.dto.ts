import { RetrieveConfigNetworkDto } from './retrieve-config-network.dto';
import { Exchange } from 'src/modules/mikroorm/entities/Exchange';
import { RetrieveConfigThemeDto } from './retrieve-config-theme.dto';

export class RetrieveExchangeConfigDto {
  constructor(exchange: Exchange) {
    this.title = exchange.name;
    this.value = exchange.id.toString();
    this.alias = exchange.alias;
    this.themes = exchange.themes.getItems().map((theme) => new RetrieveConfigThemeDto(theme));
    this.networks = exchange.exchangeNetworks.getItems().map((exchangeNetwork) => new RetrieveConfigNetworkDto(exchangeNetwork));
  }
  title: string;
  alias: string;
  value: string;
  themes: RetrieveConfigThemeDto[];
  networks: RetrieveConfigNetworkDto[];
}
