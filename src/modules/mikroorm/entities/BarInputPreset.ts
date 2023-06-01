import { Entity, ManyToOne, OneToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Preset } from './Preset';
import { BarInput } from './BarInput';

@Entity()
export class BarInputPreset {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  value?: string;

  @ManyToOne(() => Preset)
  preset: Preset;

  @ManyToOne(() => BarInput)
  barInput: BarInput;
}
