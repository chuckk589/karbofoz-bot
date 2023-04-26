import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Theme } from './Theme';
import { Input } from './Input';

@Entity()
export class InputTheme {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Theme)
  theme: Theme;

  @ManyToOne(() => Input)
  input: Input;
}
