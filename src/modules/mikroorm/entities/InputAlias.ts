import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { AliasVariant } from './AliasVariant';

export enum HtmlInputType {
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  DATETIME_LOCAL = 'datetime-local',
  TIME = 'time',
  TEXTAREA = 'textarea',
}

@Entity()
export class InputAlias {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  alias: string;

  @Property({ nullable: true })
  hint?: string;

  @Enum({ default: HtmlInputType.TEXT, items: () => HtmlInputType })
  type: HtmlInputType;

  @OneToMany(() => AliasVariant, (aliasVariant) => aliasVariant.inputAlias, { nullable: true })
  aliasVariants = new Collection<AliasVariant>(this);
}
