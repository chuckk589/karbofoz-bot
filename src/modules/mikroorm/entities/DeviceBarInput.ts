import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Device } from './Device';
import { BarInput } from './BarInput';

@Entity()
export class DeviceBarInput {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Device)
  device: Device;

  @ManyToOne(() => BarInput)
  input: BarInput;

  @Property({ nullable: true })
  hint?: string;

  @Property({ nullable: true })
  dependsOn?: string;

  @Property({ nullable: true })
  dependsValue?: string;
}
