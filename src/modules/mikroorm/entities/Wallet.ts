import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core';

export enum WalletType {
  TRX = 'trx',
  NONTRX = 'nontrx',
}

@Entity()
export class Wallet {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property({ nullable: true, type: 'text' })
  comment?: string;

  @Property()
  address: string;

  @Enum({ default: WalletType.TRX, items: () => WalletType })
  type: WalletType;
}
