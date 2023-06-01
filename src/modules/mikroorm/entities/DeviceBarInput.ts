import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, Platform, PrimaryKey, Property, Type, Unique, ValidationError } from '@mikro-orm/core';
import { Device } from './Device';
import { BarInput } from './BarInput';

export class BarRange extends Type<[number, number], string> {
  convertToDatabaseValue(value: [number, number], platform: Platform): string {
    return value?.join(',');
  }

  convertToJSValue(value: string | undefined, platform: Platform): [number, number] {
    return value?.split(',').map((v) => parseInt(v)) as [number, number];
  }
}
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

  @Property({ nullable: true, type: BarRange })
  range?: [number, number];

  @Property({ nullable: true })
  dependsOn?: string;
}
