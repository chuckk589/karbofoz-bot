import { IsNumberString, IsString } from 'class-validator';

export class CreatePresetDto {
  @IsNumberString()
  theme: string;
  @IsString()
  language: string;
  [key: string]: string | number;
}
