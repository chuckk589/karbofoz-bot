import { InputValue } from 'src/modules/mikroorm/entities/InputValue';

export class RetrieveInputValuesDto {
  constructor(inputValue: InputValue) {
    this.value = inputValue.value;
    this.language = inputValue.themeLanguage.language.id.toString();
  }
  value: string;
  language: string;
}
