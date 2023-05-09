import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Theme } from './Theme';
import { ExchangeNetwork } from './ExchangeNetwork';

@Entity()
export class Exchange {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  alias!: string;

  @Property({ nullable: true })
  name!: string;

  @OneToMany(() => ExchangeNetwork, (exchangeNetwork) => exchangeNetwork.exchange)
  exchangeNetworks = new Collection<ExchangeNetwork>(this);

  @OneToMany(() => Theme, (theme) => theme.exchange)
  themes = new Collection<Theme>(this);
}
