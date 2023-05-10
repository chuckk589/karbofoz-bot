import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { InputTheme } from './InputTheme';
import { ThemeLanguage } from './ThemeLanguage';
import { Exchange } from './Exchange';

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

  @OneToMany(() => InputTheme, (InputTheme) => InputTheme.theme)
  themeInputs = new Collection<InputTheme>(this);

  @OneToMany(() => ThemeLanguage, (ThemeLanguage) => ThemeLanguage.theme)
  themeLanguages = new Collection<ThemeLanguage>(this);

  @Property()
  statusbar: boolean;
}
