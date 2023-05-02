import { Theme } from 'src/modules/mikroorm/entities/Theme';

export class RetrieveInputValuesDto {
  constructor(theme: Theme, language: string) {
    this.inputs = theme.themeInputs.getItems().map((themeInput) => {
      return {
        alias: themeInput.input.alias,
        value: themeInput.input.inputValues.getItems().find((inputValue) => inputValue.language.alias == language)?.value,
      };
    });
  }
  inputs: { alias: string; value: string }[];
}
