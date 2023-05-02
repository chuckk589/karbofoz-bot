import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Network {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  alias!: string;

  @Property({ nullable: true })
  name!: string;
}
