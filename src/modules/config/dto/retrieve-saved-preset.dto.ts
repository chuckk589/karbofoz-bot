import { Preset } from 'src/modules/mikroorm/entities/Preset';

export class RetrieveSavedPresetDto {
  constructor(preset: Preset) {
    this.name = preset.name;
    this.comment = preset.comment;
    this.direction = preset.direction;
    this.network = preset.network.id;
    this.currency = preset.currency.id;
    this.language = preset.language.id;
    this.theme = preset.theme.id;
    this.wallet = preset.wallet?.id;
    this.createdAt = preset.createdAt;
    this.device = preset.device?.id;
    this.fields = preset.inputPresets.getItems().reduce((acc: any, inputPreset) => {
      acc[inputPreset.input.id] = inputPreset.value;
      return acc;
    }, {});
    this.statusbar = preset.barInputPresets.getItems().reduce((acc: any, barInputPreset) => {
      acc[barInputPreset.barInput.id] = barInputPreset.value;
      return acc;
    }, {});
  }
  name: string;
  comment: string;
  direction: string;
  network: number;
  currency: number;
  language: number;
  theme: number;
  device: number;
  wallet: number;
  createdAt: Date;
  fields: {
    [key: string]: string;
  };
  statusbar: {
    [key: string]: string;
  } & { show: boolean };
}
