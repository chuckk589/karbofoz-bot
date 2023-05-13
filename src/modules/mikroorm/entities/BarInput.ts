import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { HtmlInputType } from './InputAlias';
import { BarInputVariant } from './BarInputVariant';

@Entity()
export class BarInput {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  alias: string;

  @Enum({ items: () => HtmlInputType, nullable: true })
  type: HtmlInputType;

  @OneToMany(() => BarInputVariant, (BarInputVariant) => BarInputVariant.barInput)
  variants = new Collection<BarInputVariant>(this);
}
