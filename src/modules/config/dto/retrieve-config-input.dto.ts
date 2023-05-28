import { Input } from 'src/modules/mikroorm/entities/Input';
import { RetrieveConfigDto } from './retrieve-config.dto';

export class RetrieveConfigInputDto {
  constructor(input: Input) {
    this.name = input.inputAlias?.name;
    this.type = input.inputAlias?.type;
    this.alias = input.alias;
    this.variants = input.inputAlias.aliasVariants.getItems().length ? input.inputAlias.aliasVariants.getItems().map((variant) => new RetrieveConfigDto({ title: variant.value, value: variant.alias })) : undefined;
    this.optional = input.optional;
    this.hint = input.hint;
    this.dependsOn = input.dependsOn;
    this.dependsValue = input.dependsValue?.split(',');
  }
  name: string;
  type: string;
  alias: string;
  optional: boolean;
  hint?: string;
  dependsOn?: string;
  dependsValue?: string | string[];
  variants?: RetrieveConfigDto[];
}
