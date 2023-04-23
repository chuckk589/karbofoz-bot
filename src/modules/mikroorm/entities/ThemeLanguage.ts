import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { Theme } from './Theme';
import { Language } from './Language';

@Entity()
export class ThemeLanguage {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Theme)
  theme: Theme;

  @ManyToOne(() => Language)
  language: Language;
}
