import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';

import { Template } from './Template';

@Entity()
export class Preset extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToOne(() => Template)
  template: Template;
}
