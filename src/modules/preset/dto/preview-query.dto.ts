import { IsIn } from 'class-validator';

export class PreviewQueryDto {
  @IsIn(['in', 'out'])
  direction: 'in' | 'out';

  [key: string]: string;
}
