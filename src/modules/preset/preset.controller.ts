import { DeletePresetsDto } from './dto/delete-presets.dto';
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

  @Patch(':id')
  updatePreset(@Body() body: UpdatePresetsDto, @Param('id') id: string) {
    console.log(body, id);
    //https://192.168.1.14:3001/template?theme=1&language=en&currency=usdt&network=trc20&direction=out&input3=adress&input1=11111&input4=22222&input2=2023-05-12T14:45:08&input5=33333
    return 'updatePreset';
  }
  @Post()
  managePreset(@Body() body: CreatePresetDto) {
    return this.presetService.managePreset(body);
  }
  @Delete()
  bulkDeletePresets(@Body() body: DeletePresetsDto) {
    return this.presetService.bulkDeletePresets(body);
  }
}
