import { Entity, ManyToOne, PrimaryKey, Property, Type } from '@mikro-orm/core';
import { Preset } from './Preset';
import { BarInput } from './BarInput';

export class MaybeBoolean extends Type<string | boolean | number, string> {
  convertToDatabaseValue(value: string | boolean): string {
    return value === true ? 'true' : value === false ? 'false' : value;
  }

  convertToJSValue(value: string | undefined): string | boolean | number {
    if (value === 'true' || value === 'false') {
      return value === 'true' ? true : false;
    } else if (!isNaN(Number(value))) {
      return Number(value);
    } else {
      return value;
    }
  }
}
@Entity()
export class BarInputPreset {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true, type: MaybeBoolean })
  value?: string;

  @ManyToOne(() => Preset)
  preset: Preset;

  @ManyToOne(() => BarInput)
  barInput: BarInput;
}
