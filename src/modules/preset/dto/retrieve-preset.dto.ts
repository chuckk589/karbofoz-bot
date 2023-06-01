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
    this.direction = preset.direction;
    this.exchange = preset.theme.exchange.id.toString();
    this.createdAt = preset.createdAt;
    this.fields = preset.inputPresets.getItems().reduce((acc: any, inputPreset) => {
      acc[inputPreset.input.alias] = inputPreset.value;
      return acc;
    }, {});
    this.statusbar = preset.barInputPresets.getItems().reduce(
      (acc: any, barInputPreset) => {
        acc[barInputPreset.barInput.alias] = barInputPreset.value;
        return acc;
      },
      { device: preset.device?.alias },
    );
  }
  title: string;
  value: string;
  comment: string;
  exchange: string;
  createdAt: Date;
}
