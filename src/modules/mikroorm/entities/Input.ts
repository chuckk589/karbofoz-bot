import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { CustomBaseEntity } from './CustomBaseEntity';
import { Theme } from './Theme';
import { InputValue } from './InputValue';
import { Preset } from './Preset';
import { InputAlias } from './InputAlias';
import { InputTheme } from './InputTheme';

@Entity()
export class Input extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  alias: string;

  @ManyToOne({ entity: () => InputAlias, nullable: true })
  inputAlias: InputAlias;

  @OneToMany(() => InputValue, (inputValue) => inputValue.input)
  inputValues = new Collection<InputValue>(this);
}
