import { Input } from 'src/modules/mikroorm/entities/Input';
import { HtmlInputType } from 'src/modules/mikroorm/entities/InputAlias';
import { RetrieveConfigDto } from './retrieve-config.dto';

export class RetrieveConfigInputDto {
  constructor(input: Input) {
    this.name = input.inputAlias?.name;
    this.type = input.inputAlias?.type;
    this.alias = input.alias;
    this.variants = input.inputAlias.aliasVariants.getItems().length ? input.inputAlias.aliasVariants.getItems().map((variant) => new RetrieveConfigDto({ title: variant.value, value: variant.alias })) : undefined;
    this.optional = input.optional;
    this.hint = input.inputAlias?.hint;
  }
  name: string;
  type: string;
  alias: string;
  optional: boolean;
  hint?: string;
  variants?: RetrieveConfigDto[];
}
