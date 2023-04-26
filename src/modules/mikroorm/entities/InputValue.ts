import { Entity, ManyToOne, OneToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Input } from './Input';
import { Language } from './Language';

@Entity()
export class InputValue {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  value?: string;

  @ManyToOne(() => Input)
  input: Input;

  @ManyToOne(() => Language)
  language: Language;
}
