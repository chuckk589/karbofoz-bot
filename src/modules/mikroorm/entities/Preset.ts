import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';

import { InputPreset } from './InputPreset';

@Entity()
export class Preset {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany(() => InputPreset, (inputPreset) => inputPreset.preset)
  inputPresets = new Collection<InputPreset>(this);
}
