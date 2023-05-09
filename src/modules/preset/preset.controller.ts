import { UpdatePresetsDto } from './dto/update-presets.dto';
import { CreatePresetDto } from './dto/create-preset.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Post()
  managePreset(@Body() body: CreatePresetDto) {
    return this.presetService.managePreset(body);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presetService.remove(+id);
  }
}
