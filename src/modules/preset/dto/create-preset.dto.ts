import { IsNumberString } from 'class-validator';

export class CreatePresetDto {
  @IsNumberString()
  exchange: string;
  @IsNumberString()
  theme: string;
  [key: string]: string | number;
}
