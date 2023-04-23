import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

@Entity()
export class Language extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  alias!: string;

  @Property({ nullable: true })
  name!: string;
}
