import { Preset } from 'src/modules/mikroorm/entities/Preset';

export class RetrievePresetDto {
  constructor(preset: Preset) {
    this.name = preset.name;
  }
  name: string;
  deviceId: string;
  exchangeId: string;
  languageId: string;
  networkId: string;
  systemTime: string;
}
