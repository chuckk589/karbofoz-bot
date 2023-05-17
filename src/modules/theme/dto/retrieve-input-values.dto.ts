import { Theme } from 'src/modules/mikroorm/entities/Theme';
import { RetriveThemeQueryDto } from './retrive-theme-query.dto';

export class RetrieveInputValuesDto {
  constructor(theme: Theme, query: RetriveThemeQueryDto) {
    this.inputs = [
      ...theme.themeInputs.getItems().map((themeInput) => {
        return {
          alias: themeInput.input.alias,
          value: themeInput.input.inputValues.getItems().find((inputValue) => inputValue.language.alias == query.language)?.value,
        };
      }),
      ...theme.exchange.exchangeNetworks
        .getItems()
        .find((exchangeNetwork) => exchangeNetwork.network.alias == query.network)
        .constants.getItems()
        .map((constant) => {
          return {
            alias: constant.alias,
            value: constant.value,
          };
        }),
    ];
  }
  inputs: { alias: string; value: string }[];
}
