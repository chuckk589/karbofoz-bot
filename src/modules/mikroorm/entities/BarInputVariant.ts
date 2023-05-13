import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { HtmlInputType } from './InputAlias';
import { BarInput } from './BarInput';

@Entity()
export class BarInputVariant {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  alias: string;

  @ManyToOne({ entity: () => BarInput })
  barInput: BarInput;
}
