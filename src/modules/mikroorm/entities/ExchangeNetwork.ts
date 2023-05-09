import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Exchange } from './Exchange';
import { Network } from './Network';
import { Currency } from './Currency';
import { NetworkCurrency } from './NetworkCurrency';

@Entity()
export class ExchangeNetwork {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Exchange)
  exchange: Exchange;

  @ManyToOne(() => Network)
  network: Network;

  @OneToMany(() => NetworkCurrency, (networkCurrency) => networkCurrency.exchangeNetwork)
  networkCurrencies = new Collection<NetworkCurrency>(this);
}
