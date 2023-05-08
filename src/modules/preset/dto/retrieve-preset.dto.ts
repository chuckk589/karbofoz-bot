import { Preset } from 'src/modules/mikroorm/entities/Preset';
import { CreatePresetDto } from './create-preset.dto';

export class RetrievePresetDto extends CreatePresetDto {
  constructor(preset: Preset) {
    super();
    this.title = preset.name;
    this.comment = preset.comment;
    this.value = preset.id.toString();
    this.theme = preset.theme.id.toString();
    this.language = preset.language.alias;
    this.currency = preset.currency.alias;
    this.network = preset.network.alias;
    this.exchange = preset.theme.template.exchange.id.toString();
    this.fields = preset.inputPresets.getItems().reduce((acc: any, inputPreset) => {
      acc[inputPreset.input.alias] = inputPreset.value;
      return acc;
    }, {});
  }
  title: string;
  value: string;
  comment: string;
  exchange: string;
}
