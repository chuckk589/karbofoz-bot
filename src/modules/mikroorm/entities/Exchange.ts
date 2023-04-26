import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Exchange {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  alias!: string;

  @Property({ nullable: true })
  name!: string;
}
