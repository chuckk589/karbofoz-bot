import { CreatePresetDto } from './dto/create-preset.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
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
  getPreview(@Body() body: CreatePresetDto) {
    return this.presetService.generatePreview(body);
  }
  // createPreset(@Body() body: CreatePresetDto) {
  //   return this.presetService.createPreset(body);
  // }
}
