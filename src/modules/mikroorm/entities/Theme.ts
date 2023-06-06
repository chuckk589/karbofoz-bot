import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { ThemeLanguage } from './ThemeLanguage';
import { Exchange } from './Exchange';
import { Input } from './Input';

@Entity()
export class Theme {
  @PrimaryKey()
  id!: number;

  @Property()
  alias: string;

  @Property()
  name!: string;

  @ManyToOne({ entity: () => Exchange })
  exchange: Exchange;

  @OneToMany(() => Input, (Input) => Input.theme)
  themeInputs = new Collection<Input>(this);

  @OneToMany(() => ThemeLanguage, (ThemeLanguage) => ThemeLanguage.theme)
  themeLanguages = new Collection<ThemeLanguage>(this);

  @Property()
  statusbar: boolean;
}
