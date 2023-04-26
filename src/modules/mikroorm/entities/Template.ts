import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey } from '@mikro-orm/core';
import { Exchange } from './Exchange';
import { Theme } from './Theme';

@Entity()
export class Template {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Exchange)
  exchange!: Exchange;

  @OneToMany(() => Theme, (theme) => theme.template)
  themes = new Collection<Theme>(this);
}
