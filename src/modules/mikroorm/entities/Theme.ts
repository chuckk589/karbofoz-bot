import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Template } from './Template';
import { Input } from './Input';
import { InputTheme } from './InputTheme';
import { ThemeLanguage } from './ThemeLanguage';

@Entity()
export class Theme {
  @PrimaryKey()
  id!: number;

  @Property()
  alias: string;

  @Property()
  name!: string;

  @ManyToOne({ entity: () => Template })
  template: Template;

  @OneToMany(() => InputTheme, (InputTheme) => InputTheme.theme)
  themeInputs = new Collection<InputTheme>(this);

  @OneToMany(() => ThemeLanguage, (ThemeLanguage) => ThemeLanguage.theme)
  themeLanguages = new Collection<ThemeLanguage>(this);
}
