import { OmitType } from '@nestjs/mapped-types';
import { CreatePresetDto } from 'src/modules/preset/dto/create-preset.dto';

export class TemplateQueryDto extends OmitType(CreatePresetDto, ['exchange']) {}
