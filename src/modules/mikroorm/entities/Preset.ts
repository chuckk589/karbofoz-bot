import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';

import { InputPreset } from './InputPreset';
import { Language } from './Language';
import { Theme } from './Theme';
import { Currency } from './Currency';
import { Network } from './Network';
import { BarInputPreset } from './BarInputPreset';
import { Device } from './Device';
import { Wallet } from './Wallet';

@Entity()
export class Preset {
  @PrimaryKey()
  id!: number;

  @Unique()
  @Property()
  name!: string;

  @Property()
  direction?: string;

  @Property({ nullable: true, type: 'text' })
  comment?: string;

  @OneToMany(() => InputPreset, (inputPreset) => inputPreset.preset, { orphanRemoval: true })
  inputPresets = new Collection<InputPreset>(this);

  @OneToMany(() => BarInputPreset, (barInputPreset) => barInputPreset.preset, { orphanRemoval: true })
  barInputPresets = new Collection<BarInputPreset>(this);

  @ManyToOne(() => Language)
  language: Language;

  @ManyToOne(() => Theme)
  theme: Theme;

  @ManyToOne(() => Currency)
  currency: Currency;

  @ManyToOne(() => Wallet, { nullable: true })
  wallet: Wallet;

  @ManyToOne(() => Network)
  network: Network;

  @ManyToOne(() => Device, { nullable: true })
  device: Device;

  @Property()
  createdAt: Date = new Date();
}
