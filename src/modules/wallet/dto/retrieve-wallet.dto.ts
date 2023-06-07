import { Wallet } from 'src/modules/mikroorm/entities/Wallet';

export class RetrieveWalletDto {
  constructor(wallet: Wallet) {
    this.title = wallet.name;
    this.value = wallet.address;
    this.id = wallet.id.toString();
    this.comment = wallet.comment;
    this.type = wallet.type;
    this.preffered = wallet.preffered;
  }
  title: string;
  id: string;
  value: string;
  comment: string;
  type: string;
  preffered: boolean;
}
