import { Entity, ManyToOne, OneToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { Input } from './Input';
import { ThemeLanguage } from './ThemeLanguage';

@Entity()
export class InputValue {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  value?: string;

  @ManyToOne(() => Input)
  input: Input;

  @ManyToOne(() => ThemeLanguage)
  themeLanguage: ThemeLanguage;
}
