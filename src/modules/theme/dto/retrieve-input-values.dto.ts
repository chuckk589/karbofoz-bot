import { Theme } from 'src/modules/mikroorm/entities/Theme';

export class RetrieveInputValuesDto {
  constructor(theme: Theme) {
    this.inputs = theme.themeInputs.getItems().map((themeInput) => ({
      alias: themeInput.input.alias,
      value: themeInput.input.inputValues.getItems()[0].value,
    }));
  }
  inputs: { alias: string; value: string }[];
}
