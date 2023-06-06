import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  @IsOptional()
  @IsString()
  comment?: string;
}
