import { DeviceBarInput } from 'src/modules/mikroorm/entities/DeviceBarInput';
import { RetrieveConfigDto } from './retrieve-config.dto';

export class ReetrieveDeviceInputConfigDto {
  constructor(deviceBarInput: DeviceBarInput) {
    this.name = deviceBarInput.input.name;
    this.alias = deviceBarInput.input.alias;
    this.hint = deviceBarInput.hint || undefined;
    this.variants = deviceBarInput.input.variants.getItems().map((variant) => new RetrieveConfigDto({ title: variant.name, value: variant.alias }));
    this.type = deviceBarInput.input.type || undefined;
    this.dependsOn = JSON.parse(deviceBarInput.dependsOn);
    this.alwaysRandom = deviceBarInput.alwaysRandom || undefined;
    this.optional = deviceBarInput.optional || undefined;
    this.range = deviceBarInput.range || undefined;
  }
  name: string;
  alias: string;
  hint?: string;
  dependsOn?: string;
  alwaysRandom?: boolean;
  type: string;
  optional?: boolean;
  range?: [number, number];
  variants?: RetrieveConfigDto[];
}
