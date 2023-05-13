import { ReetrieveDeviceInputConfigDto } from './reetrieve-device-input-config.dto';
import { Device } from 'src/modules/mikroorm/entities/Device';

export class RetrieveDeviceConfigDto {
  constructor(device: Device) {
    this.title = device.name;
    this.value = device.alias;
    this.inputs = device.deviceBarInputs.getItems().map((deviceBarInput) => new ReetrieveDeviceInputConfigDto(deviceBarInput));
  }
  title: string;
  value: string;
  inputs: ReetrieveDeviceInputConfigDto[];
}
