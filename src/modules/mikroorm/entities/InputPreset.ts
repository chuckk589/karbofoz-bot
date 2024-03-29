import { Entity, ManyToOne, OneToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Input } from './Input';
import { Language } from './Language';
import { Preset } from './Preset';

@Entity()
export class InputPreset {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  value?: string;

  @ManyToOne(() => Preset)
  preset: Preset;

  @ManyToOne(() => Input)
  input: Input;
}
