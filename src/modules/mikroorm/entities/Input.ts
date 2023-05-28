import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { InputValue } from './InputValue';
import { InputAlias } from './InputAlias';

@Entity()
export class Input {
  @PrimaryKey()
  id!: number;

  @Property()
  alias: string;

  @Property({ default: false })
  optional: boolean;

  @Property({ nullable: true })
  hint?: string;

  @Property({ nullable: true })
  dependsOn?: string;

  @Property({ nullable: true })
  dependsValue?: string;

  @ManyToOne({ entity: () => InputAlias, nullable: true })
  inputAlias: InputAlias;

  @OneToMany(() => InputValue, (inputValue) => inputValue.input)
  inputValues = new Collection<InputValue>(this);
}
