import { RetrieveWalletDto } from './dto/retrieve-wallet.dto';
import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Wallet, WalletType } from '../mikroorm/entities/Wallet';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletService {
  constructor(private readonly em: EntityManager) {}

  async remove(id: number) {
    const wallet = await this.em.findOneOrFail(Wallet, id);
    return await this.em.removeAndFlush(wallet);
  }
  async create(createWalletDto: CreateWalletDto) {
    const wallets = await this.em.find(Wallet, {});
    const type = createWalletDto.address[0] == 'T' ? WalletType.TRX : WalletType.NONTRX;
    if (createWalletDto.preffered === true) {
      wallets
        .filter((item) => item.type == type)
        .forEach((wallet) => {
          wallet.preffered = false;
        });
    }
    const wallet = this.em.create(Wallet, {
      name: createWalletDto.name,
      address: createWalletDto.address,
      comment: createWalletDto.comment,
      preffered: createWalletDto.preffered,
      type: type,
    });
    wallets.push(wallet);
    await this.em.persistAndFlush(wallets);
    return wallets.map((wallet) => new RetrieveWalletDto(wallet));
  }
  async findAll() {
    const wallets = await this.em.find(Wallet, {});
    return wallets.map((wallet) => new RetrieveWalletDto(wallet));
  }
  async update(id: number, updateWalletDto: UpdateWalletDto) {
    const wallets = await this.em.find(Wallet, {});
    const wallet = wallets.find((wallet) => wallet.id == id);
    wallet.name = updateWalletDto.name;
    wallet.address = updateWalletDto.address;
    wallet.comment = updateWalletDto.comment;
    if (updateWalletDto.address) {
      wallet.type = updateWalletDto.address[0] == 'T' ? WalletType.TRX : WalletType.NONTRX;
    }
    if (updateWalletDto.preffered === true) {
      wallets
        .filter((item) => item.type == wallet.type)
        .forEach((wallet) => {
          wallet.preffered = false;
        });
    }
    wallet.preffered = updateWalletDto.preffered;
    await this.em.persistAndFlush(wallets);
    return wallets.map((wallet) => new RetrieveWalletDto(wallet));
  }
}
