import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { DeviceBarInput } from './DeviceBarInput';
import { ExchangeNetwork } from './ExchangeNetwork';

@Entity()
export class ExchangeConstant {
  @PrimaryKey()
  id!: number;

  @Property()
  value: string;

  @Property()
  alias: string;

  @ManyToOne(() => ExchangeNetwork)
  exchangeNetwork: ExchangeNetwork;
}
