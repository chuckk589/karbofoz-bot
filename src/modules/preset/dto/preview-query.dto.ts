import { IsIn, IsString } from 'class-validator';

export class PreviewQueryDto {
  @IsIn(['in', 'out'])
  direction: 'in' | 'out';

  @IsString()
  exchange: string;

  @IsString()
  dependent: string;
}
