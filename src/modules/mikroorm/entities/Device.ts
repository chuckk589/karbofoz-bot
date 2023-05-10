import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Device {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  alias: string;
}
