import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';

import { InputPreset } from './InputPreset';
import { Language } from './Language';
import { Theme } from './Theme';
import { Currency } from './Currency';
import { Network } from './Network';

@Entity()
export class Preset {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ nullable: true, type: 'text' })
  comment?: string;

  @OneToMany(() => InputPreset, (inputPreset) => inputPreset.preset, { orphanRemoval: true })
  inputPresets = new Collection<InputPreset>(this);

  @ManyToOne(() => Language)
  language: Language;

  @ManyToOne(() => Theme)
  theme: Theme;

  @ManyToOne(() => Currency)
  currency: Currency;

  @ManyToOne(() => Network)
  network: Network;
}
