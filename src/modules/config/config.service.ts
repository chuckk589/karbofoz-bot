import { RetrieveSavedPresetDto } from './dto/retrieve-saved-preset.dto';
import { RetrieveDeviceConfigDto } from './dto/retrieve-device-config.dto';
import { RetrieveExchangeConfigDto } from './dto/retrieve-exchange-config.dto';
import { EntityManager, PopulateHint } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Exchange } from '../mikroorm/entities/Exchange';
import { Device } from '../mikroorm/entities/Device';
import { Preset } from '../mikroorm/entities/Preset';
import { Wallet, WalletType } from '../mikroorm/entities/Wallet';
import { RetrieveWalletDto } from '../wallet/dto/retrieve-wallet.dto';
import { Theme } from '../mikroorm/entities/Theme';
import { Network } from '../mikroorm/entities/Network';
import { Currency } from '../mikroorm/entities/Currency';
import { Language } from '../mikroorm/entities/Language';
import { InputPreset } from '../mikroorm/entities/InputPreset';
import { Input } from '../mikroorm/entities/Input';
import { BarInputPreset } from '../mikroorm/entities/BarInputPreset';
import { BarInput } from '../mikroorm/entities/BarInput';

@Injectable()
export class ConfigService {
  constructor(private readonly em: EntityManager) {}
  async getUserData() {
    const presets = await this.em.find(Preset, {}, { populate: ['currency', 'network', 'wallet', 'language', 'theme.exchange', 'inputPresets.input', 'barInputPresets.barInput', 'device'], orderBy: { name: 'ASC' } });
    const wallets = await this.em.find(Wallet, {});
    return {
      presets: presets.map((preset) => new RetrieveSavedPresetDto(preset)),
      wallets: wallets.map((wallet) => new RetrieveWalletDto(wallet)),
    };
  }
  async loadUserData(userData: { wallets: RetrieveWalletDto[]; presets: RetrieveSavedPresetDto[] }) {
    let wallets = userData.wallets.map((wallet) =>
      this.em.create(Wallet, {
        name: wallet.title,
        address: wallet.value,
        comment: wallet.comment,
        type: wallet.type as WalletType,
        preffered: wallet.preffered,
      }),
    );
    await this.em.persistAndFlush(wallets);
    wallets = wallets.map((wallet, index) => ({ ...wallet, old_id: userData.wallets[index].id }));
    const presets = userData.presets.map((preset) =>
      this.em.create(Preset, {
        name: preset.name,
        comment: preset.comment,
        direction: preset.direction,
        theme: this.em.getReference(Theme, preset.theme),
        network: this.em.getReference(Network, preset.network),
        currency: this.em.getReference(Currency, preset.currency),
        device: preset.device ? this.em.getReference(Device, preset.device) : null,
        language: this.em.getReference(Language, preset.language),
        wallet: preset.wallet ? this.em.getReference(Wallet, wallets.find((wallet: any) => wallet.old_id == preset.wallet)?.id) : null,
        createdAt: new Date(preset.createdAt),
        inputPresets: Object.keys(preset.fields).map((key) =>
          this.em.create(InputPreset, {
            input: this.em.getReference(Input, +key),
            value: preset.fields[key],
          }),
        ),
        barInputPresets: Object.keys(preset.statusbar).map((key) =>
          this.em.create(BarInputPreset, {
            barInput: this.em.getReference(BarInput, +key),
            value: preset.statusbar[key],
          }),
        ),
      }),
    );
    await this.em.persistAndFlush(presets);
  }
  async getAll() {
    const exchanges = await this.em.find(
      Exchange,
      {
        themes: {
          themeInputs: {
            $or: [{ inputAlias: { $ne: null } }, { hidden: true }],
          },
        },
        archived: false,
      },
      {
        populate: ['exchangeNetworks.networkCurrencies.currency', 'exchangeNetworks.network', 'themes.themeInputs.inputAlias.aliasVariants', 'themes.themeLanguages.language'],
        populateWhere: PopulateHint.INFER,
        orderBy: { name: 'ASC' },
      },
    );
    const devices = await this.em.find(Device, {}, { populate: ['deviceBarInputs.input.variants'] });
    return {
      exchanges: exchanges.map((exchange) => new RetrieveExchangeConfigDto(exchange)),
      devices: devices.map((device) => new RetrieveDeviceConfigDto(device)),
    };
  }
}
