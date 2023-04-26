import { Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { InputAlias } from './InputAlias';

@Entity()
export class AliasVariant {
  @PrimaryKey()
  id!: number;

  @Property()
  value: string;

  @ManyToOne(() => InputAlias)
  inputAlias: InputAlias;
}
