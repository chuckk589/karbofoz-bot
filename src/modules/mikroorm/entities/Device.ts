import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { DeviceBarInput } from './DeviceBarInput';

@Entity()
export class Device {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  alias: string;

  @OneToMany(() => DeviceBarInput, (DeviceBarInput) => DeviceBarInput.device)
  deviceBarInputs = new Collection<DeviceBarInput>(this);
}
