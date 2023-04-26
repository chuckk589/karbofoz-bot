import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';

import { Template } from './Template';

@Entity()
export class Preset {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToOne(() => Template)
  template: Template;
}
