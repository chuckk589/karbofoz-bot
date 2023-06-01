import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
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
  alias: string;

  @Enum({ default: HtmlInputType.TEXT, items: () => HtmlInputType })
  type: HtmlInputType;

  @OneToMany(() => AliasVariant, (aliasVariant) => aliasVariant.inputAlias, { nullable: true })
  aliasVariants = new Collection<AliasVariant>(this);
}
