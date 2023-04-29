import { IsNumberString } from 'class-validator';

export class CreatePresetDto {
  @IsNumberString()
  theme: string;
  @IsNumberString()
  language: string;
  [key: string]: string | number;
}
