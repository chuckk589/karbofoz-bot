import { DeviceBarInput } from 'src/modules/mikroorm/entities/DeviceBarInput';
import { RetrieveConfigDto } from './retrieve-config.dto';

export class ReetrieveDeviceInputConfigDto {
  constructor(deviceBarInput: DeviceBarInput) {
    this.name = deviceBarInput.input.name;
    this.alias = deviceBarInput.input.alias;
    this.meta = deviceBarInput.meta || undefined;
    this.variants = deviceBarInput.input.variants.getItems().map((variant) => new RetrieveConfigDto({ title: variant.name, value: variant.alias }));
    this.type = deviceBarInput.input.type || undefined;
    this.dependsOn = deviceBarInput.dependsOn || undefined;
    this.dependsValue = deviceBarInput.dependsValue || undefined;
  }
  name: string;
  alias: string;
  meta?: string;
  dependsOn?: string;
  dependsValue?: string;
  type: string;
  variants?: RetrieveConfigDto[];
}
