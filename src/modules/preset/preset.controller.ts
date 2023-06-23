import { PreviewQueryDto } from './dto/preview-query.dto';
import { UpdatePresetsDto } from './dto/update-presets.dto';
import { CreatePresetDto } from './dto/create-preset.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PresetService } from './preset.service';

@Controller({
  path: 'preset',
  version: '1',
})
export class PresetController {
  constructor(private readonly presetService: PresetService) {}

  @Get()
  getPresets() {
    return this.presetService.getPresets();
  }
  @Post('preview')
  getPreview(@Body() body: UpdatePresetsDto) {
    return this.presetService.generatePreview(body);
  }
  @Get('preview')
  getPreviewImage(@Query() previewQuery: PreviewQueryDto) {
    return this.presetService.getPreviewImage(previewQuery);
  }
  @Post()
  managePreset(@Body() body: CreatePresetDto) {
    return this.presetService.managePreset(body);
  }
  @Delete()
  remove(@Query('ids') ids: string) {
    return this.presetService.remove(ids.split(',').map((id) => +id));
  }
}
