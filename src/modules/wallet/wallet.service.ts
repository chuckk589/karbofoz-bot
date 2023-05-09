import { RetrieveWalletDto } from './dto/retrieve-wallet.dto';
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Wallet, WalletType } from '../mikroorm/entities/Wallet';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletService {
  constructor(private readonly em: EntityManager) {}

  async remove(id: number) {
    const wallet = await this.em.findOneOrFail(Wallet, id);
    return await this.em.removeAndFlush(wallet);
  }
  async create(createWalletDto: CreateWalletDto) {
    const wallet = this.em.create(Wallet, {
      name: createWalletDto.name,
      address: createWalletDto.address,
      comment: createWalletDto.comment,
      type: createWalletDto.trx ? WalletType.TRX : WalletType.NONTRX,
    });
    await this.em.persistAndFlush(wallet);
    return new RetrieveWalletDto(wallet);
  }
  async findAll() {
    const wallets = await this.em.find(Wallet, {});
    return wallets.map((wallet) => new RetrieveWalletDto(wallet));
  }
}
