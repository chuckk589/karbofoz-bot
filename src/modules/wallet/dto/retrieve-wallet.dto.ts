import { Wallet } from 'src/modules/mikroorm/entities/Wallet';

export class RetrieveWalletDto {
  constructor(wallet: Wallet) {
    this.title = wallet.name;
    this.value = wallet.address;
    this.id = wallet.id.toString();
    this.comment = wallet.comment;
    this.type = wallet.type;
  }
  title: string;
  id: string;
  value: string;
  comment: string;
  type: string;
}
