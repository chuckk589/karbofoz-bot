import { Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Currency {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  alias!: string;

  @Property({ nullable: true })
  name!: string;
}
