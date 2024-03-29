import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique, t } from '@mikro-orm/core';
import { InputValue } from './InputValue';
import { InputAlias } from './InputAlias';
import { Theme } from './Theme';

@Entity()
export class Input {
  @PrimaryKey()
  id!: number;

  @Property()
  alias: string;

  @Property({ default: false, nullable: true })
  optional?: boolean;

  @Property({ default: false, nullable: true })
  hidden?: boolean;

  @Property({ nullable: true })
  hint?: string;

  @Property({ nullable: true })
  name?: string;

  @Property({ nullable: true })
  dependsOn?: string;

  @ManyToOne({ entity: () => InputAlias, nullable: true })
  inputAlias: InputAlias;

  @OneToMany(() => InputValue, (inputValue) => inputValue.input)
  inputValues = new Collection<InputValue>(this);

  @ManyToOne(() => Theme)
  theme: Theme;
}
