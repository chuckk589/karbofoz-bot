import { Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

export enum HtmlInputType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  DATETIME_LOCAL = 'datetime-local',
}

@Entity()
export class InputAlias extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Enum({ default: HtmlInputType.TEXT, items: () => HtmlInputType })
  type: HtmlInputType;
}
