import { RetrieveWalletDto } from 'src/modules/wallet/dto/retrieve-wallet.dto';

type PresetFields = {
  current: string;
  name?: string;
  comment?: string;
};

export class CreatePresetDto {
  theme: string;
  language: string;
  currency: string;
  network: string;
  direction: string;
  preset: PresetFields;
  wallet: RetrieveWalletDto;
  fields: {
    [key: string]: string;
  };
  statusbar: {
    [key: string]: string;
  } & { show: boolean };
}
