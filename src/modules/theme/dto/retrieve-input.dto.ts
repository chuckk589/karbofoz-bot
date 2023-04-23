import { RetrieveInputValuesDto } from './retrieve-input-values.dto';
import { Input } from 'src/modules/mikroorm/entities/Input';

export class RetrieveInputDto {
  constructor(input: Input) {
    console.log(input);
    this.name = input.inputAlias?.name;
    this.type = input.inputAlias?.type;
    this.alias = input.alias;
    this.values = input.inputValues.isInitialized() ? input.inputValues.getItems().map((inputValue) => new RetrieveInputValuesDto(inputValue)) : undefined;
  }
  name: string;
  type: string;
  alias: string;
  values?: RetrieveInputValuesDto[];
}
