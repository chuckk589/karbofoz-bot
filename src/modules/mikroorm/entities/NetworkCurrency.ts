import { Entity, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Exchange } from './Exchange';
import { Network } from './Network';
import { Currency } from './Currency';
import { ExchangeNetwork } from './ExchangeNetwork';

@Entity()
export class NetworkCurrency {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => ExchangeNetwork)
  exchangeNetwork: ExchangeNetwork;

  @ManyToOne(() => Currency)
  currency: Currency;
}
